import { useEffect, useRef, useState } from 'react'
import recipes from '../../../data.json'
import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'

const STEPS = [
  {
    title: 'Search in seconds',
    body: 'Type a name or an ingredient. The list narrows as you type, so dinner is a decision, not a scroll.',
    note: 'From eight recipes to the one you want',
  },
  {
    title: 'Filter by the time you have',
    body: 'Cap prep and cook time. Weeknights stay inside half an hour of active cooking.',
    note: '30 minutes is the whole promise',
  },
  {
    title: 'Cook from a short, honest list',
    body: 'Everyday ingredients, straightforward steps, and a picture of what the plate should look like.',
    note: 'No processed shortcuts',
  },
]

function SearchScene() {
  const matches = recipes.filter((recipe) =>
    `${recipe.title} ${recipe.overview} ${recipe.ingredients.join(' ')}`.toLowerCase().includes('lemon')
  ).slice(0, 2)

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="mkt-rise rounded-2xl border border-divider bg-white p-4 shadow-card" style={{ '--i': 0 }}>
        <div className="mb-3 text-sm font-bold text-ink">Find a recipe</div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-muted" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
          <span className="text-sm font-semibold text-ink">lemon</span>
          <span className="animate-caret inline-block h-4 w-px bg-primary" />
        </div>
      </div>
      {matches.map((recipe, index) => (
        <div
          key={recipe.id}
          className="mkt-rise flex items-center gap-3 rounded-2xl border border-divider bg-white p-2.5 text-start shadow-card"
          style={{ '--i': index + 1 }}
        >
          <img src={recipe.image.small} alt="" className="h-14 w-16 rounded-xl object-cover" />
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-ink">{recipe.title}</div>
            <div className="text-xs text-ink-muted">{recipe.prepMinutes + recipe.cookMinutes} min · {recipe.servings} servings</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TimeScene() {
  const recipe = recipes.find((item) => item.slug.includes('salmon')) || recipes[0]
  const chips = [5, 10, 15, 30]
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="mkt-rise flex flex-wrap gap-2" style={{ '--i': 0 }}>
        {chips.map((minutes) => (
          <span
            key={minutes}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              minutes === 30
                ? 'bg-gradient-to-br from-primary to-mkt-teal text-white shadow-brand'
                : 'border border-line bg-white text-ink-muted'
            }`}
          >
            {minutes} min
          </span>
        ))}
      </div>
      {[recipe, recipes.find((item) => item.slug.includes('chickpea'))].filter(Boolean).map((item, index) => (
        <div
          key={item.id}
          className={`mkt-rise flex items-center gap-3 rounded-2xl bg-white p-3 text-start shadow-card ${
            index === 0 ? 'border border-primary/30' : 'border border-divider'
          }`}
          style={{ '--i': index + 1 }}
        >
          <img src={item.image.small} alt="" className="h-16 w-20 rounded-xl object-cover" />
          <div>
            <div className="text-sm font-bold text-ink">{item.title}</div>
            <div className={`mt-1 text-xs font-semibold ${index === 0 ? 'text-mkt-emerald-deep' : 'text-ink-muted'}`}>
              {index === 0 ? 'Fits a weeknight' : 'Also under the cap'} · {item.prepMinutes + item.cookMinutes} min
            </div>
          </div>
        </div>
      ))}
      <div className="mkt-rise mt-auto rounded-2xl bg-mkt-mint-bg px-4 py-3 text-sm font-semibold text-mkt-emerald-deep" style={{ '--i': 3 }}>
        Prep and cook both stay under your cap.
      </div>
    </div>
  )
}

function CookScene() {
  const recipe = recipes.find((item) => item.slug.includes('salmon')) || recipes[0]
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="mkt-rise flex items-center justify-between rounded-2xl border border-divider bg-white px-4 py-3 shadow-card" style={{ '--i': 0 }}>
        <span className="text-sm font-bold text-ink">{recipe.title}</span>
        <span className="rounded-full bg-mkt-mint-bg px-2.5 py-1 text-[11px] font-semibold text-mkt-emerald-deep">
          {recipe.instructions.length} steps
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
          <li
            key={ingredient}
            className="mkt-rise flex items-center gap-3 rounded-2xl border border-divider bg-white px-3 py-2.5 text-start shadow-card"
            style={{ '--i': index + 1 }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-status-on-bg text-status-on">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span className="text-sm font-medium text-ink">{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SCENES = [SearchScene, TimeScene, CookScene]

function Stage({ active, single = false }) {
  const indices = single ? [active] : [0, 1, 2]
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-mkt-glow/25 via-transparent to-mkt-sky/40 blur-2xl sm:-inset-6" />
      <div className="relative min-h-[24rem] overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-3 shadow-float ring-1 ring-ink/[0.06] backdrop-blur-xl">
        <div className="mkt-dots absolute inset-0 opacity-80" aria-hidden="true" />
        {indices.map((index) => {
          const Scene = SCENES[index]
          const isActive = single || active === index
          return (
            <div
              key={index}
              className="mkt-scene absolute inset-3 flex flex-col sm:inset-4"
              data-active={isActive ? '' : undefined}
              aria-hidden={!isActive}
            >
              <Scene />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function HowItWorks() {
  const [active, setActive] = useState(0)
  const stepsRef = useRef([])

  useEffect(() => {
    const nodes = stepsRef.current.filter(Boolean)
    if (!nodes.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(Number(visible.target.dataset.step))
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.45, 0.7] }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="relative scroll-mt-24 bg-canvas px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <Eyebrow>Dinner, without the fuss</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.2] tracking-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
            Three steps from an empty search box to a plate
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
            No training and no spreadsheet. Search, filter by the time you have, then cook from a short list.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="order-first hidden lg:order-last lg:block">
            <div className="lg:sticky lg:top-28">
              <Stage active={active} />
            </div>
          </div>
          <div className="relative">
            <div className="absolute bottom-6 left-[18px] top-6 hidden w-px bg-line lg:block" aria-hidden="true">
              <div
                className="w-px bg-gradient-to-b from-primary to-mkt-mint transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ height: `${((active + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            {STEPS.map((step, index) => {
              const isActive = active === index
              return (
                <article
                  key={step.title}
                  ref={(node) => {
                    stepsRef.current[index] = node
                  }}
                  data-step={index}
                  className="relative flex min-h-[auto] flex-col justify-center py-8 lg:min-h-[72vh] lg:py-10 lg:pl-16"
                >
                  <div className="mb-6 lg:hidden">
                    <Stage active={index} single />
                  </div>
                  <div className="mb-4 hidden h-9 w-9 items-center justify-center rounded-full border border-white bg-white text-sm font-extrabold text-mkt-teal shadow-card lg:absolute lg:left-0 lg:flex">
                    {index + 1}
                  </div>
                  <p className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-ink-muted'}`}>0{index + 1}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">{step.body}</p>
                  <p className="mt-4 text-sm font-semibold text-mkt-emerald-deep">{step.note}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
