import recipes from '../../../data.json'
import Reveal from '../ui/Reveal'

const DOTS = ['bg-mkt-mint', 'bg-primary', 'bg-status-attention', 'bg-mkt-emerald']

function Chip({ recipe, index }) {
  const minutes = recipe.prepMinutes + recipe.cookMinutes
  return (
    <span className="inline-flex shrink-0 items-center gap-3 rounded-full border border-ink/[0.07] bg-white px-4 py-2 shadow-[0_1px_2px_rgba(11,46,48,0.04)] transition-colors hover:border-primary/30">
      <span className={`h-2 w-2 rounded-full ${DOTS[index % DOTS.length]}`} aria-hidden="true" />
      <span className="text-sm font-semibold text-ink">{recipe.title}</span>
      <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-semibold text-mkt-teal">
        {minutes} min
      </span>
    </span>
  )
}

function Row({ items, reverse = false, duration = '60s' }) {
  return (
    <div className="mkt-marquee overflow-hidden">
      <div
        className="mkt-marquee-track"
        data-reverse={reverse ? '' : undefined}
        style={{ '--marquee-duration': duration }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3 pe-3" aria-hidden={copy === 1}>
            {items.map((recipe, index) => (
              <Chip key={`${copy}-${recipe.id}`} recipe={recipe} index={index + copy} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const STATS = [
  ['8', 'whole-food recipes'],
  ['30', 'minutes or less'],
  ['0', 'processed shortcuts'],
]

function RecipeMarquee() {
  const forward = recipes
  const backward = [...recipes].reverse()

  return (
    <section id="library" className="relative scroll-mt-24 border-y border-divider bg-white/60 py-12 lg:py-16">
      <Reveal className="mx-auto mb-8 max-w-3xl px-4 text-center">
        <p className="text-sm font-semibold text-mkt-emerald-deep">A kitchen library, not a feed</p>
        <h2 className="mt-2 text-balance text-xl font-bold text-ink sm:text-2xl">
          From chickpea salad to lemon salmon — every dish with the time it actually takes
        </h2>
      </Reveal>
      <div className="flex flex-col gap-3">
        <Row items={forward} duration="62s" />
        <Row items={backward} reverse duration="74s" />
      </div>
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 px-4 text-center">
        {STATS.map(([value, label]) => (
          <div key={label}>
            <div className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{value}</div>
            <div className="mt-1 text-xs font-medium text-ink-muted sm:text-sm">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecipeMarquee
