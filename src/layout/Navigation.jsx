import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../constants/navigation'

function Navigation({ onLinkClick }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <ul className="flex flex-col lg:flex-row lg:gap-10 lg:justify-center lg:w-1/2">
      {NAV_LINKS.map((link) => (
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

