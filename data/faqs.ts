// Fix #6: FAQ data moved from component to data file

export interface FAQ {
  id: string
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: 'faq-001',
    question: 'What is an OTC benefit?',
    answer: 'An Over-The-Counter (OTC) benefit is a dollar allowance included in many Medicare Advantage plans that you can use to purchase approved health products like vitamins, pain relievers, dental care, and more — at no cost to you.',
  },
  {
    id: 'faq-002',
    question: 'How do I know if my plan includes OTC benefits?',
    answer: 'Use the "Check Your Benefits" tool on this page. Enter your zip code, select your insurance carrier, and choose your specific plan. We\'ll instantly show you your benefit amount.',
  },
  {
    id: 'faq-003',
    question: 'Do unused OTC credits roll over to the next month?',
    answer: 'This depends on your specific plan. Most plans do not allow rollover — credits expire at the end of each benefit period (monthly or quarterly). We recommend using your full benefit each period.',
  },
  {
    id: 'faq-004',
    question: 'How long does delivery take?',
    answer: 'Most orders are delivered within 3–5 business days. We offer free standard shipping on all OTC benefit orders. Expedited shipping may be available for an additional fee.',
  },
  {
    id: 'faq-005',
    question: 'Which Medicare Advantage plans are supported?',
    answer: 'PatriotOTC works with all major Medicare Advantage carriers including Humana, Aetna, UnitedHealthcare (UHC), Anthem, and Wellcare. If your carrier is not listed, please contact us.',
  },
  {
    id: 'faq-006',
    question: 'Is there a limit on how many products I can order?',
    answer: 'You can order any combination of eligible products up to your plan\'s OTC credit limit per benefit period. There is no minimum order amount.',
  },
]
