import CTA from '../components/CTA'

function About() {
  return (
    <main className="space-y-16 md:space-y-20 lg:space-y-24 pt-[72px] md:pt-[93px]">
      {/* Mission Section */}
      <section className="mt-12 md:mt-16 lg:mt-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center md:gap-16">
          <div className="text-left space-y-6 lg:w-1/2">
            <span className="text-preset-5 text-neutral-900 px-1.5 py-0.5 rounded-md bg-orange-500">
              Our mission
            </span>
            <h1 className="text-preset-2">
              Help more people cook nourishing meals, more often.
            </h1>
            <div>
              <p className="pb-4">
                Healthy Recipe Finder was created to prove that healthy eating
                can be convenient, affordable, and genuinely delicious.
              </p>
              <p>
                We showcase quick, whole-food dishes that anyone can master—no
                fancy equipment, no ultra-processed shortcuts—just honest
                ingredients and straightforward steps.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div
              className="absolute -z-10 -right-20 bottom-24 hidden lg:block"
              aria-hidden="true"
            >
              <img src="/assets/images/pattern-squiggle-2.svg" alt="" />
            </div>
            <picture>
              <source media="(min-width: 1024px)" srcSet="/assets/images/image-about-our-mission-large.webp" />
              <img
                src="/assets/images/image-about-our-mission-small.webp"
                alt="Cooking woman"
                loading="lazy"
                className="rounded-[clamp(0.6875rem,0.3625rem+1.3867vw,1.25rem)] w-full"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t-[1px] border-t-neutral-200"></div>

      {/* Why We Exist Section */}
      <section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <h2 className="text-preset-2 pb-6 lg:pb-0 lg:w-1/3">Why we exist</h2>
        <ul className="space-y-6 md:space-y-8 lg:space-y-12 lg:w-2/3">
          <li className="flex items-start gap-5">
            <img src="/assets/images/icon-bullet-point.svg" alt="" aria-hidden="true" />
            <div>
              <h3 className="text-preset-4 mb-3">Cut through the noise.</h3>
              <p>
                The internet is bursting with recipes, yet most busy cooks still
                default to take-away or packaged foods. We curate a tight
                collection of fool-proof dishes so you can skip the scrolling and
                start cooking.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <img src="/assets/images/icon-bullet-point.svg" alt="" aria-hidden="true" />
            <div>
              <h3 className="text-preset-4 mb-3">Empower home kitchens.</h3>
              <p>
                When you control what goes into your meals, you control how you
                feel. Every recipe is built around unrefined ingredients and
                ready in about half an hour of active prep.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <img src="/assets/images/icon-bullet-point.svg" alt="" aria-hidden="true" />
            <div>
              <h3 className="text-preset-4 mb-3">Make healthy look good.</h3>
              <p>
                High-resolution imagery shows you exactly what success looks
                like—because we eat with our eyes first, and confidence matters.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Divider */}
      <div className="border-t-[1px] border-t-neutral-200"></div>

      {/* Food Philosophy Section */}
      <section className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <h2 className="text-preset-2 pb-6 lg:pb-0 lg:w-1/3">Our food philosophy</h2>
        <ul className="space-y-6 md:space-y-8 lg:space-y-12 lg:w-2/3">
          <li className="flex items-start gap-5">
            <img src="/assets/images/icon-bullet-point.svg" alt="" aria-hidden="true" />
            <div>
              <h3 className="text-preset-4 mb-3">Whole ingredients first.</h3>
              <p>
                Fresh produce, grains, legumes, herbs, and quality fats form the
                backbone of every recipe.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <img src="/assets/images/icon-bullet-point.svg" alt="" aria-hidden="true" />
            <div>
              <h3 className="text-preset-4 mb-3">Flavor without compromise.</h3>
              <p>
                Spices, citrus, and natural sweetness replace excess salt, sugar,
                and additives.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <img src="/assets/images/icon-bullet-point.svg" alt="" aria-hidden="true" />
            <div>
              <h3 className="text-preset-4 mb-3">Respect for time.</h3>
              <p>
                Weeknight meals should slot into real schedules; weekend cooking
                can be leisurely but never wasteful.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5">
            <img src="/assets/images/icon-bullet-point.svg" alt="" aria-hidden="true" />
            <div>
              <h3 className="text-preset-4 mb-3">Sustainable choices.</h3>
              <p>
                Short ingredient lists cut down on food waste and carbon
                footprint, while plant-forward dishes keep things planet-friendly.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Divider */}
      <div className="border-t-[1px] border-t-neutral-200"></div>

      {/* Beyond the Plate Section */}
      <section>
        <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="text-left lg:w-1/3">
            <h2 className="text-preset-2 pb-5">Beyond the plate</h2>
            <div>
              <p className="pb-3">
                We believe food is a catalyst for community and well-being. By
                sharing approachable recipes, we hope to:
              </p>
              <ul className="list-disc pl-6 text-preset-6">
                <li>Encourage family dinners and social cooking.</li>
                <li>
                  Reduce reliance on single-use packaging and delivery waste.
                </li>
                <li>
                  Spark curiosity about seasonal produce and local agriculture.
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-2/3">
            <picture>
              <source media="(min-width: 1024px)" srcSet="/assets/images/image-about-beyond-the-plate-large.webp" />
              <img
                src="/assets/images/image-about-beyond-the-plate-small.webp"
                alt="Happy family cooking together"
                loading="lazy"
                className="rounded-[20px] w-full"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </main>
  )
}

export default About

