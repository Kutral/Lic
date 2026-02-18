import { Card } from '../ui/Card'
import type { ClientRecord } from '../../store/db'

export const ClientCard = ({ client }: { client: ClientRecord }) => (
  <Card className='space-y-1'>
    <h3 className='font-semibold text-[var(--text-primary)]'>{client.name}</h3>
    <p className='text-sm text-[var(--text-secondary)]'>{client.phone}</p>
    {client.email && <p className='text-sm text-[var(--text-secondary)]'>{client.email}</p>}
  </Card>
)
