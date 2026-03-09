// Fix #7: Plans data moved out of component into data file

export interface Plan {
  id: string
  name: string
  otcCredit: number   // dollar amount per period
  period: 'month' | 'quarter' | 'year'
}

export const plans: Record<string, Plan[]> = {
  humana: [
    { id: 'humana-gold', name: 'Humana Gold Plus HMO', otcCredit: 75, period: 'month' },
    { id: 'humana-choice', name: 'Humana Choice PPO', otcCredit: 50, period: 'month' },
    { id: 'humana-value', name: 'Humana Value HMO', otcCredit: 100, period: 'quarter' },
  ],
  aetna: [
    { id: 'aetna-medicare', name: 'Aetna Medicare Advantage HMO', otcCredit: 90, period: 'month' },
    { id: 'aetna-elite', name: 'Aetna Medicare Elite PPO', otcCredit: 60, period: 'month' },
    { id: 'aetna-value', name: 'Aetna Medicare Value Plan', otcCredit: 150, period: 'quarter' },
  ],
  uhc: [
    { id: 'uhc-aarp', name: 'UHC AARP Medicare Advantage HMO', otcCredit: 80, period: 'month' },
    { id: 'uhc-choice', name: 'UHC Medicare Choice PPO', otcCredit: 55, period: 'month' },
    { id: 'uhc-complete', name: 'UHC Medicare Complete', otcCredit: 120, period: 'quarter' },
  ],
  anthem: [
    { id: 'anthem-mmp', name: 'Anthem Medicare Preferred HMO', otcCredit: 70, period: 'month' },
    { id: 'anthem-ppo', name: 'Anthem Medicare PPO', otcCredit: 45, period: 'month' },
    { id: 'anthem-select', name: 'Anthem Medicare Select', otcCredit: 200, period: 'quarter' },
  ],
  wellcare: [
    { id: 'wellcare-classic', name: 'Wellcare Classic HMO', otcCredit: 85, period: 'month' },
    { id: 'wellcare-value', name: 'Wellcare Value Script HMO', otcCredit: 60, period: 'month' },
    { id: 'wellcare-ultra', name: 'Wellcare Ultra HMO', otcCredit: 250, period: 'quarter' },
  ],
}
