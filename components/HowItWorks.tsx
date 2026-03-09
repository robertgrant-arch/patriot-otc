// Fix #13: Use semantic <ol> for numbered steps, not <div> with hardcoded numbers
// Server Component — no 'use client' needed
// Fix (a11y): aria-hidden on decorative emojis and step numbers

import { steps } from '@/data/steps'

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-16 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2
          id="how-it-works-heading"
          className="text-3xl font-bold text-center text-patriot-blue mb-4"
        >
          How PatriotOTC Works
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Getting your free health products is simple — just three steps.
        </p>

        {/* Fix #13: <ol> for numbered steps */}
        <ol
          className="grid md:grid-cols-3 gap-8 list-none"
          aria-label="How PatriotOTC works"
        >
          {steps.map((step, i) => (
            <li key={step.id} className="flex flex-col items-center text-center">
              {/* Step number circle — aria-hidden since position in list conveys order */}
              <div
                aria-hidden="true"
                className="w-16 h-16 rounded-full bg-patriot-blue text-white
                           flex items-center justify-center text-2xl font-bold mb-4 shadow-md"
              >
                {i + 1}
              </div>
              {/* Fix (a11y): aria-hidden on decorative emoji */}
              <span className="text-4xl mb-3" aria-hidden="true">{step.icon}</span>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
