import { ShieldCheck } from 'lucide-react'
import type { LICPlan } from '../../types'
import { Card } from '../ui/Card'

export const PlanCard = ({ plan }: { plan: LICPlan }) => (
  <Card variant='interactive' className='space-y-3'>
    <div className='flex items-start justify-between'>
      <div>
        <p className='text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Plan {plan.planNo}</p>
        <h3 className='text-lg font-semibold text-[var(--text-primary)]'>{plan.name}</h3>
      </div>
      <span className='rounded-xl border border-blue-300/20 bg-blue-500/10 p-2 text-[var(--accent-indigo)]'>
        <ShieldCheck size={16} />
      </span>
    </div>
    <p className='line-clamp-2 text-sm text-[var(--text-secondary)]'>{plan.description}</p>
    <div className='grid grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]'>
      <p>Age: {plan.minAge} to {plan.maxAge}</p>
      <p>Term: {plan.minTerm} to {plan.maxTerm}</p>
      <p>Min SA: INR {plan.minSA.toLocaleString('en-IN')}</p>
      <p className='capitalize'>Type: {plan.type}</p>
    </div>
  </Card>
)
