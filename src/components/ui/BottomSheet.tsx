import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

interface BottomSheetProps extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
    title?: string
}

export const BottomSheet = ({ isOpen, onClose, title, children }: BottomSheetProps) => {
    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm'
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        drag='y'
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100) onClose()
                        }}
                        className='fixed bottom-0 left-0 right-0 z-50 flex max-h-[90vh] flex-col rounded-t-[28px] bg-[var(--bg-elev-2)] shadow-2xl'
                    >
                        {/* Handle Bar */}
                        <div className='flex justify-center p-3 cursor-grab active:cursor-grabbing'>
                            <div className='h-1.5 w-12 rounded-full bg-[var(--stroke-strong)] opacity-30' />
                        </div>

                        {/* Header */}
                        <div className='flex items-center justify-between border-b border-[var(--stroke-soft)] px-5 pb-4'>
                            <h3 className='text-[17px] font-semibold text-[var(--text-primary)]'>{title}</h3>
                            <button
                                onClick={onClose}
                                className='rounded-full bg-[var(--bg-elev-3)] p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-black/5 active:scale-95'
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content - Scrollable */}
                        <div className='flex-1 overflow-y-auto px-5 pb-8 pt-4 [scrollbar-gutter:stable]'>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
