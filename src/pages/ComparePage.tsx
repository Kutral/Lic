import { useState } from 'react'
import { CompareTable } from '../components/compare/CompareTable'
import { PageWrapper } from '../components/layout/PageWrapper'
import { plans } from '../data/plans'

export const ComparePage = () => {
  const [selected, setSelected] = useState<number[]>([714, 936])

  return (
    <PageWrapper title='Plan Comparison'>
      <select
        multiple
        className='mb-4 min-h-36 w-full rounded-2xl border border-[var(--separator)] bg-[var(--bg-card)] px-3 py-3 text-sm'
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
      <CompareTable plans={plans.filter((plan) => selected.includes(plan.planNo))} />
    </PageWrapper>
  )
}
