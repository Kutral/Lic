import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'

export const ToolsPage = () => (
  <PageWrapper title='Agent Tools'>
    <div className='grid gap-3 md:grid-cols-2'>
      {['Age Calculator', 'Maturity Calculator', 'GST Calculator', 'Loan Value Estimator', 'Premium Back-calculator', 'Date Calculator'].map((tool) => (
        <Card key={tool}>
          <h3 className='font-semibold'>{tool}</h3>
          <p className='text-sm text-[var(--text-secondary)]'>Quick utility panel is scaffolded and ready for policy-specific formulas.</p>
        </Card>
      ))}
    </div>
  </PageWrapper>
)
