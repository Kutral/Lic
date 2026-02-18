import { useState } from 'react'
import { CompareTable } from '../components/compare/CompareTable'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { plans } from '../data/plans'

export const ComparePage = () => {
  const [selected, setSelected] = useState<number[]>([736, 745])

  return (
    <PageWrapper title='Plan Comparison' subtitle='Pick up to 3 plans and compare premium, maturity, and death benefits side by side.' eyebrow='Decision Studio'>
      <Card variant='glass' className='mb-4'>
        <label className='mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Select Plans (up to 3)</label>
        <select
          multiple
          className='min-h-40 w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-3 text-sm shadow-[var(--shadow-soft)] outline-none'
          value={selected.map(String)}
          onChange={(event) => {
            const values = Array.from(event.target.selectedOptions).map((option) => Number(option.value)).slice(0, 3)
            setSelected(values)
          }}
        >
          {plans.map((plan) => (
            <option key={plan.planNo} value={plan.planNo}>
              {plan.planNo} - {plan.name}
            </option>
          ))}
        </select>
      </Card>
      <CompareTable plans={plans.filter((plan) => selected.includes(plan.planNo))} />
    </PageWrapper>
  )
}
