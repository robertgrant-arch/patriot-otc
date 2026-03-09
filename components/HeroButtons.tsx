'use client'

import { useState } from 'react'
import Link from 'next/link'
import BalanceModal from './BalanceModal'

export default function HeroButtons() {
  const [showBalance, setShowBalance] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/signup"
          className="bg-patriot-red hover:bg-red-800 text-white font-bold py-4 px-8
                     rounded-xl text-lg transition-colors
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-white"
        >
          Check My Benefits &mdash; Free
        </Link>
        <button
          onClick={() => setShowBalance(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-patriot-blue font-bold py-4 px-8
                     rounded-xl text-lg transition-colors
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-white"
        >
          Check My Balance
        </button>
        <Link
          href="/catalog"
          className="bg-white text-patriot-blue hover:bg-blue-50 font-bold py-4 px-8
                     rounded-xl text-lg transition-colors
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-white"
        >
          Browse Products
        </Link>
      </div>
      <BalanceModal isOpen={showBalance} onClose={() => setShowBalance(false)} />
    </>
  )
}
