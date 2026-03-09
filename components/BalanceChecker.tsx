'use client'

import { useState } from 'react'

interface BalanceResult {
  cardLast4: string
  carrier: string
  planName: string
  wallets: {
    name: string
    balance: number
    spent: number
    period: string
    resetsOn: string
  }[]
  totalAvailable: number
  lastUpdated: string
}

const CARRIERS = [
  { id: 'humana', name: 'Humana', platform: 'InComm Healthcare' },
  { id: 'aetna', name: 'Aetna', platform: 'InComm Healthcare' },
  { id: 'uhc', name: 'UnitedHealthcare', platform: 'InComm Healthcare' },
  { id: 'anthem', name: 'Anthem', platform: 'NationsBenefits' },
  { id: 'wellcare', name: 'Wellcare', platform: 'NationsBenefits' },
]

export default function BalanceChecker() {
  const [cardNumber, setCardNumber] = useState('')
  const [carrier, setCarrier] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BalanceResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!cardNumber || !carrier) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardNumber, carrier }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Unable to retrieve balance. Please try again.')
      } else {
        setResult(data)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
      // Clear card number from state for privacy
      setCardNumber('')
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-patriot-blue mb-3">
            Check Your OTC Card Balance
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your card details below to see your available OTC benefit balance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">
          {/* Carrier Selection */}
          <div>
            <label htmlFor="carrier" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Your Insurance Carrier
            </label>
            <select
              id="carrier"
              value={carrier}
              onChange={(e) => { setCarrier(e.target.value); setResult(null); setError(null) }}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800
                         focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue
                         transition-colors"
              required
            >
              <option value="">-- Choose your carrier --</option>
              {CARRIERS.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              OTC Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter your card number"
              maxLength={19}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800
                         focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue
                         transition-colors"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Found on the front of your OTC benefits card
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !cardNumber || !carrier}
            className="w-full bg-patriot-red hover:bg-red-800 text-white font-bold py-4 px-6
                       rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-patriot-red"
          >
            {loading ? 'Checking Balance...' : 'Check My Balance'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-8 bg-gradient-to-br from-patriot-blue to-blue-900 text-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-blue-200 text-sm">Card ending in</p>
                <p className="text-2xl font-bold">****{result.cardLast4}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-sm">{result.carrier}</p>
                <p className="text-sm">{result.planName}</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 mb-6 text-center">
              <p className="text-blue-200 text-sm mb-1">Total Available Balance</p>
              <p className="text-5xl font-extrabold">${result.totalAvailable.toFixed(2)}</p>
            </div>

            {result.wallets.map((wallet, i) => (
              <div key={i} className="border-t border-white/20 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{wallet.name}</span>
                  <span className="text-lg font-bold">${wallet.balance.toFixed(2)}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${wallet.balance / (wallet.balance + wallet.spent) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-blue-200">
                  <span>${wallet.spent.toFixed(2)} spent</span>
                  <span>{wallet.period} &middot; Resets {wallet.resetsOn}</span>
                </div>
              </div>
            ))}

            <p className="text-xs text-blue-300 mt-6 text-center">
              Last updated: {result.lastUpdated}
            </p>
          </div>
        )}

        {/* Info cards */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 text-center">
            <p className="text-2xl mb-2">&#128179;</p>
            <h3 className="font-semibold text-patriot-blue mb-1">Secure</h3>
            <p className="text-sm text-gray-600">Card numbers are never stored</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 text-center">
            <p className="text-2xl mb-2">&#9889;</p>
            <h3 className="font-semibold text-patriot-blue mb-1">Instant</h3>
            <p className="text-sm text-gray-600">Real-time balance from your carrier</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 text-center">
            <p className="text-2xl mb-2">&#127970;</p>
            <h3 className="font-semibold text-patriot-blue mb-1">All Carriers</h3>
            <p className="text-sm text-gray-600">Works with Humana, Aetna, UHC & more</p>
          </div>
        </div>
      </div>
    </section>
  )
}
