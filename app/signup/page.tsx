// Fix #3: Per-page metadata for signup page
// Server Component with client form island

import type { Metadata } from 'next'
import SignupForm from '@/components/SignupForm'

export const metadata: Metadata = {
  title: 'Get Started — Check Your Benefits',
  description:
    'Enter your Medicare Advantage plan details to see your OTC benefit amount and start ordering free health products.',
}

export default function SignupPage() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-patriot-blue mb-3">
            Get Started with PatriotOTC
          </h1>
          <p className="text-gray-600 text-lg">
            Create your free account and start using your Medicare OTC benefits today.
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
