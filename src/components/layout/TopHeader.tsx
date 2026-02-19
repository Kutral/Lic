import { motion } from 'framer-motion'

interface TopHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export const TopHeader = ({ eyebrow, title, subtitle }: TopHeaderProps) => (
  <motion.header
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Apple-like spring
    className='mb-6 pt-2'
  >
    {eyebrow && <p className='mb-1 text-[13px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]'>{eyebrow}</p>}
    <h1 className='text-[34px] font-bold leading-tight tracking-tight text-[var(--text-primary)]'>
      {title}
    </h1>
    {subtitle && <p className='mt-2 max-w-2xl text-[17px] leading-relaxed text-[var(--text-secondary)]'>{subtitle}</p>}
  </motion.header>
)
