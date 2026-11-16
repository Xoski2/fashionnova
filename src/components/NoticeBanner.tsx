import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export function NoticeBanner() {
  const { notice, dismissNotice } = useStore()

  if (!notice) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[90] w-[calc(100%-1rem)] max-w-md -translate-x-1/2 animate-fade-up"
    >
      <div className="flex items-center gap-3 border border-ink bg-ink px-4 py-2.5 text-white shadow-soft sm:px-5">
        <p className="flex-1 text-sm leading-snug">{notice.message}</p>
        {notice.showCartAction ? (
          <Link
            to="/cart"
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white"
          >
            View bag
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        ) : null}
        <button
          type="button"
          onClick={dismissNotice}
          className="flex h-7 w-7 items-center justify-center text-white/60 transition-colors hover:text-white"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
