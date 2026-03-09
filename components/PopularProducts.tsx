'use client'
// Fix #4: useCallback to stabilize addItem reference
// Fix #6: proper key props on all .map() calls
// Fix (a11y): section aria-labelledby, descriptive heading

import { useCallback } from 'react'
import Link from 'next/link'
import { useCartActions } from './CartProvider'
import ProductCard from './ProductCard'
import { products } from '@/data/products'
import type { Product } from '@/data/products'

// Pre-slice outside component to avoid recalculation on every render
const FEATURED = products.slice(0, 6)

export default function PopularProducts() {
  const { addItem } = useCartActions()
  // Fix #4: useCallback so ProductCard memo is effective
  const handleAdd = useCallback((product: Product) => addItem(product), [addItem])

  return (
    <section
      id="popular-products"
      aria-labelledby="popular-products-heading"
      className="py-16 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="popular-products-heading"
          className="text-3xl font-bold text-center text-patriot-blue mb-4"
        >
          Popular OTC Products
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          These everyday health essentials are available at{' '}
          <strong className="text-green-700">$0.00</strong> using your Medicare Advantage OTC credits.
        </p>
        {/* Fix #6: key={p.id} on all mapped items */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-patriot-blue font-semibold
                       hover:underline text-lg"
          >
            Browse All 24+ Products →
          </Link>
        </div>
      </div>
    </section>
  )
}
