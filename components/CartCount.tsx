'use client'
// Fix #4: Tiny isolated client component for cart count
// Keeps the rest of Header as a Server Component

import Link from 'next/link'
import { useCartCount } from './CartProvider'

export default function CartCount() {
  const count = useCartCount()
  if (count === 0) return (
    <Link
      href="/cart"
      aria-label="Cart, empty"
      className="relative text-patriot-blue flex items-center justify-center"
    >
      <span aria-hidden="true" className="text-2xl">🛒</span>
    </Link>
  )
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}
      className="relative text-patriot-blue flex items-center justify-center"
    >
      <span aria-hidden="true" className="text-2xl">🛒</span>
      <span
        className="absolute -top-1 -right-1 bg-patriot-red text-white text-xs
                   rounded-full w-5 h-5 flex items-center justify-center font-bold"
        aria-hidden="true"
      >
        {count}
      </span>
    </Link>
  )
}
