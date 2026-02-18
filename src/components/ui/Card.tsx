import { clsx } from 'clsx'
import type { PropsWithChildren } from 'react'

export const Card = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <section
    className={clsx(
      'rounded-3xl border border-white/40 bg-[color-mix(in_srgb,var(--bg-card)_70%,transparent)] p-4 shadow-xl backdrop-blur-xl',
      className,
    )}
  >
    {children}
  </section>
)
