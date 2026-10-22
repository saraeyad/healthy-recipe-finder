import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../constants/navigation'
import { useKitchen } from '../kitchen/KitchenContext'

function Navigation({ onLinkClick }) {
  const location = useLocation()
  const { favorites } = useKitchen()
  const isActive = (path) => {
    if (path === '/recipes') return location.pathname === '/recipes' || location.pathname.startsWith('/recipe/')
    return location.pathname === path
  }

  return (
    <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1">
      {NAV_LINKS.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="nav-link"
            aria-current={isActive(link.path) ? 'page' : undefined}
            onClick={onLinkClick}
          >
            {link.label}
            {link.path === '/saved' && favorites.length > 0 && (
              <span className="ml-1.5 rounded-full bg-mkt-mint-bg px-1.5 py-0.5 text-[11px] font-bold text-mkt-emerald-deep">
                {favorites.length}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navigation
