import { PageWrapper } from '../components/layout/PageWrapper'
import { PremiumForm } from '../components/calculator/PremiumForm'
import { ResultCard } from '../components/calculator/ResultCard'
import { Card } from '../components/ui/Card'

export const CalculatorPage = () => (
  <PageWrapper title='Premium Calculator'>
    <div className='grid gap-4 lg:grid-cols-5'>
      <div className='lg:col-span-3'>
        <PremiumForm />
      </div>
      <div className='space-y-4 lg:col-span-2'>
        <ResultCard />
        <Card>
          <p className='text-xs text-[var(--text-secondary)]'>Tax note</p>
          <p className='text-sm'>80C deduction applies in old tax regime. 10(10D) exemption depends on premium-to-SA thresholds.</p>
        </Card>
      </div>
    </div>
  </PageWrapper>
)
