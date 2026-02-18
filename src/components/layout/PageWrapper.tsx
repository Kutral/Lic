import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

export const PageWrapper = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <motion.main
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
    className='mx-auto w-full max-w-5xl px-4 pb-28 pt-6 md:px-6'
  >
    <h1 className='mb-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl'>{title}</h1>
    {children}
  </motion.main>
)
