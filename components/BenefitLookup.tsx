'use client'
// pVerify-powered Medicare ID lookup added as alternative to manual carrier/plan selection
// Medicare ID is never stored — cleared from state immediately after API call
import { useState, useId } from 'react'
import { plans } from '@/data/plans'

type LookupMode = 'manual' | 'medicare'

interface PverifyPlan {
  carrier: string
  carrierDisplay: string
  planName: string
  planId: string
  memberId: string
  otcCredit: number | null
  period: string | null
  status: string
}

export default function BenefitLookup() {
  const [mode, setMode] = useState<LookupMode>('manual')
  // Manual mode state
  const [carrier, setCarrier] = useState('')
  const [plan, setPlan] = useState('')
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<string | null>(null)
  // Medicare ID mode state
  const [medicareId, setMedicareId] = useState('')
  const [loading, setLoading] = useState(false)
  const [pverifyResult, setPverifyResult] = useState<PverifyPlan | null>(null)
  const [pverifyError, setPverifyError] = useState<string | null>(null)

  const zipId = useId()
  const carrierId = useId()
  const planId = useId()
  const medicareIdField = useId()

  const carrierPlans = carrier ? (plans[carrier] ?? []) : []

  function handleCarrierChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCarrier(e.target.value)
    setPlan('')
    setResult(null)
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!zip || !carrier || !plan) return
    const selected = carrierPlans.find(p => p.id === plan)
    setResult(
      selected
        ? `Great news! Your ${selected.name} plan includes $${selected.otcCredit} per ${selected.period} in OTC benefits.`
        : 'Plan not found. Please verify your information or contact us for help.'
    )
  }

  async function handleMedicareSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!medicareId) return
    setLoading(true)
    setPverifyError(null)
    setPverifyResult(null)
    try {
      const res = await fetch('/api/pverify/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicareId }),
      })
      // Immediately clear Medicare ID from state
      setMedicareId('')
      const data = await res.json()
      if (!res.ok || !data.success) {
        setPverifyError(data.error || 'Could not find your plan. Please try the manual lookup.')
        return
      }
      setPverifyResult(data.plan)
    } catch {
      setPverifyError('Something went wrong. Please try again or use manual lookup.')
    } finally {
      setLoading(false)
    }
  }

  function switchMode(newMode: LookupMode) {
    setMode(newMode)
    setResult(null)
    setPverifyResult(null)
    setPverifyError(null)
    setMedicareId('')
  }

  const isZipValid = zip.length === 5
  const canSubmitManual = isZipValid && carrier !== '' && plan !== ''
  const canSubmitMedicare = medicareId.length >= 9

  return (
    <section
      id="benefit-lookup"
      aria-labelledby="lookup-heading"
      className="py-16 bg-blue-50"
    >
      <div className="max-w-xl mx-auto px-4">
        <h2
          id="lookup-heading"
          className="text-3xl font-bold text-center text-patriot-blue mb-3"
        >
          Check Your OTC Benefits
        </h2>
        <p className="text-center text-gray-600 mb-6 text-lg">
          Find out exactly how much you have available each month.
        </p>

        {/* Mode Toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-300 mb-6">
          <button
            type="button"
            onClick={() => switchMode('manual')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'manual'
                ? 'bg-patriot-blue text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Select My Plan
          </button>
          <button
            type="button"
            onClick={() => switchMode('medicare')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'medicare'
                ? 'bg-patriot-blue text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Look Up by Medicare ID
          </button>
        </div>

        {/* Manual Mode */}
        {mode === 'manual' && (
          <form
            onSubmit={handleManualSubmit}
            noValidate
            className="space-y-5 bg-white p-6 rounded-2xl shadow-md"
          >
            <div>
              <label htmlFor={zipId} className="block text-sm font-semibold text-gray-700 mb-1">Your Zip Code</label>
              <input
                id={zipId}
                type="text"
                inputMode="numeric"
                maxLength={5}
                pattern="[0-9]{5}"
                value={zip}
                onChange={e => { setZip(e.target.value.replace(/\D/g, '')); setResult(null) }}
                placeholder="e.g. 85001"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
                aria-describedby={zip.length > 0 && !isZipValid ? `${zipId}-error` : undefined}
              />
              {zip.length > 0 && !isZipValid && (
                <p id={`${zipId}-error`} role="alert" className="text-red-600 text-sm mt-1">Please enter a 5-digit zip code</p>
              )}
            </div>
            <div>
              <label htmlFor={carrierId} className="block text-sm font-semibold text-gray-700 mb-1">Insurance Carrier</label>
              <select
                id={carrierId}
                value={carrier}
                onChange={handleCarrierChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
              >
                <option value="">Select your carrier...</option>
                <option value="humana">Humana</option>
                <option value="aetna">Aetna</option>
                <option value="uhc">UnitedHealthcare (UHC)</option>
                <option value="anthem">Anthem</option>
                <option value="wellcare">Wellcare</option>
              </select>
            </div>
            <div>
              <label htmlFor={planId} className="block text-sm font-semibold text-gray-700 mb-1">Your Plan</label>
              <select
                id={planId}
                value={plan}
                onChange={e => { setPlan(e.target.value); setResult(null) }}
                disabled={!carrier}
                required
                aria-describedby={!carrier ? `${planId}-hint` : undefined}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{carrier ? 'Select your plan...' : 'Select a carrier first'}</option>
                {carrierPlans.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {!carrier && (
                <p id={`${planId}-hint`} className="text-gray-500 text-sm mt-1">Select a carrier above to see available plans</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!canSubmitManual}
              className="w-full bg-patriot-red hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-patriot-red"
            >
              Show My Benefit Amount
            </button>
          </form>
        )}

        {/* Medicare ID Mode */}
        {mode === 'medicare' && (
          <form
            onSubmit={handleMedicareSubmit}
            noValidate
            className="space-y-5 bg-white p-6 rounded-2xl shadow-md"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <strong>Powered by pVerify</strong> — Enter your Medicare ID to instantly look up your current plan and OTC benefit amount. Your ID is never stored.
            </div>
            <div>
              <label htmlFor={medicareIdField} className="block text-sm font-semibold text-gray-700 mb-1">Medicare ID (MBI)</label>
              <input
                id={medicareIdField}
                type="text"
                value={medicareId}
                onChange={e => { setMedicareId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')); setPverifyError(null) }}
                placeholder="e.g. 1EG4-TE5-MK72"
                maxLength={13}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base font-mono tracking-wider focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
              />
              <p className="text-gray-500 text-xs mt-1">Your 11-character Medicare Beneficiary Identifier from your red, white & blue card</p>
            </div>
            <button
              type="submit"
              disabled={!canSubmitMedicare || loading}
              className="w-full bg-patriot-red hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-patriot-red"
            >
              {loading ? 'Looking up your plan...' : 'Look Up My Plan'}
            </button>
          </form>
        )}

        {/* Manual result */}
        {result && (
          <div role="status" aria-live="polite" className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <p className="text-green-800 font-semibold text-lg">{result}</p>
            <a href="/signup" className="mt-4 inline-block bg-patriot-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Start Using Your Benefits →
            </a>
          </div>
        )}

        {/* pVerify result */}
        {pverifyResult && (
          <div role="status" aria-live="polite" className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <p className="text-green-600 text-sm font-medium mb-1">Plan Found</p>
            <p className="text-green-800 font-bold text-xl mb-2">{pverifyResult.planName}</p>
            <div className="text-gray-700 text-sm space-y-1 mb-4">
              <p>Carrier: <strong>{pverifyResult.carrierDisplay}</strong></p>
              <p>Status: <strong className={pverifyResult.status === 'Active' ? 'text-green-700' : 'text-red-600'}>{pverifyResult.status}</strong></p>
              {pverifyResult.otcCredit && (
                <p className="text-lg font-bold text-patriot-blue mt-2">
                  ${pverifyResult.otcCredit} per {pverifyResult.period} in OTC benefits
                </p>
              )}
            </div>
            <a href="/signup" className="inline-block bg-patriot-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Start Using Your Benefits →
            </a>
          </div>
        )}

        {/* pVerify error */}
        {pverifyError && (
          <div role="alert" className="mt-6 bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-red-700 font-medium">{pverifyError}</p>
            <button
              type="button"
              onClick={() => switchMode('manual')}
              className="mt-3 text-patriot-blue underline text-sm font-medium"
            >
              Try manual lookup instead
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
