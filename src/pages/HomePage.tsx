import { useMemo } from 'react'
import { ArrowRight, BarChart3, Calculator, Files, FolderKanban, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { StatTile } from '../components/ui/StatTile'
import { formatCompactINR } from '../utils/formatCurrency'
import { plans } from '../data/plans'
import { loadAgentProfile } from '../utils/agentProfile'

const getGreeting = (name?: string) => {
  const hour = new Date().getHours()
  const display = name?.trim() ? name.trim() : 'Agent'
  if (hour < 12) return `Good Morning, ${display}`
  if (hour < 17) return `Good Afternoon, ${display}`
  return `Good Evening, ${display}`
}

export const HomePage = () => {
  const trending = useMemo(() => plans.slice(0, 6), [])
  const agent = loadAgentProfile()

  return (
    <PageWrapper title={getGreeting(agent.name)} subtitle='Ready with premium quote tools, plan intelligence, and client-ready messaging.' eyebrow='LIC Premium Dashboard'>
      <section className='mb-4 grid gap-3 md:grid-cols-2'>
        <StatTile label='Active Plans' value={plans.length.toString()} />
        <StatTile label='Coverage Focus' value='Family + Retirement + Term' />
      </section>

      <section className='mb-5 grid grid-cols-2 gap-3 md:grid-cols-4'>
        {[
          { to: '/calculator', label: 'Calculator', icon: Calculator },
          { to: '/plans', label: 'Plans', icon: FolderKanban },
          { to: '/compare', label: 'Compare', icon: BarChart3 },
          { to: '/messages', label: 'Messages', icon: Files },
        ].map((item) => (
          <Link key={item.to} to={item.to}>
            <Card variant='interactive' className='h-full'>
              <item.icon size={18} className='mb-3 text-[var(--accent-blue)]' />
              <p className='text-sm font-semibold'>{item.label}</p>
              <p className='mt-1 text-xs text-[var(--text-tertiary)]'>Open module</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className='mb-5'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className='text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Trending Plans</h2>
          <Link to='/plans' className='text-xs font-semibold text-[var(--accent-blue)]'>
            View all <ArrowRight size={12} className='inline' />
          </Link>
        </div>
        <div className='no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [scrollbar-gutter:stable] [touch-action:pan-x]'>
          {trending.map((plan) => (
            <Card key={plan.planNo} variant='interactive' className='min-w-[82%] snap-start shrink-0 sm:min-w-[300px]'>
              <p className='text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Plan {plan.planNo}</p>
              <h3 className='text-base font-semibold'>{plan.name}</h3>
              <p className='mt-1 text-xs text-[var(--text-secondary)]'>{plan.description}</p>
              <p className='mt-3 text-xs text-[var(--text-tertiary)]'>Starts from {formatCompactINR(plan.minSA)}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card variant='glass' className='relative overflow-hidden'>
        <div className='grid-noise absolute inset-0' />
        <div className='relative flex items-center justify-between gap-3'>
          <div>
            <p className='text-[11px] uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Today Focus</p>
            <h3 className='text-xl font-bold'>Close 5 premium cases with compare + message flow</h3>
          </div>
          <Sparkles className='text-[var(--accent-champagne)]' />
        </div>
      </Card>
    </PageWrapper>
  )
}
