import { Card } from '../ui/Card'
import { formatCurrencyINR } from '../../utils/formatCurrency'
import type { LICPlan } from '../../types'
import { calculatePremium } from '../../utils/premium-engine'

export const CompareTable = ({ plans }: { plans: LICPlan[] }) => {
  if (!plans.length) return null

  const rows = plans.map((plan) => {
    const output = calculatePremium({
      planNo: plan.planNo,
      dateOfBirth: '1995-01-01',
      sumAssured: Math.max(plan.minSA, 1000000),
      policyTerm: plan.minTerm,
      premiumPayingTerm: Math.max(5, Math.min(16, plan.minTerm)),
      paymentMode: 'yearly',
      includeAccidentalRider: false,
      includeTermRider: false,
      includePwbRider: false,
      smoker: false,
      gender: 'male',
      ageMode: 'nearest',
    })

    return {
      plan,
      premium: output.totalPremiumByMode,
      maturity: output.maturityEstimate,
      deathBenefit: output.deathBenefitEstimate,
    }
  })

  return (
    <Card className='overflow-auto'>
      <table className='w-full min-w-[640px] text-left text-sm'>
        <thead>
          <tr className='text-[var(--text-secondary)]'>
            <th className='py-2'>Plan</th>
            <th>Premium</th>
            <th>Maturity</th>
            <th>Death Benefit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.plan.planNo} className='border-t border-[var(--separator)]'>
              <td className='py-2'>{row.plan.name}</td>
              <td>{formatCurrencyINR(row.premium)}</td>
              <td>{formatCurrencyINR(row.maturity)}</td>
              <td>{formatCurrencyINR(row.deathBenefit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
