import { useMemo, useState } from 'react'
import { Calculator, CalendarClock, ChevronDown, CircleDollarSign, Search, ShieldPlus } from 'lucide-react'
import { plans } from '../../data/plans'
import { useCalculator } from '../../hooks/useCalculator'
import type { LICPlan } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'
import { SegmentedControl } from '../ui/SegmentedControl'

export const PremiumForm = () => {
  const { draft, selectedPlan, error, setDraft, runCalculation } = useCalculator()
  const [planSearch, setPlanSearch] = useState('')
  const [isPlanPickerOpen, setPlanPickerOpen] = useState(false)

  const filteredPlans = useMemo(() => {
    const q = planSearch.trim().toLowerCase()
    if (!q) return plans
    return plans.filter((plan) => plan.name.toLowerCase().includes(q) || String(plan.planNo).includes(q))
  }, [planSearch])

  const applyPlan = (plan: LICPlan) => {
    setDraft({
      planNo: plan.planNo,
      policyTerm: plan.minTerm,
      premiumPayingTerm: Math.min(plan.minTerm, 16),
      sumAssured: Math.max(plan.minSA, draft.sumAssured),
    })
    setPlanPickerOpen(false)
    setPlanSearch('')
  }

  return (
    <Card variant='glass' className='space-y-5'>
      <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>
        <Calculator size={14} /> Quote Builder
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Select Plan</label>
        <button
          type='button'
          className='flex w-full items-center justify-between rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-3 text-left shadow-[var(--shadow-soft)]'
          onClick={() => setPlanPickerOpen((prev) => !prev)}
        >
          <span>
            <span className='block text-[11px] uppercase tracking-wide text-[var(--text-tertiary)]'>Current Plan</span>
            <span className='block text-sm font-semibold text-[var(--text-primary)]'>
              {selectedPlan ? `${selectedPlan.planNo} - ${selectedPlan.name}` : 'Choose a plan'}
            </span>
          </span>
          <ChevronDown size={16} className={isPlanPickerOpen ? 'rotate-180 transition' : 'transition'} />
        </button>

        {isPlanPickerOpen && (
          <div className='space-y-2 rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-2 shadow-[var(--shadow-soft)]'>
            <Input
              placeholder='Search by plan no or name'
              value={planSearch}
              onChange={(event) => setPlanSearch(event.target.value)}
              leading={<Search size={14} />}
            />
            <div className='max-h-64 overflow-auto'>
              {filteredPlans.map((plan) => (
                <button
                  key={plan.planNo}
                  type='button'
                  className='mb-1 w-full rounded-xl border border-transparent px-3 py-2 text-left text-sm hover:border-[var(--stroke-soft)] hover:bg-white/20'
                  onClick={() => applyPlan(plan)}
                >
                  <p className='font-semibold text-[var(--text-primary)]'>
                    {plan.planNo} - {plan.name}
                  </p>
                  <p className='text-xs capitalize text-[var(--text-tertiary)]'>
                    {plan.type} | Age {plan.minAge}-{plan.maxAge}
                  </p>
                </button>
              ))}
              {!filteredPlans.length && <p className='px-2 py-3 text-xs text-[var(--text-tertiary)]'>No matching plans found.</p>}
            </div>
          </div>
        )}
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Input label='Date of Birth' type='date' value={draft.dateOfBirth} onChange={(event) => setDraft({ dateOfBirth: event.target.value })} leading={<CalendarClock size={14} />} />
        <Input
          label='Sum Assured'
          type='number'
          min={selectedPlan?.minSA}
          max={selectedPlan?.maxSA}
          value={draft.sumAssured}
          onChange={(event) => setDraft({ sumAssured: Number(event.target.value || 0) })}
          leading='INR'
          helperText={selectedPlan ? `Allowed: INR ${selectedPlan.minSA.toLocaleString('en-IN')} to ${selectedPlan.maxSA.toLocaleString('en-IN')}` : ''}
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Input
          label='Policy Term'
          type='number'
          min={selectedPlan?.minTerm}
          max={selectedPlan?.maxTerm}
          value={draft.policyTerm}
          onChange={(event) => setDraft({ policyTerm: Number(event.target.value || 0) })}
          leading={<CircleDollarSign size={14} />}
        />
        <Input
          label='Premium Paying Term'
          type='number'
          min={1}
          max={draft.policyTerm}
          value={draft.premiumPayingTerm}
          onChange={(event) => setDraft({ premiumPayingTerm: Number(event.target.value || 0) })}
          leading={<CircleDollarSign size={14} />}
        />
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Payment Mode</label>
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
        <div className='space-y-2 md:col-span-2'>
          <label className='text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Riders</label>
          <div className='grid gap-2 md:grid-cols-3'>
            <label className='flex items-center gap-2 rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-3 text-xs text-[var(--text-secondary)]'>
              <input type='checkbox' checked={draft.includeAccidentalRider} onChange={(event) => setDraft({ includeAccidentalRider: event.target.checked })} />
              Accident Benefit
            </label>
            <label className='flex items-center gap-2 rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-3 text-xs text-[var(--text-secondary)]'>
              <input type='checkbox' checked={draft.includeTermRider} onChange={(event) => setDraft({ includeTermRider: event.target.checked })} />
              Term Rider
            </label>
            <label className='flex items-center gap-2 rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-3 text-xs text-[var(--text-secondary)]'>
              <input type='checkbox' checked={draft.includePwbRider} onChange={(event) => setDraft({ includePwbRider: event.target.checked })} />
              Premium Waiver
            </label>
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Life Profile</label>
          <SegmentedControl
            value={draft.gender}
            onChange={(gender) => setDraft({ gender })}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <SegmentedControl
            value={draft.smoker ? 'smoker' : 'non-smoker'}
            onChange={(next) => setDraft({ smoker: next === 'smoker' })}
            options={[
              { value: 'non-smoker', label: 'Non-smoker' },
              { value: 'smoker', label: 'Smoker' },
            ]}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Age Logic</label>
        <SegmentedControl
          value={draft.ageMode}
          onChange={(ageMode) => setDraft({ ageMode })}
          options={[
            { value: 'nearest', label: 'Nearest Birthday' },
            { value: 'last', label: 'Last Birthday' },
          ]}
        />
      </div>

      <Button className='w-full' size='lg' leadingIcon={<ShieldPlus size={16} />} onClick={() => runCalculation()}>
        Calculate Premium Quote
      </Button>

      {error && (
        <div className='rounded-2xl border border-rose-300/35 bg-rose-500/10 px-3 py-2 text-sm text-rose-600'>
          {error}
        </div>
      )}
    </Card>
  )
}
