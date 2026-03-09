import BalanceChecker from '@/components/BalanceChecker'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Check My Balance | PatriotOTC',
  description: 'Check your OTC benefit card balance instantly. Works with Humana, Aetna, UnitedHealthcare, Anthem, and Wellcare.',
}

export default function BalancePage() {
  return <BalanceChecker />
}
