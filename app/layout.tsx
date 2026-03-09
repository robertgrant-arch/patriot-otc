// Fix #2: CartProvider only wraps <main>, not entire <body>
// Fix #3: Full metadata, OpenGraph, Twitter cards, canonical URL
// Fix #17: JSON-LD Organization schema markup
// Fix (a11y): lang="en" on <html>

import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Fix #3: Comprehensive metadata
export const metadata: Metadata = {
  title: {
    default: 'PatriotOTC — Medicare OTC Benefits Made Easy',
    template: '%s | PatriotOTC',
  },
  description:
    'Get vitamins, pain relief, dental care and more delivered free using your Medicare Advantage OTC credits. Works with Humana, Aetna, UHC, Anthem, and Wellcare.',
  keywords: ['Medicare OTC benefits', 'Medicare Advantage', 'OTC credits', 'free health products', 'senior health'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'PatriotOTC — Medicare OTC Benefits Made Easy',
    description: 'Use your Medicare Advantage OTC credits for free health products delivered to your door.',
    url: 'https://patriototc.com',
    siteName: 'PatriotOTC',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PatriotOTC — Medicare OTC Benefits Made Easy',
    description: 'Free health products via your Medicare Advantage OTC credits.',
  },
  alternates: {
    canonical: 'https://patriototc.com',
  },
}

// Fix #17: JSON-LD Organization schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PatriotOTC',
  description: 'Medicare Advantage OTC benefits ordering service',
  url: 'https://patriototc.com',
  serviceType: 'Medicare OTC Benefits',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fix #17: JSON-LD schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Fix #2: Header is a Server Component — no cart needed at header level */}
        <Header />
        {/* Fix #2: CartProvider wraps only the content area, not the full layout */}
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  )
}
