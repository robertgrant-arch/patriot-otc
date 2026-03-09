// Fix #18: Real page instead of dead # link

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'PatriotOTC Accessibility Statement — our commitment to accessible design for all users.',
}

export default function AccessibilityPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-patriot-blue mb-6">Accessibility Statement</h1>
        <p className="text-gray-500 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Commitment</h2>
            <p>
              PatriotOTC is committed to ensuring digital accessibility for people with disabilities,
              particularly our senior users. We continually improve the user experience for everyone
              and apply relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Accessibility Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Large 18px base font size for improved readability</li>
              <li>Minimum 44px touch targets on all interactive elements</li>
              <li>High contrast color scheme (4.5:1 minimum ratio)</li>
              <li>Full keyboard navigation support</li>
              <li>Screen reader compatible with proper ARIA labels</li>
              <li>Respects prefers-reduced-motion settings</li>
              <li>Native HTML accordion (details/summary) for FAQ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of PatriotOTC. If you experience
              accessibility barriers, please contact us at accessibility@patriototc.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
