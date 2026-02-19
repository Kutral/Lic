import { Card } from './Card'

interface StatTileProps {
  label: string
  value: string
  trend?: string
}

export const StatTile = ({ label, value, trend }: StatTileProps) => (
  <Card variant='metric' className='flex flex-col justify-between space-y-1 py-4'>
    <p className='text-[13px] font-medium text-[var(--text-secondary)]'>{label}</p>
    <div className='flex items-baseline gap-2'>
      <p className='text-2xl font-semibold tracking-tight text-[var(--text-primary)]'>{value}</p>
      {trend && <p className='text-xs font-medium text-[var(--accent-emerald)]'>{trend}</p>}
    </div>
  </Card>
)
