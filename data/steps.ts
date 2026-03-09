// Fix #13: Steps data moved from component to data file

export interface Step {
  id: string
  icon: string
  title: string
  description: string
}

export const steps: Step[] = [
  {
    id: 'step-1',
    icon: '🔍',
    title: 'Check Your Benefits',
    description: 'Enter your zip code and Medicare Advantage plan details to instantly see your OTC credit amount.',
  },
  {
    id: 'step-2',
    icon: '🛒',
    title: 'Shop Eligible Products',
    description: 'Browse 24+ approved health products — vitamins, pain relief, dental care, and more. All at $0.00.',
  },
  {
    id: 'step-3',
    icon: '📦',
    title: 'Get Free Delivery',
    description: 'Your order ships free and arrives in 3–5 business days, right to your front door.',
  },
]
