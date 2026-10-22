import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useKitchen } from '../kitchen/KitchenContext'

function FavoriteButton({ slug, className = '' }) {
  const { user } = useAuth()
  const { isFavorite, toggleFavorite } = useKitchen()
  const navigate = useNavigate()
  const location = useLocation()
  const saved = isFavorite(slug)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved recipes' : 'Save recipe'}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-mkt-teal shadow-card backdrop-blur transition hover:-translate-y-0.5 ${className}`}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        if (!user) {
          navigate(`/login?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`)
          return
        }
        toggleFavorite(slug)
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
      </svg>
    </button>
  )
}

export default FavoriteButton
