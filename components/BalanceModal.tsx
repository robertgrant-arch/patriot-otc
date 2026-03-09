'use client'

import { useState, useEffect, useCallback } from 'react'

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
  { id: 'humana', name: 'Humana' },
  { id: 'aetna', name: 'Aetna' },
  { id: 'uhc', name: 'UnitedHealthcare' },
  { id: 'anthem', name: 'Anthem' },
  { id: 'wellcare', name: 'Wellcare' },
]

interface BalanceModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BalanceModal({ isOpen, onClose }: BalanceModalProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [carrier, setCarrier] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BalanceResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCardNumber('')
      setCarrier('')
      setResult(null)
      setError(null)
    }
  }, [isOpen])

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
        setError(data.error || 'Unable to retrieve balance.')
      } else {
        setResult(data)
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
      setCardNumber('')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Check your OTC card balance"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-patriot-blue
                     rounded-full w-8 h-8 flex items-center justify-center"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="p-6 pt-8">
          <h2 className="text-2xl font-extrabold text-patriot-blue mb-1 text-center">
            Check Your OTC Balance
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter your card details to view your available balance.
          </p>

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-carrier" className="block text-sm font-semibold text-gray-700 mb-1">
                  Insurance Carrier
                </label>
                <select
                  id="modal-carrier"
                  value={carrier}
                  onChange={(e) => { setCarrier(e.target.value); setError(null) }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800
                             focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue"
                  required
                >
                  <option value="">-- Choose your carrier --</option>
                  {CARRIERS.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-card" className="block text-sm font-semibold text-gray-700 mb-1">
                  OTC Card Number
                </label>
                <input
                  id="modal-card"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter your card number"
                  maxLength={19}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800
                             focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue"
                  required
                />
                <p className="mt-1 text-xs text-gray-400">Found on the front of your OTC benefits card</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !cardNumber || !carrier}
                className="w-full bg-patriot-red hover:bg-red-800 text-white font-bold py-3 px-6
                           rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Checking...' : 'Check My Balance'}
              </button>
            </form>
          ) : (
            <div>
              <div className="bg-gradient-to-br from-patriot-blue to-blue-900 text-white rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-blue-200 text-xs">Card ending in</p>
                    <p className="text-xl font-bold">****{result.cardLast4}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-xs">{result.carrier}</p>
                    <p className="text-xs">{result.planName}</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 mb-4 text-center">
                  <p className="text-blue-200 text-xs mb-1">Total Available</p>
                  <p className="text-4xl font-extrabold">${result.totalAvailable.toFixed(2)}</p>
                </div>

                {result.wallets.map((w, i) => (
                  <div key={i} className="border-t border-white/20 pt-3 mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">{w.name}</span>
                      <span className="font-bold">${w.balance.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div
                        className="bg-yellow-400 h-1.5 rounded-full"
                        style={{ width: `${(w.balance / (w.balance + w.spent)) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-blue-200 mt-1">
                      <span>${w.spent.toFixed(2)} spent</span>
                      <span>{w.period} &middot; Resets {w.resetsOn}</span>
                    </div>
                  </div>
                ))}

                <p className="text-xs text-blue-300 mt-4 text-center">
                  Updated: {result.lastUpdated}
                </p>
              </div>

              <button
                onClick={() => { setResult(null); setError(null) }}
                className="w-full mt-4 border border-gray-300 text-gray-700 font-semibold py-2 px-4
                           rounded-xl hover:bg-gray-50 transition-colors"
              >
                Check Another Card
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
