import { Card } from '../ui/Card'
import type { ClientRecord } from '../../store/db'

export const ClientCard = ({ client }: { client: ClientRecord }) => (
  <Card variant='interactive' className='space-y-3'>
    <div className='flex items-center gap-3'>
      <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(140deg,var(--accent-blue),var(--accent-indigo))] text-sm font-bold text-white'>
        {client.name
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </div>
      <div>
        <h3 className='font-semibold text-[var(--text-primary)]'>{client.name}</h3>
        <p className='text-xs text-[var(--text-tertiary)]'>Added {new Date(client.createdAt).toLocaleDateString('en-IN')}</p>
      </div>
    </div>
    <div className='space-y-1 text-sm text-[var(--text-secondary)]'>
      <p>{client.phone}</p>
      {client.email && <p>{client.email}</p>}
    </div>
  </Card>
)
