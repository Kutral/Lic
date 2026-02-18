import { PageWrapper } from '../components/layout/PageWrapper'
import { PlanCard } from '../components/plans/PlanCard'
import { Input } from '../components/ui/Input'
import { usePlanFilter } from '../hooks/usePlanFilter'
import { planCategories } from '../data/plans'
import { Card } from '../components/ui/Card'

export const PlansPage = () => {
  const { query, setQuery, type, setType, filteredPlans } = usePlanFilter()

  return (
    <PageWrapper title='Policy Encyclopedia' subtitle='Search across categories with eligibility, SA range, and premium planning context.' eyebrow='All LIC Plans'>
      <div className='mb-4 grid gap-3 md:grid-cols-3'>
        <Input label='Search' value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Plan name or number' />
        <label className='block md:col-span-2'>
          <span className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Category</span>
          <select
            className='w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-3 text-sm shadow-[var(--shadow-soft)] outline-none'
            value={type}
            onChange={(event) => setType(event.target.value as typeof type)}
          >
            <option value='all'>All categories</option>
            {planCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredPlans.length ? (
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          {filteredPlans.map((plan) => (
            <PlanCard key={plan.planNo} plan={plan} />
          ))}
        </div>
      ) : (
        <Card variant='glass'>
          <p className='text-sm text-[var(--text-secondary)]'>No plans matched your search. Try a plan number or switch category.</p>
        </Card>
      )}
    </PageWrapper>
  )
}
