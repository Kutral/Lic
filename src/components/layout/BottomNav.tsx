import { NavLink } from 'react-router-dom'
import { Calculator, Home, MessageSquareText, Settings, UserCircle2 } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/calculator', label: 'Calc', icon: Calculator },
  { to: '/clients', label: 'Clients', icon: UserCircle2 },
  { to: '/messages', label: 'Msgs', icon: MessageSquareText },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const BottomNav = () => (
  <nav className='fixed bottom-3 left-1/2 z-40 w-[min(95vw,560px)] -translate-x-1/2 rounded-3xl border border-white/30 bg-[color-mix(in_srgb,var(--bg-card)_72%,transparent)] px-2 py-2 backdrop-blur-xl'>
    <ul className='grid grid-cols-5 gap-1'>
      {navItems.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center rounded-2xl px-1 py-2 text-[10px] font-medium transition',
                isActive ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]' : 'text-[var(--text-secondary)]',
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
)
