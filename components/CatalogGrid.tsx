'use client'
// Fix #11: CatalogGrid is the client component with filtering, wrapped in Suspense
// Fix #4: useCallback for stable addItem reference
// Fix #6: proper key props

import { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { useCartActions } from './CartProvider'
import ProductCard from './ProductCard'
import type { Product, Category } from '@/data/products'

export default function CatalogGrid() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get('category') as Category | null) ?? 'all'
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory)

  const { addItem } = useCartActions()
  const handleAdd = useCallback((product: Product) => addItem(product), [addItem])

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div>
      {/* Category filter tabs */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter products by category"
      >
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
            ${activeCategory === 'all'
              ? 'bg-patriot-blue text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-patriot-blue'
            }`}
          aria-pressed={activeCategory === 'all'}
        >
          All Products ({products.length})
        </button>
        {categories.map(cat => {
          const count = products.filter(p => p.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                ${activeCategory === cat.id
                  ? 'bg-patriot-blue text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-patriot-blue'
                }`}
              aria-pressed={activeCategory === cat.id}
            >
              <span aria-hidden="true">{cat.emoji}</span> {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Product grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        aria-live="polite"
        aria-label={`${filtered.length} products shown`}
      >
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No products found in this category.
        </p>
      )}
    </div>
  )
}
