import type { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={clsx(
      'w-full rounded-2xl border border-[var(--separator)] bg-[var(--bg-card)] px-3 py-3 text-sm text-[var(--text-primary)] outline-none ring-[var(--accent-blue)] placeholder:text-[var(--text-secondary)] focus:ring-2',
      className,
    )}
    {...props}
  />
)
