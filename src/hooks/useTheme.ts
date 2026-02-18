import { useEffect } from 'react'
import { useThemeStore } from '../store/themeStore'

const applyTheme = (theme: 'light' | 'dark' | 'auto') => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const finalTheme = theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme
  document.documentElement.dataset.theme = finalTheme
}

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const stored = localStorage.getItem('lic-theme') as 'light' | 'dark' | 'auto' | null
    applyTheme(stored ?? theme)
  }, [theme])

  return {
    theme,
    setTheme: (next: 'light' | 'dark' | 'auto') => {
      setTheme(next)
      applyTheme(next)
    },
  }
}
