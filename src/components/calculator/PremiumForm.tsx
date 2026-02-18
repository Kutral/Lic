import { plans } from '../../data/plans'
import { useCalculator } from '../../hooks/useCalculator'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'
import { SegmentedControl } from '../ui/SegmentedControl'

export const PremiumForm = () => {
  const { draft, selectedPlan, setDraft, runCalculation } = useCalculator()

  return (
    <Card className='space-y-4'>
      <label className='block text-xs font-semibold text-[var(--text-secondary)]'>Plan</label>
      <select
        className='w-full rounded-2xl border border-[var(--separator)] bg-[var(--bg-card)] px-3 py-3 text-sm'
        value={draft.planNo}
        onChange={(event) => {
          const planNo = Number(event.target.value)
          const plan = plans.find((entry) => entry.planNo === planNo)
          if (!plan) return

          setDraft({
            planNo,
            policyTerm: plan.minTerm,
            premiumPayingTerm: Math.min(plan.minTerm, 16),
            sumAssured: Math.max(plan.minSA, draft.sumAssured),
          })
        }}
      >
        {plans.map((plan) => (
          <option key={plan.planNo} value={plan.planNo}>
            {plan.planNo} - {plan.name}
          </option>
        ))}
      </select>

      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <label className='mb-1 block text-xs font-semibold text-[var(--text-secondary)]'>Date of Birth</label>
          <Input type='date' value={draft.dateOfBirth} onChange={(event) => setDraft({ dateOfBirth: event.target.value })} />
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-[var(--text-secondary)]'>Sum Assured (INR)</label>
          <Input
            type='number'
            min={selectedPlan?.minSA}
            max={selectedPlan?.maxSA}
            value={draft.sumAssured}
            onChange={(event) => setDraft({ sumAssured: Number(event.target.value || 0) })}
          />
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <label className='mb-1 block text-xs font-semibold text-[var(--text-secondary)]'>Policy Term</label>
          <Input
            type='number'
            min={selectedPlan?.minTerm}
            max={selectedPlan?.maxTerm}
            value={draft.policyTerm}
            onChange={(event) => setDraft({ policyTerm: Number(event.target.value || 0) })}
          />
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-[var(--text-secondary)]'>Premium Paying Term</label>
          <Input
            type='number'
            min={1}
            max={draft.policyTerm}
            value={draft.premiumPayingTerm}
            onChange={(event) => setDraft({ premiumPayingTerm: Number(event.target.value || 0) })}
          />
        </div>
      </div>

      <div>
        <label className='mb-2 block text-xs font-semibold text-[var(--text-secondary)]'>Payment Mode</label>
        <SegmentedControl
          value={draft.paymentMode}
          onChange={(paymentMode) => setDraft({ paymentMode })}
          options={[
            { value: 'yearly', label: 'Yearly' },
            { value: 'halfYearly', label: 'Half-Yearly' },
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'monthlySSS', label: 'Monthly SSS' },
          ]}
        />
      </div>

      <div className='grid gap-3 md:grid-cols-3'>
        <label className='flex items-center gap-2 rounded-2xl bg-[var(--bg-grouped)] p-3 text-xs'>
          <input
            type='checkbox'
            checked={draft.includeAccidentalRider}
            onChange={(event) => setDraft({ includeAccidentalRider: event.target.checked })}
          />
          Accident Rider
        </label>
        <label className='flex items-center gap-2 rounded-2xl bg-[var(--bg-grouped)] p-3 text-xs'>
          <input
            type='checkbox'
            checked={draft.includeTermRider}
            onChange={(event) => setDraft({ includeTermRider: event.target.checked })}
          />
          Term Rider
        </label>
        <label className='flex items-center gap-2 rounded-2xl bg-[var(--bg-grouped)] p-3 text-xs'>
          <input
            type='checkbox'
            checked={draft.includePwbRider}
            onChange={(event) => setDraft({ includePwbRider: event.target.checked })}
          />
          Premium Waiver
        </label>
      </div>

      <Button className='w-full' onClick={() => runCalculation()}>
        Calculate Premium
      </Button>
    </Card>
  )
}
