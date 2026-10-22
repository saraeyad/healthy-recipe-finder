import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useAuth } from '../auth/AuthContext'
import { DASHBOARD_LINKS } from '../constants/navigation'

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true }
  if (name === 'Overview') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  }
  if (name === 'Calendar') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
    </svg>
  )
}

function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const signOut = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {open && (
        <button type="button" className="fixed inset-0 z-30 bg-ink/40 lg:hidden" aria-label="Close menu" onClick={close} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-mkt-night px-4 py-5 text-white transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <Link to="/" onClick={close} className="inline-flex w-fit rounded-2xl bg-white px-3 py-2">
          <img src={logo} alt="Healthy recipe finder" className="h-7 w-auto" />
        </Link>
        <div className="mt-6 flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-extrabold">
            {user.name.trim().slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold">{user.name}</span>
            <span className="block truncate text-xs text-mkt-dark-muted">{user.email}</span>
          </span>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Dashboard">
          {DASHBOARD_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/dashboard'}
              onClick={close}
              className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${
                isActive ? 'bg-white/10 text-white' : 'text-mkt-dark-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon name={link.label} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-white/10 pt-4">
          <Link to="/recipes" onClick={close} className="flex h-11 items-center rounded-2xl px-3 text-sm font-bold text-mkt-dark-muted hover:bg-white/5 hover:text-white">
            Browse recipes
          </Link>
          <button type="button" className="flex h-11 w-full items-center rounded-2xl px-3 text-left text-sm font-bold text-mkt-dark-muted hover:bg-white/5 hover:text-white" onClick={signOut}>
            Log out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-divider bg-canvas/90 px-4 py-3 backdrop-blur lg:hidden">
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white" aria-label="Open menu" onClick={() => setOpen(true)}>
            <img src="/assets/images/icon-hamburger-menu.svg" alt="" />
          </button>
          <span className="text-sm font-extrabold text-ink">Kitchen</span>
          <Link to="/recipes" className="text-sm font-bold text-primary">Recipes</Link>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
