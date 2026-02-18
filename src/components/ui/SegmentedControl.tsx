import { clsx } from 'clsx'
import { motion } from 'framer-motion'

interface SegmentedControlProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: { label: string; value: T }[]
  className?: string
}

export const SegmentedControl = <T extends string>({ value, onChange, options, className }: SegmentedControlProps<T>) => (
  <div className={clsx('relative grid grid-flow-col auto-cols-fr rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-1', className)}>
    {options.map((option) => {
      const active = value === option.value
      return (
        <button
          key={option.value}
          type='button'
          onClick={() => onChange(option.value)}
          className={clsx('relative z-10 rounded-xl px-3 py-2 text-xs font-semibold transition', active ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]')}
        >
          {active && (
            <motion.span
              layoutId='segmented-pill'
              className='absolute inset-0 -z-10 rounded-xl bg-[linear-gradient(145deg,var(--glass-strong),var(--glass-soft))] shadow-[var(--shadow-soft)]'
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            />
          )}
          {option.label}
        </button>
      )
    })}
  </div>
)
