import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '../../store/uiStore'

export const ToastViewport = () => {
  const { toasts, dismissToast } = useUIStore()

  return (
    <div className='pointer-events-none fixed left-1/2 top-4 z-50 w-[min(92vw,540px)] -translate-x-1/2 space-y-2'>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.button
            key={toast.id}
            type='button'
            onClick={() => dismissToast(toast.id)}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            className='glass-panel pointer-events-auto w-full rounded-2xl px-4 py-3 text-left'
          >
            <p className='text-sm font-semibold'>{toast.title}</p>
            {toast.description && <p className='text-xs text-[var(--text-secondary)]'>{toast.description}</p>}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
