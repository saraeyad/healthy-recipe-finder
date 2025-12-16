import { Link } from 'react-router-dom'

function CTA() {
  return (
    <section className="text-center">
      <div className="bg-neutral-200 max-w-[1192px] rounded-2xl py-12 md:py-20 lg:py-24 mx-auto px-4 relative overflow-hidden">
        <img
          src="/assets/images/pattern-fork.svg"
          alt=""
          className="hidden md:block absolute md:-left-12 md:top-1/2 md:w-[180px] md:h-[231px] lg:-left-20 lg:top-4 lg:w-[314px] lg:h-[390px] object-contain pointer-events-none motion-safe:animate-moveY motion-reduce:animate-none"
          aria-hidden="true"
        />
        <img
          src="/assets/images/pattern-knife.svg"
          alt=""
          className="hidden md:block absolute md:-right-2 md:-top-12 md:w-[171px] md:h-[171px] lg:w-[338px] lg:h-[338px] lg:-right-14 lg:top-2 object-contain pointer-events-none motion-safe:animate-moveY2 motion-reduce:animate-none"
          aria-hidden="true"
        />
        <h2 className="text-preset-2 mb-3 relative z-10">
          Ready to cook smarter?
        </h2>
        <p className="text-preset-6 mb-8 md:mb-10 relative z-10">
          Hit the button, pick a recipe, and get dinner on the table—fast.
        </p>
        <Link to="/recipes" className="btn px-6 py-4 relative z-10">
          Browse recipes
        </Link>
      </div>
    </section>
  )
}

export default CTA

