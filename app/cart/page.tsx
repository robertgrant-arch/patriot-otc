'use client'
// Fix (a11y): Proper heading structure and aria labels
// Fix #5: Uses split cart hooks (useCartItems, useCartTotal, useCartActions)

import Link from 'next/link'
import { useCartItems, useCartTotal, useCartActions } from '@/components/CartProvider'

export default function CartPage() {
  const items   = useCartItems()
  const total   = useCartTotal()
  const { removeItem, clearCart } = useCartActions()

  if (items.length === 0) {
    return (
      <div className="py-20 text-center px-4">
        <p className="text-6xl mb-6" aria-hidden="true">🛒</p>
        <h1 className="text-3xl font-bold text-patriot-blue mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Browse our catalog and add OTC-eligible products at $0.00.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-patriot-blue hover:bg-blue-900 text-white font-bold
                     py-4 px-8 rounded-xl text-lg transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-patriot-blue mb-8">Your Cart</h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <ul className="divide-y divide-gray-100" aria-label="Cart items">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-4 p-5">
                <span className="text-3xl" aria-hidden="true">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty} ·{' '}
                    <span className="text-green-700 font-medium">$0.00 each</span>
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium
                             transition-colors px-2 py-1 rounded"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-base">
            <div className="flex justify-between text-gray-600">
              <span>Retail Value</span>
              <span className="line-through">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold">
              <span>OTC Benefit Discount</span>
              <span>-${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-700 font-semibold">FREE</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-xl">
              <span>Your Total</span>
              <span className="text-green-700">$0.00</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/signup"
            className="flex-1 bg-patriot-red hover:bg-red-800 text-white font-bold
                       py-4 px-8 rounded-xl text-lg text-center transition-colors"
          >
            Checkout — $0.00
          </Link>
          <button
            onClick={clearCart}
            className="px-6 py-4 border border-gray-300 text-gray-600 rounded-xl
                       hover:bg-gray-50 font-medium transition-colors"
            aria-label="Clear all items from cart"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}
