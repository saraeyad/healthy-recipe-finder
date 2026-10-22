import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useMenu } from '../hooks/useMenu'
import { useScrollHeader } from '../hooks/useScrollHeader'
import Navigation, { SavedHeart } from './Navigation'
import { PrimaryLink } from '../components/ui/Buttons'

function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu()
  const { scrolled, progress } = useScrollHeader()
  const solid = scrolled || isMenuOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      <div
        className={`relative mx-auto border transition-[max-width,margin,background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          solid
            ? `mt-3 max-w-6xl border-white/80 bg-white/80 shadow-float backdrop-blur-xl ${isMenuOpen ? 'rounded-[1.75rem]' : 'rounded-full'}`
            : 'mt-0 max-w-7xl rounded-none border-transparent bg-transparent'
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left bg-gradient-to-r from-primary via-accent to-mkt-glow transition-opacity duration-300"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
        <div className={`flex items-center justify-between gap-4 px-3 transition-[height] duration-500 sm:px-5 ${solid ? 'h-16' : 'h-20 lg:h-24'}`}>
          <Link to="/" className="shrink-0 rounded-full" onClick={closeMenu}>
            <img src={logo} alt="Healthy recipe finder" className="h-8 w-auto" />
          </Link>

          <div className="hidden lg:block">
            <Navigation onLinkClick={closeMenu} />
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <SavedHeart />
            <PrimaryLink to="/recipes" className="!h-10 !px-5 !text-sm">
              Browse recipes
            </PrimaryLink>
          </div>

          <button
            className="z-50 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-sm lg:hidden"
            aria-controls="nav-menu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? '/assets/images/icon-close-menu.svg' : '/assets/images/icon-hamburger-menu.svg'}
              alt=""
            />
          </button>
        </div>

        <div
          id="nav-menu"
          className={`overflow-hidden px-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
            isMenuOpen ? 'max-h-[32rem] pb-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <Navigation onLinkClick={closeMenu} />
          <div className="mt-2 flex items-center gap-2">
            <SavedHeart onClick={closeMenu} />
            <Link to="/recipes" className="btn btn-sm" onClick={closeMenu}>
              Browse recipes
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
