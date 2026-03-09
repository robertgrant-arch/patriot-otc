// Fix #8: Branded carrier pill badges with proper colors and aria labels
// Server Component — no 'use client' needed

const CARRIERS = [
  { name: 'Humana',           color: '#00A651', bg: '#F0FDF4' },
  { name: 'Aetna',            color: '#7B1FA2', bg: '#FAF5FF' },
  { name: 'Wellcare',         color: '#D32F2F', bg: '#FFF5F5' },
  { name: 'Anthem',           color: '#003087', bg: '#EFF6FF' },
  { name: 'UnitedHealthcare', color: '#005DA8', bg: '#EFF6FF' },
]

export default function CarrierLogos() {
  return (
    <section
      aria-label="Supported Medicare Advantage carriers"
      className="py-8 bg-gray-50 border-y border-gray-100"
    >
      <p className="text-center text-sm text-gray-500 mb-4 font-medium">
        40 million seniors have OTC credits — works with all major carriers
      </p>
      <ul
        className="flex flex-wrap justify-center gap-3 px-4 list-none"
        role="list"
      >
        {CARRIERS.map(({ name, color, bg }) => (
          <li key={name}>
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-bold border"
              style={{ color, backgroundColor: bg, borderColor: color + '33' }}
            >
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
