import recipes from '../../../data.json'
import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'

function FeatureBento() {
  const rows = recipes.slice(0, 4)

  return (
    <section className="relative bg-canvas px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
          <Eyebrow>Everything in the box</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.2] tracking-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
            What you&apos;ll get
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
            Eight dishes, chosen so a weeknight stays simple and the food still tastes like food.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
          <Reveal variant="scale" className="h-full lg:col-span-3 lg:row-span-2">
            <article className="flex h-full flex-col rounded-3xl border border-white/80 bg-white/90 p-5 text-start shadow-card backdrop-blur transition duration-500 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative mb-6 flex-1 rounded-2xl border border-divider bg-gradient-to-b from-canvas to-white p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-ink">This week&apos;s plates</span>
                  <span className="rounded-full bg-status-on-bg px-2.5 py-1 text-[11px] font-semibold text-status-on">Whole foods</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {rows.map((recipe, index) => {
                    const width = Math.min(96, 40 + (recipe.prepMinutes + recipe.cookMinutes) * 2)
                    return (
                      <div key={recipe.id} className="mkt-rise flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-card" style={{ '--i': index }}>
                        <span className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                          <img src={recipe.image.small} alt="" className="h-full w-full object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-semibold text-ink">{recipe.title}</span>
                          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-divider">
                            <span className="mkt-grow block h-full rounded-full bg-primary/70" style={{ width: `${width}%`, '--grow-delay': `${0.2 + index * 0.12}s` }} />
                          </span>
                        </span>
                        <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-bold text-mkt-teal">
                          {recipe.prepMinutes + recipe.cookMinutes}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-ink">Whole-food recipes</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">Each dish uses everyday, unprocessed ingredients.</p>
            </article>
          </Reveal>

          <Reveal variant="scale" delay={80} className="h-full lg:col-span-3">
            <article className="flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-white p-5 text-start shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-mkt-mint-bg ring-1 ring-mkt-mint-border">
                <img src="/assets/images/icon-minimum-fuss.svg" alt="" className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-ink">Minimum fuss</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">All recipes are designed to make eating healthy quick and easy.</p>
              <div className="mt-auto flex items-center justify-between border-t border-divider pt-3 text-sm">
                <span className="text-ink-muted">Active time</span>
                <span className="rounded-full bg-mkt-mint-bg px-3 py-1 text-xs font-bold text-mkt-emerald-deep ring-1 ring-mkt-mint-border">Under 30 min</span>
              </div>
            </article>
          </Reveal>

          <Reveal variant="scale" delay={140} className="h-full lg:col-span-3">
            <article className="flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-white p-5 text-start shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-mkt-mint-bg ring-1 ring-mkt-mint-border">
                <img src="/assets/images/icon-search-in-seconds.svg" alt="" className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-ink">Search in seconds</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">Filter by name or ingredient and jump straight to the recipe you need.</p>
              <div className="mt-auto flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-sm text-ink-muted">
                <img src="/assets/images/icon-search.svg" alt="" className="h-4 w-4" />
                chickpeas, lemon, oats…
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default FeatureBento
