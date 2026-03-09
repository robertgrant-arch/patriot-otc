// Fix #1 (High Priority): Lazy-load all below-fold sections with next/dynamic
// Hero + CarrierLogos are above the fold — stay as static imports
// Fix (a11y): <main> wrapper is in layout.tsx

import Hero from '@/components/Hero'
import CarrierLogos from '@/components/CarrierLogos'
import dynamic from 'next/dynamic'

// Fix #1: Lazy-load all below-fold sections to reduce initial parse time (~35-45 KB savings)
const PopularProducts = dynamic(() => import('@/components/PopularProducts'))
const Categories      = dynamic(() => import('@/components/Categories'))
const HowItWorks      = dynamic(() => import('@/components/HowItWorks'))
const SocialProof     = dynamic(() => import('@/components/SocialProof'))
const Testimonials    = dynamic(() => import('@/components/Testimonials'))
const FAQ             = dynamic(() => import('@/components/FAQ'))
const BenefitLookup   = dynamic(() => import('@/components/BenefitLookup'))
const CTA             = dynamic(() => import('@/components/CTA'))

export default function HomePage() {
  return (
    <>
      {/* Above the fold — static imports for fastest LCP */}
      <Hero />
      <CarrierLogos />

      {/* Below the fold — lazy loaded */}
      <PopularProducts />
      <Categories />
      <HowItWorks />
      <SocialProof />
      <Testimonials />
      <FAQ />
      <BenefitLookup />
      <CTA />
    </>
  )
}
