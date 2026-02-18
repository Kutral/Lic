import { PageWrapper } from '../components/layout/PageWrapper'
import { TemplateCard } from '../components/messages/TemplateCard'

const templates = [
  {
    title: 'New Policy Quote',
    body: 'Hi {client_name}, your quote for {plan_name} is ready. Premium: {premium}, Sum Assured: {sum_assured}.',
  },
  {
    title: 'Policy Comparison Summary',
    body: 'For your goals, {plan_name} provides balanced protection and maturity value at {premium}.',
  },
  {
    title: 'Birthday Wish + Suggestion',
    body: 'Happy Birthday {client_name}. Wishing you health and success. This is a great time to review your protection needs.',
  },
  {
    title: 'Premium Reminder',
    body: 'Dear {client_name}, your premium of {premium} is due soon. Please pay on time to keep benefits active.',
  },
  {
    title: 'Maturity Intimation',
    body: 'Dear {client_name}, your policy {plan_name} is approaching maturity with estimated value {maturity_value}.',
  },
]

export const MessagesPage = () => (
  <PageWrapper title='Message Generator' subtitle='Use premium-ready templates with placeholders for fast client communication.' eyebrow='Agent Communication'>
    <div className='grid gap-3 md:grid-cols-2'>
      {templates.map((template) => (
        <TemplateCard key={template.title} title={template.title} body={template.body} />
      ))}
    </div>
  </PageWrapper>
)
