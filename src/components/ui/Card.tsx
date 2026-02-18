import { clsx } from 'clsx'
import type { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  className?: string
  variant?: 'glass' | 'solid' | 'metric' | 'interactive'
  glow?: boolean
}

export const Card = ({ children, className, variant = 'glass', glow = false }: CardProps) => (
  <section
    className={clsx(
      'relative overflow-hidden rounded-[24px] border p-4 md:p-5',
      variant === 'glass' && 'glass-panel',
      variant === 'solid' && 'bg-[var(--bg-elev-3)] border-[var(--stroke-soft)] shadow-[var(--shadow-soft)]',
      variant === 'metric' && 'glass-panel bg-[linear-gradient(150deg,var(--glass-strong),rgba(106,162,255,0.18))]',
      variant === 'interactive' && 'glass-panel transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]',
      glow && 'animate-[pulseGlow_4s_ease-in-out_infinite]',
      className,
    )}
  >
    {children}
  </section>
)
