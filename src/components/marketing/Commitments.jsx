import recipes from '../../../data.json'
import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'
import { useParallax } from '../../hooks/useParallax'

const ITEMS = [
  {
    title: 'Whole ingredients first',
    body: 'Fresh produce, grains, legumes, herbs, and quality fats — nothing dressed up as a shortcut.',
  },
  {
    title: 'Minutes, not hours',
    body: 'Active cooking stays around half an hour, so a plan made at 6 still becomes dinner.',
  },
  {
    title: 'Flavor without compromise',
    body: 'Spice, citrus, and natural sweetness do the work that extra salt and sugar usually get.',
  },
]

function Commitments() {
  const recipe = recipes[0]
  const [cardRef, offset] = useParallax(56)

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-mkt-dark to-mkt-night px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mkt-dots-light pointer-events-none absolute inset-0 -z-10" />
      <div className="animate-aurora-a pointer-events-none absolute -top-40 -left-[10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-mkt-glow/15 blur-3xl" />
      <div className="animate-aurora-b pointer-events-none absolute -bottom-40 -right-[10%] -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/30 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow tone="dark">What we keep</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
              Built for home cooks, not for a feed
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-mkt-dark-muted sm:text-lg">
              Three promises the whole library is built around. No invented numbers, no extra noise.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-col gap-3">
            {ITEMS.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur transition-colors hover:bg-white/[0.08]">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-mkt-glow/30 to-primary/30 text-lg font-extrabold text-mkt-glow ring-1 ring-white/15">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-mkt-dark-muted">{item.body}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div ref={cardRef} style={{ transform: `translateY(${offset}px)` }}>
          <div className="animate-float-slower rounded-3xl border border-white/10 bg-white/[0.06] p-3 shadow-float backdrop-blur">
            <div className="overflow-hidden rounded-[1.4rem] bg-white text-ink">
              <img src={recipe.image.large} alt={recipe.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">From the library</p>
                <h3 className="mt-1 text-xl font-extrabold">{recipe.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{recipe.overview}</p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-mkt-teal">{recipe.prepMinutes + recipe.cookMinutes} min</span>
                  <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-mkt-teal">{recipe.servings} servings</span>
                  <span className="rounded-full bg-mkt-mint-bg px-3 py-1 text-xs font-bold text-mkt-emerald-deep">{recipe.ingredients.length} ingredients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Commitments
