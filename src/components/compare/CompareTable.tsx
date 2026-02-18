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

  const best = [...rows].sort((a, b) => b.maturity - a.maturity)[0]?.plan.planNo

  return (
    <Card variant='glass'>
      <div className='grid gap-3 md:hidden'>
        {rows.map((row) => (
          <div key={row.plan.planNo} className='rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-3'>
            <p className='font-semibold'>{row.plan.name}</p>
            <p className='mt-1 text-xs text-[var(--text-secondary)]'>Premium: {formatCurrencyINR(row.premium)}</p>
            <p className='text-xs text-[var(--text-secondary)]'>Maturity: {formatCurrencyINR(row.maturity)}</p>
            <p className='text-xs text-[var(--text-secondary)]'>Death Benefit: {formatCurrencyINR(row.deathBenefit)}</p>
            <p className='mt-2 text-xs'>
              {row.plan.planNo === best ? (
                <span className='rounded-full border border-emerald-300/25 bg-emerald-500/15 px-2 py-1 text-[var(--accent-emerald)]'>Higher Maturity</span>
              ) : (
                <span className='text-[var(--text-tertiary)]'>Balanced</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className='hidden overflow-auto md:block'>
        <table className='w-full min-w-[680px] text-left text-sm'>
          <thead>
            <tr className='text-[var(--text-tertiary)]'>
              <th className='py-2'>Plan</th>
              <th>Premium</th>
              <th>Maturity</th>
              <th>Death Benefit</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.plan.planNo} className='border-t border-[var(--stroke-soft)]'>
                <td className='py-3 font-semibold'>{row.plan.name}</td>
                <td>{formatCurrencyINR(row.premium)}</td>
                <td>{formatCurrencyINR(row.maturity)}</td>
                <td>{formatCurrencyINR(row.deathBenefit)}</td>
                <td>
                  {row.plan.planNo === best ? (
                    <span className='rounded-full border border-emerald-300/25 bg-emerald-500/15 px-2 py-1 text-xs text-[var(--accent-emerald)]'>
                      Higher Maturity
                    </span>
                  ) : (
                    <span className='text-xs text-[var(--text-tertiary)]'>Balanced</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
