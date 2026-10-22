import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import recipes from '../../../data.json'
import Eyebrow from '../ui/Eyebrow'
import { GhostLink, PrimaryLink } from '../ui/Buttons'
import { useParallax } from '../../hooks/useParallax'

function Word({ i, children, className = '' }) {
  return (
    <span className={`mkt-word ${className}`} style={{ '--i': i }}>
      {children}
    </span>
  )
}

function Hero() {
  const featured = recipes.find((recipe) => recipe.slug.includes('salmon')) || recipes[0]
  const total = featured.prepMinutes + featured.cookMinutes
  const stageRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [pointer, setPointer] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [bgRef, bgOffset] = useParallax(70)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onMove = (event) => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x, y })
    setPointer(true)
  }

  const onLeave = () => {
    setTilt({ x: 0, y: 0 })
    setPointer(false)
  }

  return (
    <section className="relative isolate bg-canvas pt-28 lg:pt-36">
      <div ref={bgRef} className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[48rem] overflow-hidden lg:h-[56rem]">
        <img
          src="/assets/images/image-home-hero-large.webp"
          alt=""
          className="h-full w-full object-cover object-[72%_top]"
          style={{ transform: `translateY(${bgOffset * 0.35}px) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/95 via-canvas/88 to-canvas/55 lg:via-canvas/55 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-canvas via-canvas/70 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden mix-blend-multiply" aria-hidden="true">
        <div className="animate-aurora-a absolute -top-40 -left-[10%] h-[40rem] w-[40rem] rounded-full bg-mkt-glow/30 blur-3xl" />
        <div className="animate-aurora-b absolute -top-32 -right-[12%] h-[36rem] w-[36rem] rounded-full bg-mkt-sky/45 blur-3xl" />
        <div className="animate-aurora-c absolute top-[26rem] left-[30%] h-[28rem] w-[34rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-xl flex-col items-start text-start lg:max-w-[640px]">
          <Eyebrow tone="glass">Whole-food recipes for real weeknights</Eyebrow>
          <h1 className="mt-7 text-balance text-[2.25rem] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[58px] lg:leading-[1.12]">
            <Word i={1}>Healthy</Word>{' '}
            <Word i={2}>meals,</Word>{' '}
            <Word i={3}>cooked</Word>{' '}
            <span className="relative inline-block whitespace-nowrap">
              <Word i={4} className="bg-gradient-to-br from-primary via-mkt-teal to-mkt-emerald bg-clip-text text-transparent">
                faster
              </Word>
              <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -bottom-1.5 h-[0.35em] w-full text-mkt-mint">
                <path
                  d="M3 10.5C40 4 80 3 118 5.5c30 2 55 3.5 79 1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  className="mkt-draw"
                />
              </svg>
            </span>{' '}
            <Word i={5}>and</Word>{' '}
            <Word i={6}>worth</Word>{' '}
            <Word i={7}>repeating</Word>
          </h1>
          <p className="mkt-word mt-6 max-w-xl text-pretty text-base leading-relaxed text-mkt-body sm:text-lg lg:mt-7 lg:text-xl lg:leading-[1.7]" style={{ '--i': 9 }}>
            A calm little library of eight whole-food recipes you can cook tonight — no processed junk, no guesswork, no endless scrolling.
          </p>
          <div className="mkt-word mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:mt-9" style={{ '--i': 12 }}>
            <PrimaryLink to="/recipes">Start exploring</PrimaryLink>
            <GhostLink href="#how-it-works">See how it works</GhostLink>
          </div>
          <p className="mkt-word mt-5 text-[13px] font-medium text-ink-muted" style={{ '--i': 14 }}>
            Free to browse · Eight dishes · Ready in minutes
          </p>
        </div>

        <div
          ref={stageRef}
          className="mkt-stage relative mx-auto mt-16 max-w-5xl lg:mt-20"
          data-inview={inView ? '' : undefined}
          data-pointer={pointer ? '' : undefined}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div className="pointer-events-none absolute inset-x-8 top-12 -z-10 h-[70%] rounded-full bg-gradient-to-r from-mkt-glow/40 via-primary/25 to-mkt-sky/60 blur-3xl" />

          <div
            className="animate-float-slow pointer-events-none absolute -left-2 top-8 z-10 hidden sm:block lg:-left-6"
          >
            <div className="rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-float backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">On the table</p>
              <p className="text-sm font-extrabold text-ink">{total} minutes</p>
            </div>
          </div>
          <div className="animate-float-slower pointer-events-none absolute -right-2 top-16 z-10 hidden sm:block lg:-right-8">
            <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-float backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-status-on" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-on" />
              </span>
              <span className="text-sm font-bold text-ink">Whole foods only</span>
            </div>
          </div>

          <div
            className="mkt-tilt rounded-3xl border border-white/80 bg-white/85 p-2 shadow-float ring-1 ring-ink/[0.06] backdrop-blur-xl sm:p-3"
            style={{ '--tilt-x': tilt.x, '--tilt-y': tilt.y }}
          >
            <div className="rounded-2xl border border-divider bg-canvas/70">
              <div className="flex items-center justify-between gap-3 border-b border-divider px-4 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-status-attention/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-status-on/80" />
                </div>
                <div className="hidden items-center gap-1.5 rounded-lg bg-white px-3 py-1 text-xs text-ink-muted shadow-[0_1px_2px_rgba(11,46,48,0.06)] sm:flex">
                  <span>recipes.local/{featured.slug}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-status-on-bg px-2 py-0.5 text-[11px] font-semibold text-status-on">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-on" />
                  Ready tonight
                </span>
              </div>
              <div className="grid gap-4 p-3 md:grid-cols-[1.15fr_0.85fr] md:p-4">
                <img
                  src={featured.image.large}
                  alt={featured.title}
                  className="h-56 w-full rounded-2xl object-cover md:h-full"
                />
                <div className="flex flex-col justify-between gap-4 text-start">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Tonight&apos;s plate</p>
                    <h2 className="mt-1 text-xl font-extrabold leading-snug text-ink">{featured.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{featured.overview}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ['Servings', featured.servings],
                      ['Prep', `${featured.prepMinutes}m`],
                      ['Cook', `${featured.cookMinutes}m`],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-line bg-white px-2 py-2 text-center">
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{label}</div>
                        <div className="text-sm font-extrabold text-ink">{value}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/recipe/${featured.slug}`}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-mkt-teal text-sm font-bold text-white shadow-brand"
                  >
                    View recipe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#library" className="mx-auto mt-12 flex w-fit flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Scroll
          <span className="animate-scroll-hint block h-8 w-px bg-ink/25" />
        </a>
      </div>
    </section>
  )
}

export default Hero
