import React from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'fab' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-sm',
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[linear-gradient(120deg,var(--accent-blue),var(--accent-indigo))] text-white border border-blue-300/30 shadow-[var(--glow-blue)]',
  secondary: 'glass-panel text-[var(--text-primary)] border-[var(--stroke-soft)]',
  tertiary: 'bg-[var(--bg-elev-3)] text-[var(--text-primary)] border border-[var(--stroke-soft)]',
  destructive: 'bg-[linear-gradient(120deg,#ff5a6b,#ff2e55)] text-white border border-rose-200/20 shadow-lg shadow-rose-500/25',
  fab: 'h-12 min-w-12 rounded-full bg-[linear-gradient(140deg,var(--accent-blue),var(--accent-indigo))] px-4 text-white shadow-[var(--glow-blue)]',
  ghost: 'bg-transparent text-[var(--accent-blue)] border border-transparent',
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-tight transition duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60',
      variant !== 'fab' && sizeStyles[size],
      variantStyles[variant],
      className,
    )}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? <span className='h-3 w-3 animate-spin rounded-full border border-current border-r-transparent' /> : leadingIcon}
    <span>{children}</span>
    {!loading && trailingIcon}
  </button>
)
