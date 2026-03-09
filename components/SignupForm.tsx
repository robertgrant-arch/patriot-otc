'use client'
// Fix #7: Proper form labels with htmlFor/id pairing
// Fix (a11y): useId for unique SSR-safe IDs

import { useState, useId } from 'react'

export default function SignupForm() {
  const [submitted, setSubmitted] = useState(false)
  const firstNameId = useId()
  const lastNameId  = useId()
  const emailId     = useId()
  const phoneId     = useId()
  const dobId       = useId()
  const memberId    = useId()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
      >
        <p className="text-5xl mb-4" aria-hidden="true">✅</p>
        <h2 className="text-2xl font-bold text-green-800 mb-2">You&apos;re All Set!</h2>
        <p className="text-green-700 text-lg">
          We&apos;re verifying your Medicare Advantage plan. You&apos;ll receive a confirmation
          email within 24 hours with your OTC benefit details.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 space-y-4"
      noValidate
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={firstNameId} className="block text-sm font-semibold text-gray-700 mb-1">
            First Name
          </label>
          <input
            id={firstNameId}
            type="text"
            required
            autoComplete="given-name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                       focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
            placeholder="Dorothy"
          />
        </div>
        <div>
          <label htmlFor={lastNameId} className="block text-sm font-semibold text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id={lastNameId}
            type="text"
            required
            autoComplete="family-name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                       focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
            placeholder="Smith"
          />
        </div>
      </div>

      <div>
        <label htmlFor={emailId} className="block text-sm font-semibold text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id={emailId}
          type="email"
          required
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                     focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
          placeholder="dorothy@example.com"
        />
      </div>

      <div>
        <label htmlFor={phoneId} className="block text-sm font-semibold text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id={phoneId}
          type="tel"
          autoComplete="tel"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                     focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
          placeholder="(555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor={dobId} className="block text-sm font-semibold text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          id={dobId}
          type="date"
          required
          autoComplete="bday"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                     focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
        />
      </div>

      <div>
        <label htmlFor={memberId} className="block text-sm font-semibold text-gray-700 mb-1">
          Medicare Member ID
        </label>
        <input
          id={memberId}
          type="text"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base
                     focus:ring-2 focus:ring-patriot-blue focus:border-patriot-blue outline-none"
          placeholder="1EG4-TE5-MK72"
        />
        <p className="text-gray-500 text-sm mt-1">
          Found on your Medicare card or insurance ID card
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-patriot-red hover:bg-red-800 text-white font-bold
                   py-4 rounded-xl text-lg transition-colors mt-2
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-patriot-red"
      >
        Create My Free Account
      </button>

      <p className="text-center text-gray-500 text-sm">
        By creating an account, you agree to our{' '}
        <a href="/terms" className="text-patriot-blue hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy" className="text-patriot-blue hover:underline">Privacy Policy</a>.
      </p>
    </form>
  )
}
