import { AnimatePresence } from 'framer-motion'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/layout/BottomNav'
import { ToastViewport } from './components/ui/ToastViewport'
import { CalculatorPage } from './pages/CalculatorPage'
import { ComparePage } from './pages/ComparePage'
import { HomePage } from './pages/HomePage'
import { MessagesPage } from './pages/MessagesPage'
import { PlansPage } from './pages/PlansPage'
import { SettingsPage } from './pages/SettingsPage'
import { ToolsPage } from './pages/ToolsPage'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomePage />} />
        <Route path='/calculator' element={<CalculatorPage />} />
        <Route path='/plans' element={<PlansPage />} />
        <Route path='/compare' element={<ComparePage />} />
        <Route path='/messages' element={<MessagesPage />} />
        <Route path='/tools' element={<ToolsPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </AnimatePresence>
  )
}

import { useTheme } from './hooks/useTheme'

export default function App() {
  useTheme() // Initialize theme system

  return (
    <HashRouter>
      <div className='relative min-h-screen overflow-x-hidden'>
        <div className='pointer-events-none fixed inset-0 -z-10' />

        <ToastViewport />
        <AnimatedRoutes />
        <BottomNav />
      </div>
    </HashRouter>
  )
}
