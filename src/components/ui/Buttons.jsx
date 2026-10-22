import { Link } from 'react-router-dom'

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function shell(className, extra) {
  return `${className} ${extra}`.trim()
}

export function PrimaryLink({ to, href, children, className = '' }) {
  const cls = shell(
    'group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-primary to-mkt-teal px-7 text-base font-bold text-white shadow-brand transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(0,101,114,0.65)]',
    className
  )
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100" />
      <span className="relative">{children}</span>
      <Arrow />
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  )
}

export function GhostLink({ to, href, children, className = '' }) {
  const cls = shell(
    'inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/80 px-6 text-base font-semibold text-mkt-teal backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-primary/30',
    className
  )
  const inner = (
    <>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m10 8 6 4-6 4V8Z" />
      </svg>
      {children}
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  )
}
