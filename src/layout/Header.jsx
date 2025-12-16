import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useMenu } from '../hooks/useMenu'
import Navigation from './Navigation'

function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu()

  return (
    <header className="box-border p-4 md:p-8 md:pb-5 lg:py-5 shadow-[inset_0_-1px_0_0_theme(colors.neutral.200)] outline-neutral-200 bg-neutral-100 fixed w-full top-0 left-0 z-30">
      <nav className="max-w-[1320px] mx-auto flex items-center justify-between" aria-label="Main navigation">
        <Link to="/">
          <img src={logo} alt="Healthy recipe finder logo" />
        </Link>

        <div
          id="nav-menu"
          className={`absolute top-[72px] md:top-[92px] overflow-hidden p-2 lg:p-0 w-[calc(100%-32px)] md:w-[calc(100%-64px)] rounded-b-[10px] bg-white flex flex-col gap-[10px] transition-all duration-500 ease-out lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto lg:static lg:flex-row lg:items-center lg:justify-between lg:bg-transparent lg:w-2/3 ${
            isMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
              : 'opacity-0 -translate-y-5 pointer-events-none scale-95'
          }`}
        >
          <Navigation onLinkClick={closeMenu} />
          <Link to="/recipes" className="btn btn-sm" onClick={closeMenu}>
            Browse recipes
          </Link>
        </div>

        <button
          className="z-50 w-10 h-10 rounded-sm bg-neutral-200 flex items-center justify-center lg:hidden"
          id="menu-btn"
          aria-controls="nav-menu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <img
            id="humburger"
            src={isMenuOpen ? '/assets/images/icon-close-menu.svg' : '/assets/images/icon-hamburger-menu.svg'}
            alt="menu"
          />
        </button>
      </nav>
    </header>
  )
}

export default Header

