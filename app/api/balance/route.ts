import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// =============================================================================
// Balance Check API Route — Security-hardened
// =============================================================================
// Carrier -> Platform: Humana/Aetna/UHC -> InComm | Anthem/Wellcare -> NationsBenefits
// TODO: Replace mock data once API partnerships are established.
// =============================================================================

const VALID_CARRIERS = new Set(['humana', 'aetna', 'uhc', 'anthem', 'wellcare'])

const CARRIER_PLATFORM: Record<string, string> = {
  humana: 'incomm', aetna: 'incomm', uhc: 'incomm',
  anthem: 'nationsbenefits', wellcare: 'nationsbenefits',
}

const CARRIER_NAMES: Record<string, string> = {
  humana: 'Humana', aetna: 'Aetna', uhc: 'UnitedHealthcare',
  anthem: 'Anthem', wellcare: 'Wellcare',
}

// --- Rate limiting (in-memory, per-IP, resets on cold start) ---
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// --- Input validation ---
function sanitizeCardNumber(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return null
  return digits
}

function sanitizeCarrier(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const lower = raw.toLowerCase().trim()
  return VALID_CARRIERS.has(lower) ? lower : null
}

// --- Mock platform queries (replace with real APIs) ---
function queryInComm(cardLast4: string, carrier: string) {
  return {
    cardLast4,
    carrier: CARRIER_NAMES[carrier],
    planName: `${CARRIER_NAMES[carrier]} Medicare Advantage (HMO)`,
    wallets: [
      { name: 'OTC Products', balance: 65, spent: 35, period: 'Monthly', resetsOn: 'Apr 1, 2026' },
      { name: 'Healthy Foods', balance: 40, spent: 60, period: 'Monthly', resetsOn: 'Apr 1, 2026' },
    ],
    totalAvailable: 105,
    lastUpdated: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
  }
}

function queryNationsBenefits(cardLast4: string, carrier: string) {
  return {
    cardLast4,
    carrier: CARRIER_NAMES[carrier],
    planName: `${CARRIER_NAMES[carrier]} Medicare Advantage (PPO)`,
    wallets: [
      { name: 'OTC Products', balance: 50, spent: 25, period: 'Quarterly', resetsOn: 'Jul 1, 2026' },
    ],
    totalAvailable: 50,
    lastUpdated: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate & sanitize inputs
    const cardNumber = sanitizeCardNumber(body.cardNumber)
    const carrier = sanitizeCarrier(body.carrier)

    if (!cardNumber) {
      return NextResponse.json(
        { error: 'Please enter a valid card number (13-19 digits).' },
        { status: 400 }
      )
    }
    if (!carrier) {
      return NextResponse.json(
        { error: 'Please select a valid carrier.' },
        { status: 400 }
      )
    }

    // Extract only last 4 digits — never log or store full card number
    const cardLast4 = cardNumber.slice(-4)

    const platform = CARRIER_PLATFORM[carrier]
    const result = platform === 'incomm'
      ? queryInComm(cardLast4, carrier)
      : queryNationsBenefits(cardLast4, carrier)

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
