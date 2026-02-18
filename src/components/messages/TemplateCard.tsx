import { Card } from '../ui/Card'

export const TemplateCard = ({ title, body }: { title: string; body: string }) => (
  <Card className='space-y-2'>
    <h3 className='font-semibold'>{title}</h3>
    <p className='text-sm text-[var(--text-secondary)]'>{body}</p>
  </Card>
)
