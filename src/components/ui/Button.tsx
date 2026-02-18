import React from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => (
  <button
    className={clsx(
      'rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 active:scale-[0.97]',
      variant === 'primary' && 'bg-[var(--accent-blue)] text-white shadow-lg shadow-blue-500/20',
      variant === 'secondary' && 'bg-[var(--bg-grouped)] text-[var(--text-primary)]',
      variant === 'ghost' && 'bg-transparent text-[var(--accent-blue)]',
      className,
    )}
    {...props}
  />
)
