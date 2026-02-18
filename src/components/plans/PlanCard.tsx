import { ShieldCheck } from 'lucide-react'
import type { LICPlan } from '../../types'
import { Card } from '../ui/Card'

export const PlanCard = ({ plan }: { plan: LICPlan }) => (
  <Card className='space-y-3'>
    <div className='flex items-start justify-between'>
      <div>
        <p className='text-xs text-[var(--text-secondary)]'>Plan {plan.planNo}</p>
        <h3 className='text-lg font-semibold text-[var(--text-primary)]'>{plan.name}</h3>
      </div>
      <ShieldCheck size={18} className='text-[var(--accent-indigo)]' />
    </div>
    <div className='grid grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]'>
      <p>Age: {plan.minAge} to {plan.maxAge}</p>
      <p>Term: {plan.minTerm} to {plan.maxTerm}</p>
      <p>SA min: INR {plan.minSA.toLocaleString('en-IN')}</p>
      <p>Type: {plan.type}</p>
    </div>
  </Card>
)
