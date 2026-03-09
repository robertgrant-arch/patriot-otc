// Fix #18: Real page instead of dead # link

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PatriotOTC Privacy Policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-patriot-blue mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: March 2026</p>

        <div className="prose prose-lg text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Information We Collect</h2>
            <p>
              PatriotOTC collects information you provide when creating an account, including your
              name, email address, phone number, date of birth, and Medicare member ID. We use this
              information solely to verify your Medicare Advantage plan benefits and process your orders.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
            <p>
              We use your information to verify your OTC benefit eligibility, process and ship your
              orders, and communicate with you about your account. We do not sell your personal
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p>
              For privacy-related questions, please visit our{' '}
              <Link href="/contact" className="text-patriot-blue hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
