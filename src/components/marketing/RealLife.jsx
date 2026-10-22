import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'
import { useParallax } from '../../hooks/useParallax'

function RealLife() {
  const [frameRef, offset] = useParallax(90)

  return (
    <section className="overflow-hidden bg-canvas px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="left">
          <Eyebrow>Built for real life</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.2] tracking-tight text-ink sm:text-4xl lg:text-[44px]">
            Cooking should fit the day you actually have
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mkt-body sm:text-lg">
            These recipes come in under
            <span className="relative mx-1 inline-block font-extrabold text-ink">
              30 minutes
              <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -bottom-1 h-[0.35em] w-full text-mkt-mint">
                <path d="M3 10.5C40 4 80 3 118 5.5c30 2 55 3.5 79 1.5" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
            of active time, fit busy schedules, and taste good enough to repeat.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Whether you&apos;re new to the kitchen or just need fresh ideas, you&apos;ve got a short list instead of a rabbit hole.
          </p>
        </Reveal>
        <div ref={frameRef} className="overflow-hidden rounded-[2rem] shadow-float ring-1 ring-ink/[0.06]">
          <img
            src="/assets/images/image-home-real-life-large.webp"
            alt="Someone cooking a simple meal"
            className="w-full scale-110 object-cover"
            style={{ transform: `translateY(${offset}px) scale(1.12)` }}
          />
        </div>
      </div>
    </section>
  )
}

export default RealLife
