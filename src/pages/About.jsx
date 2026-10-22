import CTA from '../components/CTA'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import { useParallax } from '../hooks/useParallax'

const WHY = [
  {
    title: 'Cut through the noise.',
    body: 'The internet is bursting with recipes, yet most busy cooks still default to take-away or packaged foods. We curate a tight collection of fool-proof dishes so you can skip the scrolling and start cooking.',
  },
  {
    title: 'Empower home kitchens.',
    body: 'When you control what goes into your meals, you control how you feel. Every recipe is built around unrefined ingredients and ready in about half an hour of active prep.',
  },
  {
    title: 'Make healthy look good.',
    body: 'Clear photography shows you exactly what success looks like — because we eat with our eyes first, and confidence matters.',
  },
]

const PHILOSOPHY = [
  {
    title: 'Whole ingredients first.',
    body: 'Fresh produce, grains, legumes, herbs, and quality fats form the backbone of every recipe.',
  },
  {
    title: 'Flavor without compromise.',
    body: 'Spices, citrus, and natural sweetness replace excess salt, sugar, and additives.',
  },
  {
    title: 'Respect for time.',
    body: 'Weeknight meals should slot into real schedules; weekend cooking can be leisurely but never wasteful.',
  },
  {
    title: 'Sustainable choices.',
    body: 'Short ingredient lists cut down on food waste and carbon footprint, while plant-forward dishes keep things planet-friendly.',
  },
]

function About() {
  const [missionRef, missionOffset] = useParallax(80)
  const [beyondRef, beyondOffset] = useParallax(70)

  return (
    <div className="bg-canvas">
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="animate-aurora-a absolute -top-32 -left-20 h-[32rem] w-[32rem] rounded-full bg-mkt-glow/25 blur-3xl" />
          <div className="animate-aurora-b absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-mkt-sky/40 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Our mission</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[52px]">
              Help more people cook nourishing meals, more often.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-mkt-body sm:text-lg">
              Healthy Recipe Finder was created to prove that healthy eating can be convenient, affordable, and genuinely delicious.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
              We showcase quick, whole-food dishes that anyone can master — no fancy equipment, no ultra-processed shortcuts — just honest ingredients and straightforward steps.
            </p>
          </Reveal>
          <div ref={missionRef} className="overflow-hidden rounded-[2rem] shadow-float ring-1 ring-white/80">
            <img
              src="/assets/images/image-about-our-mission-large.webp"
              alt="Someone preparing a meal"
              className="w-full object-cover"
              style={{ transform: `translateY(${missionOffset}px) scale(1.06)` }}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-divider bg-white/70 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink lg:sticky lg:top-32 lg:self-start lg:text-4xl">
            Why we exist
          </h2>
          <div className="flex flex-col gap-4">
            {WHY.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="rounded-3xl border border-ink/[0.06] bg-white p-5 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-card-hover sm:p-6">
                  <p className="text-sm font-extrabold text-primary">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink lg:sticky lg:top-32 lg:self-start lg:text-4xl">
            Our food philosophy
          </h2>
          <ol className="flex flex-col gap-4">
            {PHILOSOPHY.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <li className="flex items-start gap-4 rounded-3xl border border-divider bg-white p-5 shadow-card">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-mkt-teal text-sm font-extrabold text-white shadow-brand">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted sm:text-base">{item.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="overflow-hidden px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Beyond the plate</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">Food is a reason to gather</h2>
            <p className="mt-4 text-base leading-relaxed text-mkt-body">
              We believe food is a catalyst for community and well-being. By sharing approachable recipes, we hope to:
            </p>
            <ul className="mt-4 space-y-2 text-base text-ink-muted">
              <li>Encourage family dinners and social cooking.</li>
              <li>Reduce reliance on single-use packaging and delivery waste.</li>
              <li>Spark curiosity about seasonal produce and local agriculture.</li>
            </ul>
          </Reveal>
          <div ref={beyondRef} className="overflow-hidden rounded-[2rem] shadow-float">
            <img
              src="/assets/images/image-about-beyond-the-plate-large.webp"
              alt="A family cooking together"
              className="w-full object-cover"
              style={{ transform: `translateY(${beyondOffset}px) scale(1.08)` }}
            />
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}

export default About
