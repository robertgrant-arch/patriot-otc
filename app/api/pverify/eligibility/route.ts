import { NextRequest, NextResponse } from 'next/server'

// pVerify Eligibility API route
// Accepts Medicare ID, calls pVerify, returns plan info
// Medicare ID is NEVER persisted — cleared after response

const PVERIFY_API_URL = 'https://api.pverify.com/api/EligibilitySummary'
const PVERIFY_TOKEN_URL = 'https://api.pverify.com/Token'

// Map pVerify payer names to our internal carrier keys
const PAYER_MAP: Record<string, string> = {
  humana: 'humana',
  aetna: 'aetna',
  unitedhealthcare: 'uhc',
  uhc: 'uhc',
  anthem: 'anthem',
  wellcare: 'wellcare',
  bcbs: 'anthem',
}

async function getPverifyToken(): Promise<string> {
  const res = await fetch(PVERIFY_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      Client_Id: process.env.PVERIFY_CLIENT_ID ?? '',
      Client_Secret: process.env.PVERIFY_CLIENT_SECRET ?? '',
      grant_type: 'client_credentials',
    }),
  })
  const data = await res.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { medicareId } = body

    if (!medicareId || typeof medicareId !== 'string') {
      return NextResponse.json(
        { error: 'Medicare ID is required' },
        { status: 400 }
      )
    }

    // If pVerify credentials are not configured, return mock data
    // TODO: Remove mock fallback once pVerify credentials are set in env
    if (!process.env.PVERIFY_CLIENT_ID || !process.env.PVERIFY_CLIENT_SECRET) {
      return NextResponse.json({
        success: true,
        mock: true,
        plan: {
          carrier: 'humana',
          carrierDisplay: 'Humana',
          planName: 'Humana Gold Plus HMO',
          planId: 'humana-gold',
          memberId: '***' + medicareId.slice(-4),
          otcCredit: 75,
          period: 'month',
          status: 'Active',
        },
      })
    }

    // Real pVerify call
    const token = await getPverifyToken()

    const eligibilityRes = await fetch(PVERIFY_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Client-API-Id': process.env.PVERIFY_CLIENT_ID,
      },
      body: JSON.stringify({
        payerCode: '00007',  // Medicare payer code
        provider: {
          npi: process.env.PVERIFY_NPI ?? '',
        },
        subscriber: {
          memberId: medicareId,
        },
        isSubscriberPatient: 'True',
        doS_StartDate: new Date().toISOString().split('T')[0],
        doS_EndDate: new Date().toISOString().split('T')[0],
      }),
    })

    const eligData = await eligibilityRes.json()

    // Parse pVerify response to extract plan info
    const payerName = (eligData?.payerName ?? '').toLowerCase()
    const planName = eligData?.planName ?? eligData?.planDescription ?? 'Unknown Plan'
    const isActive = eligData?.planStatus === 'Active'

    // Match to our internal carrier
    let matchedCarrier = ''
    for (const [key, value] of Object.entries(PAYER_MAP)) {
      if (payerName.includes(key)) {
        matchedCarrier = value
        break
      }
    }

    return NextResponse.json({
      success: true,
      mock: false,
      plan: {
        carrier: matchedCarrier || 'unknown',
        carrierDisplay: eligData?.payerName ?? 'Unknown Carrier',
        planName,
        planId: '', // Will need mapping to local plan IDs
        memberId: '***' + medicareId.slice(-4),
        otcCredit: null, // Will be populated from local plan data match
        period: null,
        status: isActive ? 'Active' : 'Inactive',
        raw: eligData, // Include raw for debugging, remove in production
      },
    })
  } catch (error) {
    console.error('pVerify eligibility error:', error)
    return NextResponse.json(
      { error: 'Failed to look up eligibility. Please try again.' },
      { status: 500 }
    )
  }
}
