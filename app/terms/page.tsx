// Fix #18: Real page instead of dead # link

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PatriotOTC Terms of Service — the rules and guidelines for using our platform.',
}

export default function TermsPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-patriot-blue mb-6">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Acceptance of Terms</h2>
            <p>
              By using PatriotOTC, you agree to these Terms of Service. PatriotOTC is a service
              that helps Medicare Advantage beneficiaries access their OTC benefits. We are not
              affiliated with Medicare or any government agency.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Eligibility</h2>
            <p>
              You must be enrolled in a Medicare Advantage plan that includes OTC benefits to use
              PatriotOTC. Benefit amounts vary by plan. Please verify your specific benefit amount
              with your insurance carrier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Disclaimer</h2>
            <p>
              OTC benefit amounts and eligible products are subject to change by your insurance
              carrier. PatriotOTC makes no guarantee of specific benefit amounts. Always verify
              your current benefits with your plan documents.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
