// Fix #6: Use native <details>/<summary> — eliminates 'use client', useState, and re-renders
// Browser handles accordion natively with full keyboard and screen reader support
// Server Component — no 'use client' needed

import { faqs } from '@/data/faqs'

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 bg-white"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2
          id="faq-heading"
          className="text-3xl font-bold text-center text-patriot-blue mb-10"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group border border-gray-200 rounded-xl overflow-hidden"
            >
              <summary
                className="flex justify-between items-center px-5 py-4 cursor-pointer
                           font-semibold text-gray-900 text-lg list-none
                           hover:bg-gray-50 transition-colors
                           [&::-webkit-details-marker]:hidden"
              >
                {faq.question}
                {/* Fix (a11y): aria-hidden on decorative toggle icon */}
                <span
                  aria-hidden="true"
                  className="ml-4 text-gray-400 transition-transform duration-200
                             group-open:rotate-45 text-2xl font-light flex-shrink-0"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 pt-2 text-gray-600 leading-relaxed text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
