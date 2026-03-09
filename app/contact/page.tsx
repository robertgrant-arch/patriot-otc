// Fix #18: Real page instead of dead # link

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact PatriotOTC — we\'re here to help you access your Medicare OTC benefits.',
}

export default function ContactPage() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-patriot-blue mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg mb-10">
          We&apos;re here to help you access your Medicare OTC benefits. Reach out anytime.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-2xl mb-3" aria-hidden="true">📞</p>
            <h2 className="font-bold text-gray-900 mb-1">Phone Support</h2>
            <p className="text-gray-600 text-sm mb-2">Mon–Fri, 8am–6pm EST</p>
            <a
              href="tel:1-800-555-0199"
              className="text-patriot-blue font-semibold hover:underline"
            >
              1-800-555-0199
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-2xl mb-3" aria-hidden="true">✉️</p>
            <h2 className="font-bold text-gray-900 mb-1">Email Support</h2>
            <p className="text-gray-600 text-sm mb-2">Response within 24 hours</p>
            <a
              href="mailto:support@patriototc.com"
              className="text-patriot-blue font-semibold hover:underline"
            >
              support@patriototc.com
            </a>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-800">
          <strong>For Medicare questions:</strong> PatriotOTC is not affiliated with Medicare or
          any government agency. For official Medicare questions, call{' '}
          <a href="tel:1-800-633-4227" className="underline font-semibold">1-800-MEDICARE</a>{' '}
          or visit{' '}
          <a
            href="https://www.medicare.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            medicare.gov
          </a>.
        </div>
      </div>
    </div>
  )
}
