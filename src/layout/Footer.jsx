import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { FOOTER_LINKS } from '../constants/navigation'

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-divider bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 py-8 md:flex-row md:py-10">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Healthy recipe finder" className="h-8 w-auto" />
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="text-sm font-semibold text-mkt-nav transition-colors hover:text-primary">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <a href="#" className="opacity-80 transition hover:-translate-y-0.5 hover:opacity-100" aria-label="Instagram">
            <img src="/assets/images/icon-instagram.svg" alt="" />
          </a>
          <a href="#" className="opacity-80 transition hover:-translate-y-0.5 hover:opacity-100" aria-label="Bluesky">
            <img src="/assets/images/icon-bluesky.svg" alt="" />
          </a>
          <a href="#" className="opacity-80 transition hover:-translate-y-0.5 hover:opacity-100" aria-label="Tiktok">
            <img src="/assets/images/icon-tiktok.svg" alt="" />
          </a>
        </div>
      </div>
      <p className="mx-auto max-w-7xl pb-6 text-center text-sm font-medium text-ink-muted md:text-left">
        Made with ❤️ and 🥑
      </p>
    </footer>
  )
}

export default Footer
