import { Link } from 'react-router-dom'
import CTA from '../components/CTA'
import AnimatedSection from '../components/AnimatedSection'
import { ROUTES } from '../constants/navigation'

function Home() {

  return (
    <main className="space-y-16 md:space-y-20 lg:space-y-24 pt-[72px] md:pt-[93px]">
      {/* Hero Section */}
      <section className="mt-12 lg:mt-20 space-y-10 lg:space-y-20 max-w-full">
        <div className="text-left lg:text-center max-w-[805px] lg:mx-auto">
          <AnimatedSection animation="fade-up" startVisible={true}>
            <h1 className="text-preset-1 mb-4 lg:mb-3">
              <span className="relative z-10 before:absolute before:bg-orange-500 before:opacity-40 before:rounded-[4px] before:h-2/5 before:w-full before:bottom-2.5 before:left-1 before:block before:-z-10">
                Healthy
              </span>
              {' '}meals, zero fuss
            </h1>
            <p className="text-preset-6 mb-8 lg:mb-10">
              Discover eight quick, whole-food recipes that you can cook
              tonight—no processed junk, no guesswork.
            </p>
          </AnimatedSection>
          <Link 
            to={ROUTES.RECIPES}
            className="btn btn-lg inline-block relative z-50"
          >
            Start exploring
          </Link>
        </div>

        <AnimatedSection animation="fade-up" delay={200} className="w-full relative">
          <div className="absolute w-full bottom-20 -z-10">
            <img
              src="/assets/images/pattern-squiggle-1.svg"
              alt=""
              aria-hidden="true"
              className="w-full object-center"
            />
          </div>
          <picture>
            <source media="(min-width: 1024px)" srcSet="/assets/images/image-home-hero-large.webp" />
            <img
              src="/assets/images/image-home-hero-small.webp"
              alt="Cooking woman"
              loading="lazy"
              className="w-full max-w-[1192px] mx-auto rounded-[3.45px] ring-[3.45px] md:rounded-[7px] md:ring-[7px] lg:rounded-[12px] lg:ring-[12px] ring-white"
            />
          </picture>
        </AnimatedSection>
      </section>

      {/* Features Section */}
      <section>
        <div>
          <AnimatedSection animation="fade-up">
            <h2 className="text-preset-2 text-center mb-8 md:mb-12">
              What you'll get
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            <AnimatedSection animation="fade-up" delay={100} className="space-y-6">
              <div className="size-[60px] bg-white rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <img src="/assets/images/icon-whole-food-recipes.svg" alt="" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-preset-3 pb-3">Whole-food recipes</h3>
                <p className="text-xl">
                  Each dish uses everyday, unprocessed ingredients.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200} className="space-y-6">
              <div className="size-[60px] bg-white rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <img src="/assets/images/icon-minimum-fuss.svg" alt="" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-preset-3 pb-3">Minimum fuss</h3>
                <p className="text-neutral-600 text-xl">
                  All recipes are designed to make eating healthy quick and easy.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300} className="space-y-6">
              <div className="size-[60px] bg-white rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <img src="/assets/images/icon-search-in-seconds.svg" alt="" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-preset-3 pb-3">Search in seconds</h3>
                <p className="text-neutral-600 text-xl">
                  Filter by name or ingredient and jump straight to the recipe you
                  need.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="md:border-t-[1px] md:border-t-neutral-200"></div>

      {/* Built for Real Life Section */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-10 lg:gap-12">
          <AnimatedSection animation="slide-right" className="lg:w-1/2 space-y-5">
            <h2 className="text-preset-2">Built for real life</h2>
            <p className="text-preset-6">
              Cooking shouldn't be complicated. These recipes come in under
              <span className="relative font-bold z-10 before:absolute md:before:bg-orange-500 before:rounded-[3px] before:h-2/5 before:w-full before:bottom-1 before:left-0 before:block before:-z-10">
                {' '}30 minutes
              </span>
              {' '}of active time, fit busy schedules, and taste good enough to
              repeat.
            </p>
            <p className="text-preset-6">
              Whether you're new to the kitchen or just need fresh ideas, we've
              got you covered.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slide-left" delay={200} className="lg:w-1/2">
            <picture>
              <source media="(min-width: 1024px)" srcSet="/assets/images/image-home-real-life-large.webp" />
              <img
                src="/assets/images/image-home-real-life-small.webp"
                alt="Cooking"
                loading="lazy"
                className="rounded-[clamp(0.625rem,0.4083rem+0.9245vw,1rem)] w-full"
              />
            </picture>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </main>
  )
}

export default Home

