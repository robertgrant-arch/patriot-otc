// Server Component — HeroButtons is the only client island
import HeroButtons from './HeroButtons'

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
          pain relief, dental care, and more &mdash; delivered free to your door.
        </p>
        <HeroButtons />
        <p className="mt-6 text-blue-200 text-sm">
          <span aria-hidden="true">&check;</span> No cost to you &nbsp;
          <span aria-hidden="true">&check;</span> Works with Humana, Aetna, UHC, Anthem &amp; Wellcare &nbsp;
          <span aria-hidden="true">&check;</span> Free shipping
        </p>
      </div>
    </section>
  )
}
