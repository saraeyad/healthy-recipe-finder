import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import { PrimaryLink } from './ui/Buttons'
import { useParallax } from '../hooks/useParallax'

function CTA() {
  const [frameRef, offset] = useParallax(60)

  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden bg-canvas lg:min-h-[560px]">
      <div ref={frameRef} className="pointer-events-none absolute inset-0">
        <img
          src="/assets/images/image-about-beyond-the-plate-large.webp"
          alt=""
          className="h-full w-full object-cover"
          style={{ transform: `translateY(${offset}px) scale(1.08)` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/88 to-canvas/25" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <Reveal className="max-w-xl">
          <Eyebrow tone="glass">Dinner, decided</Eyebrow>
          <h2 className="mt-6 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[46px]">
            Save the scrolling. Get dinner on the table.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-mkt-body sm:text-lg">
            Pick a recipe, follow the short list, and eat something you would actually make again.
          </p>
          <div className="mt-8">
            <PrimaryLink to="/recipes">Browse recipes</PrimaryLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CTA
