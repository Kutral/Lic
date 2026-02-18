import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { formatCompactINR } from '../utils/formatCurrency'
import { plans } from '../data/plans'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning, Agent'
  if (hour < 17) return 'Good Afternoon, Agent'
  return 'Good Evening, Agent'
}

export const HomePage = () => {
  const trending = useMemo(() => plans.slice(0, 4), [])

  return (
    <PageWrapper title={getGreeting()}>
      <section className='mb-4 grid grid-cols-2 gap-3 md:grid-cols-4'>
        {[
          { to: '/calculator', label: 'Calculator' },
          { to: '/plans', label: 'Plans' },
          { to: '/clients', label: 'Clients' },
          { to: '/compare', label: 'Compare' },
        ].map((item) => (
          <Link key={item.to} to={item.to} className='rounded-2xl bg-[var(--bg-grouped)] p-4 text-sm font-semibold'>
            {item.label}
          </Link>
        ))}
      </section>

      <section className='mb-4'>
        <h2 className='mb-2 text-sm font-semibold text-[var(--text-secondary)]'>Trending Plans</h2>
        <div className='grid gap-3 md:grid-cols-2'>
          {trending.map((plan) => (
            <Card key={plan.planNo}>
              <p className='text-xs text-[var(--text-secondary)]'>Plan {plan.planNo}</p>
              <h3 className='text-lg font-semibold'>{plan.name}</h3>
              <p className='text-sm text-[var(--text-secondary)]'>Starts from {formatCompactINR(plan.minSA)}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <p className='text-xs text-[var(--text-secondary)]'>Policies calculated</p>
        <h3 className='text-3xl font-bold'>{(1240).toLocaleString('en-IN')}</h3>
      </Card>
    </PageWrapper>
  )
}
