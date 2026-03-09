'use client'
// Fix #4 (a11y): aria-hidden on decorative emojis
// Fix #4: memo to prevent unnecessary re-renders
// Fix #4: focus-visible styles for keyboard navigation
// Fix #4: semantic <article> element

import { memo } from 'react'
import type { Product } from '@/data/products'

interface Props {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard = memo(function ProductCard({ product, onAddToCart }: Props) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Fix (a11y): aria-hidden on decorative emoji */}
      <span className="text-4xl" aria-hidden="true">{product.emoji}</span>

      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
        {product.category.replace('-', ' ')}
      </span>

      <h3 className="font-semibold text-gray-900 text-base leading-snug">
        {product.name}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed flex-1">
        {product.description}
      </p>

      <div className="flex items-baseline gap-2">
        <span
          className="line-through text-gray-400 text-sm"
          aria-label={`Regular price $${product.price}`}
        >
          ${product.price.toFixed(2)}
        </span>
        <span
          className="text-green-700 font-bold text-base"
          aria-label="Price with OTC benefits: free"
        >
          $0.00 FREE
        </span>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-auto w-full bg-patriot-blue hover:bg-blue-900 text-white
                   rounded-lg py-3 text-sm font-semibold transition-colors
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-patriot-blue"
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </article>
  )
})

export default ProductCard
