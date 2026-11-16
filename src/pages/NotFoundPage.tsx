import { Link } from 'react-router-dom'
import { ArrowRight, Home } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta({
    title: 'Page not found — NYASA',
    description: 'The page you are looking for does not exist or has been moved.',
  })

  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-smoke">
        The page you are looking for doesn't exist, has been moved or is no
        longer available.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back home
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 border border-line bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
        >
          Browse shop
        </Link>
      </div>
    </section>
  )
}
