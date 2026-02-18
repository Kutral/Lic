import { AnimatePresence } from 'framer-motion'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/layout/BottomNav'
import { ToastViewport } from './components/ui/ToastViewport'
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
      <div className='relative min-h-screen overflow-x-hidden'>
        <div className='pointer-events-none fixed inset-0 -z-10'>
          <div className='absolute -left-20 top-[-140px] h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl' />
          <div className='absolute right-[-90px] top-[20%] h-[340px] w-[340px] rounded-full bg-emerald-400/15 blur-3xl' />
          <div className='absolute bottom-[-120px] left-[20%] h-[320px] w-[320px] rounded-full bg-indigo-500/18 blur-3xl' />
          <div className='absolute inset-0 bg-[linear-gradient(165deg,transparent,rgba(255,255,255,0.2),transparent)]' />
        </div>
        <ToastViewport />
        <AnimatedRoutes />
        <BottomNav />
      </div>
    </HashRouter>
  )
}
