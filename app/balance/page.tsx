import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Check My Balance | PatriotOTC',
  description: 'Check your OTC benefit card balance instantly. Works with Humana, Aetna, UnitedHealthcare, Anthem, and Wellcare.',
}

// Balance check is now handled via the modal on the homepage.
// This page redirects to home where the user can click "Check My Balance".
export default function BalancePage() {
  redirect('/')
}
