import { PageWrapper } from '../components/layout/PageWrapper'
import { PlanCard } from '../components/plans/PlanCard'
import { Input } from '../components/ui/Input'
import { usePlanFilter } from '../hooks/usePlanFilter'
import { planCategories } from '../data/plans'

export const PlansPage = () => {
  const { query, setQuery, type, setType, filteredPlans } = usePlanFilter()

  return (
    <PageWrapper title='Policy Encyclopedia'>
      <div className='mb-4 grid gap-3 md:grid-cols-3'>
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Search by plan name or number' />
        <select
          className='rounded-2xl border border-[var(--separator)] bg-[var(--bg-card)] px-3 py-3 text-sm md:col-span-2'
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
      </div>

      <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
        {filteredPlans.map((plan) => (
          <PlanCard key={plan.planNo} plan={plan} />
        ))}
      </div>
    </PageWrapper>
  )
}
