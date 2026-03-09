import type { Category } from './products'

export interface CategoryInfo {
  id: Category
  label: string
  emoji: string
  description: string
}

export const categories: CategoryInfo[] = [
  { id: 'pain-relief',    label: 'Pain Relief',    emoji: '💊', description: 'Acetaminophen, ibuprofen, topical creams and more' },
  { id: 'vitamins',       label: 'Vitamins',        emoji: '🌿', description: 'Multivitamins, Vitamin D, Omega-3, and supplements' },
  { id: 'dental',         label: 'Dental Care',     emoji: '🦷', description: 'Toothpaste, electric brushes, mouthwash' },
  { id: 'allergy',        label: 'Allergy',         emoji: '🌸', description: 'Antihistamines, nasal sprays, and more' },
  { id: 'digestion',      label: 'Digestion',       emoji: '🫁', description: 'Heartburn, constipation, and stomach relief' },
  { id: 'personal-care',  label: 'Personal Care',   emoji: '🧼', description: 'Soap, incontinence products, compression socks' },
  { id: 'first-aid',      label: 'First Aid',       emoji: '🩹', description: 'Bandages, antibiotic ointments, wound care' },
  { id: 'eye-care',       label: 'Eye Care',        emoji: '👁️', description: 'Eye drops, reading glasses, and eye health' },
  { id: 'sleep',          label: 'Sleep',           emoji: '😴', description: 'Sleep aids, melatonin, and rest support' },
]
