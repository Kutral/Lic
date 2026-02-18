import { Calculator, CalendarDays, CircleDollarSign, GanttChartSquare, Landmark, PieChart, WalletCards } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'

const tools = [
  { name: 'Age Calculator', desc: 'Last birthday and nearest birthday calculations.', icon: CalendarDays },
  { name: 'Maturity Calculator', desc: 'Quick maturity estimate by SA, term, and bonus.', icon: WalletCards },
  { name: 'GST Calculator', desc: 'Premium-wise GST breakup by policy category/date.', icon: Landmark },
  { name: 'Loan Value Estimator', desc: 'Approximate policy loan eligibility by policy year.', icon: CircleDollarSign },
  { name: 'Premium Back-calculator', desc: 'Find SA based on client affordability target.', icon: Calculator },
  { name: 'SIP vs LIC View', desc: 'Visual comparison for goal-oriented conversations.', icon: PieChart },
  { name: 'Date Calculator', desc: 'Add months/years and compute intervals quickly.', icon: GanttChartSquare },
]

export const ToolsPage = () => (
  <PageWrapper title='Agent Tools' subtitle='Fast utility modules for daily advisory conversations and quote discovery.' eyebrow='Toolkit'>
    <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
      {tools.map((tool) => (
        <Card key={tool.name} variant='interactive' className='space-y-3'>
          <div className='inline-flex rounded-xl border border-blue-300/30 bg-blue-500/10 p-2 text-[var(--accent-blue)]'>
            <tool.icon size={16} />
          </div>
          <h3 className='font-semibold'>{tool.name}</h3>
          <p className='text-sm text-[var(--text-secondary)]'>{tool.desc}</p>
        </Card>
      ))}
    </div>
  </PageWrapper>
)
