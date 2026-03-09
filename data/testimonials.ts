// Fix #9: Testimonial data moved from component to data file

export interface Testimonial {
  id: string
  name: string
  age: number
  location: string
  avatar: string
  rating: number
  quote: string
  plan: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't001',
    name: 'Dorothy M.',
    age: 72,
    location: 'Phoenix, AZ',
    avatar: '👩‍🦳',
    rating: 5,
    quote: 'I had no idea I had $75 every month just sitting there unused. PatriotOTC made it so simple — I got my vitamins, pain cream, and dental supplies all for free!',
    plan: 'Humana Gold Plus HMO',
  },
  {
    id: 't002',
    name: 'Robert K.',
    age: 68,
    location: 'Tampa, FL',
    avatar: '👴',
    rating: 5,
    quote: 'My doctor mentioned I had OTC benefits but I never knew how to use them. This website walked me through everything in minutes. Highly recommend to any senior on Medicare.',
    plan: 'Aetna Medicare Advantage HMO',
  },
  {
    id: 't003',
    name: 'Margaret T.',
    age: 75,
    location: 'Dallas, TX',
    avatar: '👩‍🦱',
    rating: 5,
    quote: 'I was skeptical at first but everything arrived in just a few days. My compression socks and eye drops were completely free. This is a wonderful service for seniors.',
    plan: 'UHC AARP Medicare Advantage HMO',
  },
]
