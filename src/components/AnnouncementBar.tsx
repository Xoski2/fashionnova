import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-x flex h-9 items-center justify-center gap-2 text-center">
        <Link
          to="/shop?new=1"
          className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 transition-colors hover:text-white sm:text-[11px]"
        >
          New season, new style — discover Nyasa
          <ArrowUpRight
            className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  )
}
