import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { cn } from '../lib/format'
import { Logo } from './Logo'

const primaryLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Clothing', to: '/shop?group=clothing' },
  { label: 'Shoes', to: '/shop?group=shoes' },
  { label: 'New Arrivals', to: '/shop?new=1' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const mobileCategories = [
  { label: "Women's Clothing", to: '/shop?category=women' },
  { label: "Men's Clothing", to: '/shop?category=men' },
  { label: 'Sneakers', to: '/shop?category=sneakers' },
  { label: 'Formal Shoes', to: '/shop?category=formal' },
  { label: 'Casual Wear', to: '/shop?category=casual' },
  { label: 'Accessories', to: '/shop?category=accessories' },
]

export function Header() {
  const { cartCount, wishlist, openCart } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [mobileOpen, searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const frame = window.requestAnimationFrame(() => searchInputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [searchOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [mobileOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMobileOpen(false)
      setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isLinkActive = (to: string) => {
    const [path, query] = to.split('?')
    if (path !== location.pathname) return false
    if (!query) {
      if (path === '/shop') {
        return !['group', 'new', 'category', 'q'].some((key) =>
          searchParams.get(key),
        )
      }
      return true
    }
    const params = new URLSearchParams(query)
    return Array.from(params.entries()).every(
      ([key, value]) => searchParams.get(key) === value,
    )
  }

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const query = searchValue.trim()
    if (!query) return
    navigate(`/shop?q=${encodeURIComponent(query)}`)
    setSearchOpen(false)
  }

  const searchSuggestion = (term: string) => {
    navigate(`/shop?q=${encodeURIComponent(term)}`)
    setSearchOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/90">
        <div className="container-x flex h-[70px] items-center justify-between gap-4 sm:h-[76px]">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-clay"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <Logo className="lg:mr-4" />

          <nav aria-label="Main navigation" className="hidden flex-1 lg:block">
            <ul className="flex items-center justify-center gap-5 xl:gap-7">
              {primaryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    aria-current={isLinkActive(link.to) ? 'page' : undefined}
                    className={cn(
                      'relative text-[10.5px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-clay',
                      isLinkActive(link.to)
                        ? 'text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-clay'
                        : 'text-ink/70',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-clay"
              aria-label="Search products"
              aria-expanded={searchOpen}
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <Link
              to="/wishlist"
              className="relative hidden h-10 w-10 items-center justify-center text-ink transition-colors hover:text-clay sm:flex"
              aria-label={`Wishlist${wishlist.length ? `, ${wishlist.length} saved items` : ''}`}
            >
              <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
              {wishlist.length > 0 ? (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-bold text-white">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-clay"
              aria-label={`Open shopping bag${cartCount ? `, ${cartCount} items` : ''}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
              {cartCount > 0 ? (
                <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[9px] font-bold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {searchOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/60 p-4 pt-20 backdrop-blur-sm animate-fade-in sm:pt-28"
          onClick={() => setSearchOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-2xl bg-ivory p-5 shadow-soft animate-fade-up sm:p-7"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search Fashionnova"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
                  Search
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
                  Find your next piece
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
                aria-label="Close search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={submitSearch} role="search" className="mt-5">
              <label htmlFor="header-search" className="sr-only">
                Search products
              </label>
              <div className="flex h-12 items-center border border-ink/20 bg-white focus-within:border-ink">
                <Search className="ml-4 h-4 w-4 text-smoke" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  id="header-search"
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search clothing, shoes, accessories…"
                  className="h-full flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-smoke/70"
                />
                <button
                  type="submit"
                  className="h-full bg-ink px-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay"
                >
                  Go
                </button>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-smoke">
                Popular searches
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Linen', 'Dress', 'Sneakers', 'Blazer', 'Bag'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => searchSuggestion(term)}
                    className="border border-line bg-white px-3 py-1.5 text-xs text-ink transition-colors hover:border-ink hover:bg-sand"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[70] flex flex-col bg-ivory animate-fade-in lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-[70px] items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-clay"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav aria-label="Mobile primary navigation">
              <ul className="space-y-1">
                {primaryLinks.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      to={link.to}
                      aria-current={isLinkActive(link.to) ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between border-b border-line py-3 font-display text-2xl font-extrabold uppercase tracking-tight transition-colors',
                        isLinkActive(link.to) ? 'text-clay' : 'text-ink',
                      )}
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
                Shop by category
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                {mobileCategories.map((category) => (
                  <li key={category.label}>
                    <Link
                      to={category.to}
                      className="block py-2 text-sm text-ink/80 transition-colors hover:text-clay"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/wishlist"
                className="inline-flex items-center gap-2 border border-line bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Wishlist ({wishlist.length})
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 border border-line bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Bag ({cartCount})
              </Link>
            </div>
          </div>
          <div className="border-t border-line px-5 py-4 text-[11px] leading-relaxed text-smoke">
            Free-spirited fashion for Malawi. Prices shown in MWK.
          </div>
        </div>
      ) : null}
    </>
  )
}
