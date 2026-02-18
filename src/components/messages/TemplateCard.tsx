import { Copy } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { useUIStore } from '../../store/uiStore'

export const TemplateCard = ({ title, body }: { title: string; body: string }) => {
  const { showToast } = useUIStore()

  return (
    <Card variant='interactive' className='space-y-3'>
      <h3 className='font-semibold'>{title}</h3>
      <p className='text-sm text-[var(--text-secondary)]'>{body}</p>
      <Button
        variant='secondary'
        size='sm'
        leadingIcon={<Copy size={14} />}
        onClick={async () => {
          await navigator.clipboard.writeText(body)
          showToast('Message copied', 'Paste directly in WhatsApp or SMS.')
        }}
      >
        Copy Template
      </Button>
    </Card>
  )
}
