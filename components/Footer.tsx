// Fix #14: Real routes instead of dead # links
// Fix #18: Fix placeholder links

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-patriot-blue text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-xl mb-2">
              <span aria-hidden="true">⭐</span> PatriotOTC
            </p>
            <p className="text-blue-200 text-sm leading-relaxed">
              Helping seniors access their Medicare Advantage OTC benefits since 2020.
              Free delivery on all orders.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <p className="font-semibold mb-3 text-blue-100">Quick Links</p>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Product Catalog</Link></li>
              <li><Link href="/#benefit-lookup" className="hover:text-white transition-colors">Check Your Benefits</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </nav>

          {/* Legal & Support */}
          <nav aria-label="Legal and support links">
            <p className="font-semibold mb-3 text-blue-100">Support</p>
            <ul className="space-y-2 text-sm text-blue-200">
              {/* Fix #18: Real routes instead of # */}
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-blue-700 pt-6 text-center text-sm text-blue-300">
          <p>
            &copy; {currentYear} PatriotOTC. All rights reserved.
            PatriotOTC is not affiliated with Medicare or any government agency.
          </p>
          <p className="mt-1">
            Medicare Advantage OTC benefits vary by plan. Check your plan documents for details.
          </p>
        </div>
      </div>
    </footer>
  )
}
