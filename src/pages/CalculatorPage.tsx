import { PageWrapper } from '../components/layout/PageWrapper'
import { PremiumForm } from '../components/calculator/PremiumForm'
import { ResultCard } from '../components/calculator/ResultCard'
import { Card } from '../components/ui/Card'

export const CalculatorPage = () => (
  <PageWrapper title='Premium Calculator' subtitle='Design a quote with riders, mode rebates, and instant maturity/death projection.' eyebrow='Core Engine'>
    <div className='grid gap-4 xl:grid-cols-5'>
      <div className='xl:col-span-3'>
        <PremiumForm />
      </div>
      <div className='space-y-4 xl:col-span-2'>
        <ResultCard />
        <Card variant='solid' className='space-y-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Tax Snapshot</p>
          <p className='text-sm text-[var(--text-secondary)]'>80C deduction applies under old regime limits. 10(10D) exemption depends on premium to SA rules by issue year.</p>
          <p className='text-xs text-[var(--text-tertiary)]'>Always validate final tax advice with latest applicable rules.</p>
        </Card>
      </div>
    </div>
  </PageWrapper>
)
