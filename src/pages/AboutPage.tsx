import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { SmartImage } from '../components/SmartImage'

const values = [
  {
    title: 'Considered design',
    description: 'Clean silhouettes, quality materials and details that stand the test of time.',
  },
  {
    title: 'Pragmatic pricing',
    description: 'Premium fashion at accessible prices, shown transparently in MWK.',
  },
  {
    title: 'Made for Malawi',
    description: 'A store shaped with our climate, culture and pace of life in mind.',
  },
  {
    title: 'Ready to grow',
    description: 'Built with a clear path to add inventory, accounts and payments in future.',
  },
]

export function AboutPage() {
  usePageMeta({
    title: 'About Fashionnova — Clothing & Shoes',
    description:
      'Learn about Fashionnova, a modern Malawi-based fashion store for clothing and footwear built with quality, care and confidence in mind.',
    image: '/images/hero-alt.jpg',
  })

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/hero-alt.jpg"
            alt="Fashion portrait of a stylish man in a forest in Accra, Ghana"
            className="h-full w-full object-cover opacity-65"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30"
            aria-hidden="true"
          />
        </div>
        <div className="container-x relative py-12 sm:py-16 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
            Our story
          </p>
          <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Style with purpose
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            Fashionnova is a modern fashion and footwear store for people who care
            about how they show up. Clean lines, considered choices, confidence
            in every step.
          </p>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
              Who we are
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
              A modern edit for Malawi
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-smoke sm:text-base">
              <p>
                Fashionnova curates clothing and footwear that feels current without
                chasing every trend. Our edit focuses on versatile pieces you can
                wear on repeat — tailored, relaxed, refined and ready for the
                realities of everyday life.
              </p>
              <p>
                From sharp shirts and dresses to clean sneakers and polished
                formal shoes, every product is selected with wearability in
                mind. Prices are shown in Malawian Kwacha (MWK) with demo data
                that the shop owner can update at any time.
              </p>
              <p>
                This storefront is built as a complete, production-lean front end
                with a solid foundation for future authentication, inventory,
                order management and payments.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
              >
                Shop now
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 border border-line bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
              >
                Get in touch
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <SmartImage
                src="/images/story.jpg"
                alt="Confident African woman in a vibrant dress outdoors"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative mt-6 aspect-[3/4] overflow-hidden sm:mt-10">
              <SmartImage
                src="/images/editorial.jpg"
                alt="Editorial black and white portrait of a stylish African man"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-12 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Our values"
            title="What guides us"
            description="The principles behind the Fashionnova edit — practical, considered and built to last."
            align="center"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="border border-line bg-ivory p-6 text-center"
              >
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16 lg:py-20">
        <div className="border border-line bg-ink px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
            Ready to explore
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Find your next favourite look
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Browse new arrivals, discover category edits and build a wardrobe
            that feels distinctly you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-sand"
            >
              Shop now
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white"
            >
              Contact us
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
