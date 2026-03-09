import { NextResponse } from 'next/server'

// =============================================================================
// Balance Check API Route
// =============================================================================
// This route handles OTC card balance lookups by routing to the correct
// platform provider based on the carrier.
//
// CARRIER -> PLATFORM MAPPING:
//   Humana, Aetna, UHC    -> InComm Healthcare API (developer.incomm.com)
//   Anthem, Wellcare       -> NationsBenefits API (nationsbenefits.com)
//
// TODO: Replace mock data with real API integrations once partnerships
//       are established with InComm Healthcare and NationsBenefits.
// =============================================================================

interface BalanceRequest {
  cardNumber: string
  carrier: string
}

// Platform routing based on carrier
const CARRIER_PLATFORM: Record<string, string> = {
  humana: 'incomm',
  aetna: 'incomm',
  uhc: 'incomm',
  anthem: 'nationsbenefits',
  wellcare: 'nationsbenefits',
}

const CARRIER_NAMES: Record<string, string> = {
  humana: 'Humana',
  aetna: 'Aetna',
  uhc: 'UnitedHealthcare',
  anthem: 'Anthem',
  wellcare: 'Wellcare',
}

// ---------------------------------------------------------------------------
// TODO: Implement real InComm Healthcare API integration
// Docs: https://developer.incomm.com/apis
// API Suite: Card & Wallet Management, Member Information, Transactions
// Auth: OAuth2 (requires partnership agreement)
// Endpoints needed:
//   - POST /auth/token (get access token)
//   - GET /cards/{cardId}/wallets (get wallet balances)
//   - GET /cards/{cardId}/transactions (transaction history)
// ---------------------------------------------------------------------------
async function queryInComm(cardNumber: string, carrier: string) {
  // MOCK RESPONSE - Replace with real InComm API call
  return {
    cardLast4: cardNumber.slice(-4),
    carrier: CARRIER_NAMES[carrier] || carrier,
    planName: `${CARRIER_NAMES[carrier]} Medicare Advantage (HMO)`,
    wallets: [
      {
        name: 'OTC Products',
        balance: 65.00,
        spent: 35.00,
        period: 'Monthly',
        resetsOn: 'Apr 1, 2026',
      },
      {
        name: 'Healthy Foods',
        balance: 40.00,
        spent: 60.00,
        period: 'Monthly',
        resetsOn: 'Apr 1, 2026',
      },
    ],
    totalAvailable: 105.00,
    lastUpdated: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
  }
}

// ---------------------------------------------------------------------------
// TODO: Implement real NationsBenefits API integration
// Portal: https://MyBenefits.NationsBenefits.com
// Platform: Benefits Pro Portal & App
// Features: Live balance check, transaction history, card activation
// Auth: Requires formal partnership agreement
// Endpoints needed:
//   - POST /auth/login (authenticate)
//   - GET /members/{memberId}/balance (get balances)
//   - GET /members/{memberId}/transactions (transaction history)
// ---------------------------------------------------------------------------
async function queryNationsBenefits(cardNumber: string, carrier: string) {
  // MOCK RESPONSE - Replace with real NationsBenefits API call
  return {
    cardLast4: cardNumber.slice(-4),
    carrier: CARRIER_NAMES[carrier] || carrier,
    planName: `${CARRIER_NAMES[carrier]} Medicare Advantage (PPO)`,
    wallets: [
      {
        name: 'OTC Products',
        balance: 50.00,
        spent: 25.00,
        period: 'Quarterly',
        resetsOn: 'Jul 1, 2026',
      },
    ],
    totalAvailable: 50.00,
    lastUpdated: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
  }
}

export async function POST(request: Request) {
  try {
    const body: BalanceRequest = await request.json()
    const { cardNumber, carrier } = body

    if (!cardNumber || !carrier) {
      return NextResponse.json(
        { error: 'Card number and carrier are required.' },
        { status: 400 }
      )
    }

    const platform = CARRIER_PLATFORM[carrier]
    if (!platform) {
      return NextResponse.json(
        { error: 'Unsupported carrier. Please select a valid carrier.' },
        { status: 400 }
      )
    }

    let result
    if (platform === 'incomm') {
      result = await queryInComm(cardNumber, carrier)
    } else {
      result = await queryNationsBenefits(cardNumber, carrier)
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
