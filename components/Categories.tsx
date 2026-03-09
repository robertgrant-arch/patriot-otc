// Server Component — no 'use client' needed
// Fix (a11y): aria-hidden on decorative emojis, proper section labeling

import Link from 'next/link'
import { categories } from '@/data/categories'

export default function Categories() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="py-16 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="categories-heading"
          className="text-3xl font-bold text-center text-patriot-blue mb-4"
        >
          Shop by Category
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          All products are OTC-eligible and available at $0.00 with your Medicare Advantage benefits.
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none" role="list">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/catalog?category=${cat.id}`}
                className="flex flex-col items-center text-center p-5 bg-white rounded-xl
                           border border-gray-100 shadow-sm hover:shadow-md hover:border-patriot-blue
                           transition-all group"
              >
                {/* Fix (a11y): aria-hidden on decorative emoji */}
                <span className="text-4xl mb-3" aria-hidden="true">{cat.emoji}</span>
                <span className="font-semibold text-gray-900 group-hover:text-patriot-blue transition-colors">
                  {cat.label}
                </span>
                <span className="text-xs text-gray-500 mt-1 leading-snug">
                  {cat.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
