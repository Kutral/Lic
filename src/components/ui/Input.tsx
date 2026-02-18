import type { InputHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leading?: ReactNode
  trailing?: ReactNode
}

export const Input = ({ className, label, helperText, error, leading, trailing, ...props }: InputProps) => (
  <label className='block'>
    {label && <span className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>{label}</span>}
    <span
      className={clsx(
        'flex items-center gap-2 rounded-2xl border bg-[var(--bg-elev-2)] px-3 py-2.5 text-sm text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition focus-within:border-[var(--stroke-strong)] focus-within:ring-2 focus-within:ring-blue-400/30',
        error ? 'border-red-400/40 ring-red-300/30' : 'border-[var(--stroke-soft)]',
      )}
    >
      {leading && <span className='text-[var(--text-tertiary)]'>{leading}</span>}
      <input
        className={clsx('w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-tertiary)]', className)}
        {...props}
      />
      {trailing && <span className='text-[var(--text-tertiary)]'>{trailing}</span>}
    </span>
    {error ? <span className='mt-1 block text-xs text-red-500'>{error}</span> : helperText ? <span className='mt-1 block text-xs text-[var(--text-tertiary)]'>{helperText}</span> : null}
  </label>
)
