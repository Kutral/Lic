import { clsx } from 'clsx'

interface SegmentedControlProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: { label: string; value: T }[]
}

export const SegmentedControl = <T extends string>({ value, onChange, options }: SegmentedControlProps<T>) => (
  <div className='flex rounded-2xl bg-[var(--bg-grouped)] p-1'>
    {options.map((option) => (
      <button
        key={option.value}
        type='button'
        onClick={() => onChange(option.value)}
        className={clsx(
          'flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition',
          value === option.value
            ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
            : 'text-[var(--text-secondary)]',
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
)
