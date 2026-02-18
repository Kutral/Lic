import { motion } from 'framer-motion'

interface TopHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export const TopHeader = ({ eyebrow, title, subtitle }: TopHeaderProps) => (
  <motion.header
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
    className='mb-5'
  >
    {eyebrow && <p className='mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]'>{eyebrow}</p>}
    <h1 className='text-[2rem] font-extrabold tracking-tight md:text-[2.6rem]'>
      <span className='gradient-text'>{title}</span>
    </h1>
    {subtitle && <p className='mt-1 max-w-2xl text-sm text-[var(--text-secondary)]'>{subtitle}</p>}
  </motion.header>
)
