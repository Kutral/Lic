import { create } from 'zustand'

type ThemeMode = 'light' | 'dark' | 'auto'

interface ThemeState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'auto',
  setTheme: (theme) => {
    set({ theme })
    localStorage.setItem('lic-theme', theme)
  },
}))
