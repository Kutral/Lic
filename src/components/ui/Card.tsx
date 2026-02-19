import { clsx } from 'clsx'
import type { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  className?: string
  variant?: 'glass' | 'solid' | 'metric' | 'interactive'
  glow?: boolean
}

export const Card = ({ children, className, variant = 'glass', glow = false }: CardProps) => (
  <div
    className={clsx(
      'relative overflow-hidden rounded-[20px] p-4 transition-all duration-200',
      variant === 'glass' && 'bg-[var(--bg-elev-1)] border border-[var(--stroke-soft)]',
      variant === 'solid' && 'bg-[var(--bg-elev-2)]',
      variant === 'metric' && 'bg-[var(--bg-elev-1)] border border-[var(--stroke-soft)]',
      variant === 'interactive' && 'bg-[var(--bg-elev-1)] border border-[var(--stroke-soft)] active:scale-[0.98] active:bg-[var(--bg-elev-2)]',
      glow && 'border-[var(--accent-blue-soft)] shadow-[var(--shadow-soft)]', // Static glow instead of animation
      className,
    )}
  >
    {children}
  </div>
)
