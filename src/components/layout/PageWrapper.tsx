import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { TopHeader } from './TopHeader'

interface PageWrapperProps extends PropsWithChildren {
  title?: string
  subtitle?: string
  eyebrow?: string
}

export const PageWrapper = ({ title, subtitle, eyebrow, children }: PageWrapperProps) => (
  <motion.main
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ type: 'spring', damping: 24, stiffness: 130 }}
    className='mx-auto w-full max-w-6xl px-4 pb-30 pt-5 md:px-6'
  >
    {title && <TopHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
    {children}
  </motion.main>
)
