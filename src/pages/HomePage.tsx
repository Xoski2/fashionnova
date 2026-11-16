import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Headphones, Package, ShieldCheck, Truck } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { CategoryCard } from '../components/CategoryCard'
import { ProductGrid } from '../components/ProductGrid'
import { NewsletterForm } from '../components/NewsletterForm'
import { SmartImage } from '../components/SmartImage'
import { categories } from '../data/categories'
import { bestSellers, newArrivals } from '../data/products'
import { siteConfig } from '../config/site'

const perks = [
  {
    title: 'Quality fashion',
    description: 'Considered materials and clean finishes with a premium feel.',
    Icon: CheckCircle2,
  },
  {
    title: 'Convenient shopping',
    description: 'Browse, filter and order in minutes from any device.',
    Icon: Package,
  },
  {
    title: 'Delivery options',
    description: 'Zomba, Blantyre, Lilongwe, Mzuzu and wider Malawi — configured at checkout.',
    Icon: Truck,
  },
  {
    title: 'Customer support',
    description: 'Get help with sizing, orders and collections via our contact form.',
    Icon: Headphones,
  },
  {
    title: 'Easy payment',
    description: 'Online card payments are coming soon; arrange payment on WhatsApp today.',
    Icon: ShieldCheck,
  },
]

const reviews = [
  {
    quote:
      'Clean edit, easy to browse and the sizing info made choosing straightforward. Feels like a proper modern store.',
    name: 'T. Mphande',
    role: 'Zomba',
  },
  {
    quote:
      'The sneakers are exactly the kind of minimal pair I have been looking for. Love the neutral palette.',
    name: 'Chimwemwe K.',
    role: 'Blantyre',
  },
  {
    quote:
      'Great layout and the filters actually help. The product pages look polished and considered.',
    name: 'L. Banda',
    role: 'Lilongwe',
  },
]

export function HomePage() {
  usePageMeta({
    title: 'Fashionnova — Clothing & Shoes | Your Style. Your Statement.',
    description:
      'Fashionnova is a modern fashion store for clothing and footwear in Malawi. Shop new arrivals, sneakers, formal shoes and considered wardrobe staples.',
    image: '/images/hero.jpg',
  })

  const heroArrivals = newArrivals.slice(0, 4)
  const heroBest = bestSellers.slice(0, 4)

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/hero.jpg"
            alt="Black man in a stylish urban outfit in Lagos, Nigeria"
            className="h-full w-full animate-hero-zoom object-cover opacity-70"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/25"
            aria-hidden="true"
          />
        </div>
        <div className="container-x relative py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <p
              className="animate-fade-up text-[11px] font-bold uppercase tracking-widest2 text-clay"
              style={{ animationDelay: '80ms' }}
            >
              New season · Made to wear
            </p>
            <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span
                className="block animate-fade-up"
                style={{ animationDelay: '180ms' }}
              >
                Your style.
              </span>
              <span
                className="block animate-fade-up"
                style={{ animationDelay: '300ms' }}
              >
                Your statement.
              </span>
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/70 sm:text-lg"
              style={{ animationDelay: '420ms' }}
            >
              Discover clothing and footwear that bring confidence to every step.
              Clean silhouettes, considered details, prices in MWK.
            </p>
            <div
              className="mt-8 flex animate-fade-up flex-wrap items-center gap-3"
              style={{ animationDelay: '520ms' }}
            >
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
                to="/shop?new=1"
                className="group inline-flex items-center gap-2 border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Explore collection
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <p
              className="mt-8 animate-fade-up text-[10px] uppercase tracking-[0.16em] text-white/35"
              style={{ animationDelay: '620ms' }}
            >
              {siteConfig.demoNotice}
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="Browse by category"
          title="Shop the edit"
          description="Six distinct edits — from tailored essentials to sneakers, formal shoes and the finishing touches."
          action={{ label: 'View all products', to: '/shop' }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              className="aspect-[4/5] sm:aspect-[4/3]"
            />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-12 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Just in"
            title="New arrivals"
            description="Fresh pieces added to the Fashionnova edit for the new season."
            action={{ label: 'Shop new arrivals', to: '/shop?new=1' }}
          />
          <div className="mt-8">
            <ProductGrid products={heroArrivals} columns={4} />
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="Editors' picks"
          title="Best sellers"
          description="The pieces customers keep coming back to — clean, versatile and easy to style."
          action={{ label: 'Browse shop', to: '/shop' }}
        />
        <div className="mt-8">
          <ProductGrid products={heroBest} columns={4} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/promo.jpg"
            alt="Fashion model wearing a bold outfit in a modern setting"
            className="h-full w-full object-cover opacity-60"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30"
            aria-hidden="true"
          />
        </div>
        <div className="container-x relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
              Campaign
            </p>
            <h2 className="mt-4 font-display text-3xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Step into something new
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Find your next favorite look at Fashionnova. Tailoring, sneakers and
              everyday pieces built to last beyond a single season.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-sand"
              >
                Start shopping
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white"
              >
                Our story
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="Why shop with Fashionnova"
          title="Built for a better way to shop"
          description="Pragmatic benefits designed to give you clarity from browsing to checkout."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {perks.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="border border-line bg-white p-6 transition-shadow hover:shadow-soft"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-line text-ink">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-smoke">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand/40">
        <div className="container-x py-12 sm:py-16 lg:py-20">
          <SectionHeading
            eyebrow="Kind words"
            title="What people notice"
            description="Sample reviews shown for demonstration. They are not presented as verified customer testimonials."
            align="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="flex h-full flex-col border border-line bg-white p-7"
              >
                <p className="text-base leading-relaxed text-ink">
                  “{review.quote}”
                </p>
                <div className="mt-auto pt-6">
                  <p className="font-display text-sm font-bold uppercase tracking-tight text-ink">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-smoke">
                    {review.role}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-clay">
                    Demo review
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
              Join the list
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
              First look at new drops
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-smoke sm:text-base">
              Sign up for our newsletter to hear about new arrivals and seasonal
              edits. This is a front-end demo — no subscriptions are stored or
              emailed.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <SmartImage
              src="/images/story.jpg"
              alt="Editorial fashion imagery showcasing clean tailoring"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </>
  )
}
