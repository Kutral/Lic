import { PageWrapper } from '../components/layout/PageWrapper'
import { TemplateCard } from '../components/messages/TemplateCard'

const templates = [
  {
    title: 'New Policy Quote',
    body: 'Hi {client_name}, your quote for {plan_name} is ready. Premium: {premium} for SA {sum_assured}.',
  },
  {
    title: 'Policy Comparison',
    body: 'Based on your goal, {plan_name} offers balanced protection and maturity value with premium {premium}.',
  },
  {
    title: 'Birthday Suggestion',
    body: 'Happy Birthday {client_name}. This is a good time to review protection and long-term savings options.',
  },
]

export const MessagesPage = () => (
  <PageWrapper title='Message Generator'>
    <div className='grid gap-3 md:grid-cols-2'>
      {templates.map((template) => (
        <TemplateCard key={template.title} title={template.title} body={template.body} />
      ))}
    </div>
  </PageWrapper>
)
