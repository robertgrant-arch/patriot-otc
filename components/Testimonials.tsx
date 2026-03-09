// Fix #9: Testimonial data moved to data/testimonials.ts
// Fix #14: Semantic <figure>/<blockquote> structure
// Fix (a11y): aria-label on star ratings, aria-hidden on decorative emojis
// Server Component — no 'use client' needed

import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-16 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="testimonials-heading"
          className="text-3xl font-bold text-center text-patriot-blue mb-2"
        >
          What Seniors Are Saying
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Real reviews from verified PatriotOTC users
        </p>

        {/* Fix #14: Semantic list of testimonials */}
        <ol className="grid md:grid-cols-3 gap-6 list-none" aria-label="Customer testimonials">
          {testimonials.map((t) => (
            <li key={t.id}>
              <figure className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  {/* Fix (a11y): role="img" with descriptive aria-label on avatar */}
                  <span
                    className="text-4xl"
                    role="img"
                    aria-label={`${t.name} profile photo`}
                  >
                    {t.avatar}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">Age {t.age} · {t.location}</p>
                  </div>
                </div>

                {/* Fix (a11y): aria-label on star ratings instead of raw emoji */}
                <div
                  aria-label={`${t.rating} out of 5 stars`}
                  className="text-yellow-400 mb-3 text-lg"
                >
                  {'★'.repeat(t.rating)}
                </div>

                {/* Fix #14: Proper <blockquote> for quoted content */}
                <blockquote className="text-gray-700 leading-relaxed flex-1 italic">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>

                <figcaption className="mt-4 text-sm text-gray-500">
                  <span className="text-green-600 font-medium">
                    <span aria-hidden="true">✓</span> Verified User
                  </span>
                  {' · '}
                  {t.plan}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
