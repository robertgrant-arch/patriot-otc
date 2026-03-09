'use client'
// Fix #7: Proper form labels with htmlFor/id pairing, useId for unique IDs
// Fix #7: Inline validation feedback with aria-describedby
// Fix #7: Disabled submit button until form is valid
// Fix #10: Plans data imported from data file

import { useState, useId } from 'react'
import { plans } from '@/data/plans'

export default function BenefitLookup() {
  const [carrier, setCarrier] = useState('')
  const [plan, setPlan] = useState('')
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<string | null>(null)

  // Fix #7: useId for unique, SSR-safe form field IDs
  const zipId     = useId()
  const carrierId = useId()
  const planId    = useId()

  const carrierPlans = carrier ? (plans[carrier] ?? []) : []

  function handleCarrierChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCarrier(e.target.value)
    setPlan('')       // reset plan on carrier change
    setResult(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!zip || !carrier || !plan) return
    const selected = carrierPlans.find(p => p.id === plan)
    setResult(
      selected
        ? `Great news! Your ${selected.name} plan includes $${selected.otcCredit} per ${selected.period} in OTC benefits.`
        : 'Plan not found. Please verify your information or contact us for help.'
    )
  }

  const isZipValid = zip.length === 5
  const canSubmit  = isZipValid && carrier !== '' && plan !== ''

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
        <p className="text-center text-gray-600 mb-8 text-lg">
          Find out exactly how much you have available each month.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 bg-white p-6 rounded-2xl shadow-md"
        >
          {/* Zip Code */}
          <div>
            <label
              htmlFor={zipId}
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Your Zip Code
            </label>
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                         focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
              aria-describedby={zip.length > 0 && !isZipValid ? `${zipId}-error` : undefined}
            />
            {zip.length > 0 && !isZipValid && (
              <p
                id={`${zipId}-error`}
                role="alert"
                className="text-red-600 text-sm mt-1"
              >
                Please enter a 5-digit zip code
              </p>
            )}
          </div>

          {/* Carrier */}
          <div>
            <label
              htmlFor={carrierId}
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Insurance Carrier
            </label>
            <select
              id={carrierId}
              value={carrier}
              onChange={handleCarrierChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                         focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
            >
              <option value="">Select your carrier...</option>
              <option value="humana">Humana</option>
              <option value="aetna">Aetna</option>
              <option value="uhc">UnitedHealthcare (UHC)</option>
              <option value="anthem">Anthem</option>
              <option value="wellcare">Wellcare</option>
            </select>
          </div>

          {/* Plan */}
          <div>
            <label
              htmlFor={planId}
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Your Plan
            </label>
            <select
              id={planId}
              value={plan}
              onChange={e => { setPlan(e.target.value); setResult(null) }}
              disabled={!carrier}
              required
              aria-describedby={!carrier ? `${planId}-hint` : undefined}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                         focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {carrier ? 'Select your plan...' : 'Select a carrier first'}
              </option>
              {carrierPlans.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {!carrier && (
              <p id={`${planId}-hint`} className="text-gray-500 text-sm mt-1">
                Select a carrier above to see available plans
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-patriot-red hover:bg-red-800 disabled:opacity-50
                       disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl
                       text-lg transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-patriot-red"
          >
            Show My Benefit Amount
          </button>
        </form>

        {result && (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-center"
          >
            <p className="text-green-800 font-semibold text-lg">{result}</p>
            <a
              href="/signup"
              className="mt-4 inline-block bg-patriot-blue text-white px-6 py-3
                         rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Start Using Your Benefits →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
