import { AnimatePresence } from 'framer-motion'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/layout/BottomNav'
import { CalculatorPage } from './pages/CalculatorPage'
import { ClientsPage } from './pages/ClientsPage'
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
        <Route path='/clients' element={<ClientsPage />} />
        <Route path='/messages' element={<MessagesPage />} />
        <Route path='/tools' element={<ToolsPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className='min-h-screen bg-[var(--bg-primary)]'>
        <div className='pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(0,122,255,0.15),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(52,199,89,0.11),transparent_30%),linear-gradient(180deg,var(--bg-grouped),var(--bg-primary))]' />
        <AnimatedRoutes />
        <BottomNav />
      </div>
    </HashRouter>
  )
}
