import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../constants/navigation'
import { useAuth } from '../auth/AuthContext'
import { useKitchen } from '../kitchen/KitchenContext'

export function SavedHeart({ onClick, className = '' }) {
  const location = useLocation()
  const { user } = useAuth()
  const { favorites } = useKitchen()
  const active = location.pathname === '/saved'
  const filled = active || favorites.length > 0
  const count = favorites.length
  const destination = user
    ? '/saved'
    : `/login?next=${encodeURIComponent('/saved')}`

  return (
    <Link
      to={destination}
      onClick={onClick}
      aria-label={count > 0 ? `Saved recipes, ${count}` : 'Saved recipes'}
      aria-current={active ? 'page' : undefined}
      className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition duration-300 hover:-translate-y-0.5 ${
        active
          ? 'border-primary/15 bg-mkt-mint-bg text-primary'
          : 'border-ink/10 bg-white text-mkt-teal'
      } ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
          {count}
        </span>
      )}
    </Link>
  )
}

function Navigation({ onLinkClick }) {
  const location = useLocation()
  const { user } = useAuth()
  const links = NAV_LINKS.filter((link) => link.path !== '/saved' && (user || link.path !== '/plan'))
  const items = []
  links.forEach((link) => {
    items.push(link)
    if (user && link.path === '/recipes') items.push({ path: '/dashboard', label: 'Dashboard' })
  })
  const isActive = (path) => {
    if (path === '/recipes') return location.pathname === '/recipes' || location.pathname.startsWith('/recipe/')
    return location.pathname === path
  }

  return (
    <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1">
      {items.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="nav-link"
            aria-current={isActive(link.path) ? 'page' : undefined}
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navigation
