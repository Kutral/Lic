import { create } from 'zustand'

interface ToastItem {
  id: number
  title: string
  description?: string
}

interface UIState {
  toasts: ToastItem[]
  showToast: (title: string, description?: string) => void
  dismissToast: (id: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  showToast: (title, description) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    set((state) => ({ toasts: [...state.toasts, { id, title, description }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) }))
    }, 2800)
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) })),
}))
