// Fix #3: Per-page metadata
// Fix #11: Suspense boundary for CatalogGrid (client component with filtering)
// Fix (a11y): <main> is in layout.tsx; h1 here for page title

import type { Metadata } from 'next'
import { Suspense } from 'react'
import CatalogGrid from '@/components/CatalogGrid'

// Fix #3: Page-specific metadata
export const metadata: Metadata = {
  title: 'OTC Product Catalog',
  description:
    'Browse 24+ Medicare OTC-eligible health products — vitamins, pain relief, dental care and more. All at $0.00 with your Medicare Advantage benefits.',
}

// Fix #11: Skeleton fallback for Suspense
function CatalogSkeleton() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  )
}

export default function CatalogPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-patriot-blue mb-2">
            OTC Product Catalog
          </h1>
          <p className="text-gray-600 text-lg">
            All 24+ products below are available at{' '}
            <strong className="text-green-700">$0.00</strong> using your Medicare Advantage OTC credits.
          </p>
        </div>

        {/* Fix #11: Suspense boundary for client component with useSearchParams */}
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogGrid />
        </Suspense>
      </div>
    </div>
  )
}
