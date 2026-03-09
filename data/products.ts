// Fix #10: Proper TypeScript types for products

export type Category =
  | 'allergy'
  | 'digestion'
  | 'vitamins'
  | 'personal-care'
  | 'dental'
  | 'pain-relief'
  | 'first-aid'
  | 'eye-care'
  | 'sleep'

export interface Product {
  id: string
  name: string
  price: number         // original retail price (OTC cost = $0)
  category: Category
  emoji: string
  description: string
  inStock: boolean
}

export const products: Product[] = [
  // Pain Relief
  { id: 'p001', name: 'Tylenol Extra Strength (100 ct)', price: 12.99, category: 'pain-relief', emoji: '💊', description: 'Fast-acting acetaminophen for headaches, muscle aches, and minor arthritis pain.', inStock: true },
  { id: 'p002', name: 'Advil Ibuprofen (72 ct)', price: 10.49, category: 'pain-relief', emoji: '💊', description: 'Ibuprofen tablets for pain, fever, and inflammation relief.', inStock: true },
  { id: 'p003', name: 'Bengay Arthritis Cream (4 oz)', price: 9.99, category: 'pain-relief', emoji: '🧴', description: 'Topical pain relief cream for arthritis and muscle soreness.', inStock: true },

  // Vitamins & Supplements
  { id: 'p004', name: 'Centrum Silver Adults 50+ (100 ct)', price: 14.99, category: 'vitamins', emoji: '🌿', description: 'Complete multivitamin formulated for adults over 50.', inStock: true },
  { id: 'p005', name: 'Vitamin D3 2000 IU (90 ct)', price: 8.99, category: 'vitamins', emoji: '☀️', description: 'Supports bone health and immune function.', inStock: true },
  { id: 'p006', name: 'Fish Oil Omega-3 (60 ct)', price: 11.99, category: 'vitamins', emoji: '🐟', description: 'Supports heart health and joint flexibility.', inStock: true },
  { id: 'p007', name: 'Calcium + Vitamin D (120 ct)', price: 9.49, category: 'vitamins', emoji: '🦴', description: 'Essential for strong bones and teeth.', inStock: true },

  // Dental Care
  { id: 'p008', name: 'Sensodyne Toothpaste (4 oz)', price: 7.99, category: 'dental', emoji: '🦷', description: 'Toothpaste for sensitive teeth and cavity protection.', inStock: true },
  { id: 'p009', name: 'Oral-B Electric Toothbrush', price: 29.99, category: 'dental', emoji: '🪥', description: 'Rechargeable electric toothbrush for superior plaque removal.', inStock: true },
  { id: 'p010', name: 'Listerine Mouthwash (1L)', price: 6.99, category: 'dental', emoji: '🫧', description: 'Antiseptic mouthwash that kills 99.9% of germs.', inStock: true },

  // Allergy
  { id: 'p011', name: 'Zyrtec Allergy (45 ct)', price: 16.99, category: 'allergy', emoji: '🌸', description: '24-hour allergy relief from sneezing, runny nose, and itchy eyes.', inStock: true },
  { id: 'p012', name: 'Flonase Nasal Spray (72 sprays)', price: 14.99, category: 'allergy', emoji: '👃', description: 'Non-drowsy nasal allergy spray for full symptom relief.', inStock: true },

  // Digestion
  { id: 'p013', name: 'Prilosec OTC (42 ct)', price: 18.99, category: 'digestion', emoji: '🫁', description: 'Treats frequent heartburn for 24-hour relief.', inStock: true },
  { id: 'p014', name: 'Miralax Laxative (30 doses)', price: 15.99, category: 'digestion', emoji: '💧', description: 'Gentle, effective relief from occasional constipation.', inStock: true },
  { id: 'p015', name: 'Pepto-Bismol (16 oz)', price: 8.49, category: 'digestion', emoji: '🩷', description: 'Relieves nausea, heartburn, indigestion, and diarrhea.', inStock: true },

  // Personal Care
  { id: 'p016', name: 'Dove Sensitive Skin Bar Soap (6 pk)', price: 7.99, category: 'personal-care', emoji: '🧼', description: 'Gentle moisturizing bar soap for sensitive skin.', inStock: true },
  { id: 'p017', name: 'Depends Underwear (20 ct)', price: 19.99, category: 'personal-care', emoji: '🛡️', description: 'Protective underwear for light to moderate bladder leakage.', inStock: true },
  { id: 'p018', name: 'Compression Socks (3 pairs)', price: 24.99, category: 'personal-care', emoji: '🧦', description: 'Graduated compression socks for improved circulation.', inStock: true },

  // First Aid
  { id: 'p019', name: 'Band-Aid Variety Pack (100 ct)', price: 8.99, category: 'first-aid', emoji: '🩹', description: 'Assorted adhesive bandages for minor cuts and scrapes.', inStock: true },
  { id: 'p020', name: 'Neosporin Antibiotic Ointment (1 oz)', price: 9.49, category: 'first-aid', emoji: '🧫', description: 'Triple antibiotic ointment to prevent infection in minor wounds.', inStock: true },

  // Eye Care
  { id: 'p021', name: 'Systane Ultra Eye Drops (2 pk)', price: 16.99, category: 'eye-care', emoji: '👁️', description: 'Lubricating eye drops for dry, irritated eyes.', inStock: true },
  { id: 'p022', name: 'Reading Glasses +2.00 (2 pk)', price: 14.99, category: 'eye-care', emoji: '👓', description: 'Lightweight reading glasses with anti-glare lenses.', inStock: true },

  // Sleep
  { id: 'p023', name: 'ZzzQuil Sleep Aid (24 ct)', price: 10.99, category: 'sleep', emoji: '😴', description: 'Non-habit-forming sleep aid for occasional sleeplessness.', inStock: true },
  { id: 'p024', name: 'Melatonin 5mg (60 ct)', price: 7.99, category: 'sleep', emoji: '🌙', description: 'Natural sleep support supplement for restful nights.', inStock: true },
]

// Fix #10: O(1) lookup map
export const productMap = new Map(products.map(p => [p.id, p]))

// Fix #10: Pre-grouped by category to avoid filtering on every render
export const productsByCategory = products.reduce<Partial<Record<Category, Product[]>>>(
  (acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category]!.push(p)
    return acc
  },
  {}
)
