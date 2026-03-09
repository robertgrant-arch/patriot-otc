// Fix #4: Header is a Server Component — no 'use client' needed
// CartCount is isolated as a tiny Client Component island

import Link from 'next/link'
import CartCount from './CartCount'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav
        className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          className="font-bold text-patriot-blue text-lg flex items-center gap-1"
        >
          <span aria-hidden="true">⭐</span>
          <span>PatriotOTC</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/balance" className="text-patriot-red font-semibold hover:text-red-700 transition-colors">
            Check My Balance
          </Link>
          <Link href="/#how-it-works" className="hover:text-patriot-blue transition-colors">
            How It Works
          </Link>
          <Link href="/#categories" className="hover:text-patriot-blue transition-colors">
            Categories
          </Link>
          <Link href="/#benefit-lookup" className="hover:text-patriot-blue transition-colors">
            Check Benefits
          </Link>
          <Link href="/catalog" className="hover:text-patriot-blue transition-colors">
            Shop
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Fix #4: Only the cart count is a client component */}
          <CartCount />
          <Link
            href="/signup"
            className="bg-patriot-red hover:bg-red-800 text-white px-4 py-2 rounded-md
                        text-sm font-semibold transition-colors
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-patriot-red"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  )
}
