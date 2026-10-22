import { Link } from 'react-router-dom'

function Breadcrumb({ items }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-muted" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          {item.path ? (
            <Link to={item.path} className="rounded-full px-2 py-1 transition hover:bg-white hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
          {index < items.length - 1 && <span aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
