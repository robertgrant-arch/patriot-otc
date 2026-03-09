// Server Component — no 'use client' needed
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-gradient-to-br from-patriot-blue to-blue-900 text-white py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">
          Medicare Advantage OTC Benefits
        </p>
        <h1
          id="hero-heading"
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-balance"
        >
          Get Free Health Products<br />
          <span className="text-yellow-300">Using Your Medicare Benefits</span>
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Millions of seniors have unused OTC credits every month. Use yours to get vitamins,
          pain relief, dental care, and more — delivered free to your door.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-patriot-red hover:bg-red-800 text-white font-bold py-4 px-8
                       rounded-xl text-lg transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-white"
          >
            Check My Benefits — Free
          </Link>
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
        <p className="mt-6 text-blue-200 text-sm">
          <span aria-hidden="true">✓</span> No cost to you &nbsp;
          <span aria-hidden="true">✓</span> Works with Humana, Aetna, UHC, Anthem &amp; Wellcare &nbsp;
          <span aria-hidden="true">✓</span> Free shipping
        </p>
      </div>
    </section>
  )
}
