import { NavLink } from 'react-router-dom'
import { Calculator, Home, MessageSquareText, Settings, Sparkles } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/calculator', label: 'Quote', icon: Calculator },
  { to: '/messages', label: 'Messages', icon: MessageSquareText },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const BottomNav = () => (
  <nav className='fixed bottom-3 left-1/2 z-40 w-[min(96vw,760px)] -translate-x-1/2 rounded-[28px] border border-[var(--stroke-soft)] bg-[linear-gradient(140deg,var(--glass-strong),var(--glass-soft))] px-2 py-2 shadow-[var(--shadow-float)] backdrop-blur-2xl'>
    <ul className='grid grid-cols-4 gap-1'>
      {navItems.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              clsx(
                'relative flex flex-col items-center gap-0.5 rounded-2xl px-1 py-2.5 text-[10px] font-semibold tracking-wide transition',
                isActive ? 'text-[var(--accent-blue)]' : 'text-[var(--text-tertiary)]',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className='absolute inset-0 rounded-2xl border border-blue-300/30 bg-blue-500/10' />}
                <span className='relative z-10'>
                  <Icon size={17} />
                </span>
                <span className='relative z-10'>{label}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
    <div className='pointer-events-none absolute -top-2 right-4 rounded-full border border-blue-300/30 bg-blue-500/10 px-2 py-0.5 text-[10px] text-[var(--accent-blue)]'>
      <Sparkles size={10} className='mr-1 inline' /> Pro
    </div>
  </nav>
)
