import { Card } from './Card'

interface StatTileProps {
  label: string
  value: string
  trend?: string
}

export const StatTile = ({ label, value, trend }: StatTileProps) => (
  <Card variant='metric' className='space-y-1'>
    <p className='text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>{label}</p>
    <p className='text-xl font-bold text-[var(--text-primary)] md:text-2xl'>{value}</p>
    {trend && <p className='text-xs text-[var(--accent-emerald)]'>{trend}</p>}
  </Card>
)
