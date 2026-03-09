// Fix (a11y): CTA section has explicit heading (not just visually-hidden)
// Server Component — no 'use client' needed

import Link from 'next/link'

export default function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 bg-patriot-blue text-white text-center px-4"
    >
      <div className="max-w-3xl mx-auto">
        {/* Fix (a11y): Explicit visible heading on CTA section */}
        <h2
          id="cta-heading"
          className="text-3xl md:text-4xl font-extrabold mb-4"
        >
          Your OTC Benefits Are Waiting
        </h2>
        <p className="text-xl text-blue-200 mb-8 leading-relaxed">
          The average Medicare Advantage member has{' '}
          <strong className="text-yellow-300">$75/month</strong> in unused OTC credits.
          Start using yours today — it takes less than 2 minutes.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-patriot-red hover:bg-red-800 text-white font-bold
                     py-4 px-10 rounded-xl text-xl transition-colors shadow-lg
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-white"
        >
          Get Started — It&apos;s Free
        </Link>
        <p className="mt-4 text-blue-300 text-sm">
          No credit card required. No enrollment fees. Just free health products.
        </p>
      </div>
    </section>
  )
}
