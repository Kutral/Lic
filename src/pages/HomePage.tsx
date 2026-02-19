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

      <section className='mb-6'>
        <div className='mb-3 flex items-center justify-between px-1'>
          <h2 className='text-[13px] font-semibold text-[var(--text-secondary)]'>Trending Plans</h2>
          <Link to='/plans' className='text-[13px] font-medium text-[var(--accent-blue)]'>
            See All <ArrowRight size={12} className='inline' />
          </Link>
        </div>
        <div className='no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-gutter:stable] [touch-action:pan-x]'>
          {trending.map((plan) => (
            <Card key={plan.planNo} variant='interactive' className='min-w-[85%] snap-center shrink-0 sm:min-w-[320px]'>
              <div className='mb-1 flex items-start justify-between'>
                <p className='text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]'>Table {plan.planNo}</p>
                <span className='rounded-full bg-[var(--bg-elev-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]'>Endowment</span>
              </div>
              <h3 className='text-[17px] font-semibold text-[var(--text-primary)]'>{plan.name}</h3>
              <p className='mt-1 line-clamp-2 text-[13px] leading-relaxed text-[var(--text-secondary)]'>{plan.description}</p>
              <div className='mt-4 flex items-center justify-between border-t border-[var(--stroke-soft)] pt-3'>
                <p className='text-[11px] font-medium text-[var(--text-tertiary)]'>Premium from</p>
                <p className='text-[15px] font-semibold text-[var(--text-primary)]'>{formatCompactINR(plan.minSA)}</p>
              </div>
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
