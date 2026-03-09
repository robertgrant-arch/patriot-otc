'use client'
// Fix #1 (BUG 1): Fixed SSR/hydration timing bug where counters showed "0+"
// Solution: useState<number | null>(null) — null = not started, shows "—" until animation fires
// IntersectionObserver with RAF-based animation, properly disconnects after firing

import { useEffect, useRef, useState } from 'react'

interface StatProps {
  label: string
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
}

const STATS: StatProps[] = [
  { label: 'Seniors Helped',        target: 50000,   prefix: '',  suffix: '+' },
  { label: 'Average Star Rating',   target: 4.9,     prefix: '',  suffix: '/5.0 ★', decimals: 1 },
  { label: 'OTC Credits Redeemed',  target: 2000000, prefix: '$', suffix: '+' },
]

function AnimatedStat({ target, prefix = '', suffix = '', label, decimals = 0 }: StatProps) {
  // Fix #1: null = not started — prevents "0" flash on server render
  const [value, setValue] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()  // only animate once

        const duration = 1500
        const start = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(parseFloat((eased * target).toFixed(decimals)))
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, decimals])

  // Fix #1: Show "—" until animation starts (no "0" flash)
  const display = value === null
    ? '—'
    : `${prefix}${value.toLocaleString()}${suffix}`

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-patriot-blue" aria-live="polite">
        {display}
      </div>
      <div className="text-gray-600 mt-1 text-base">{label}</div>
    </div>
  )
}

export default function SocialProof() {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="py-16 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2
          id="social-proof-heading"
          className="text-center text-2xl font-bold text-patriot-blue mb-12"
        >
          Trusted by Seniors Across America
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STATS.map(stat => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
