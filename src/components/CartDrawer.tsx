import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/format'
import { SmartImage } from './SmartImage'
import { siteConfig } from '../config/site'

export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    cartLines,
    cartCount,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useStore()

  useEffect(() => {
    if (!cartOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [cartOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeCart()
    }
    if (cartOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cartOpen, closeCart])

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-[80] flex">
      <button
        type="button"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fade-in"
        aria-label="Close shopping bag"
      />
      <aside
        className="relative ml-auto flex h-full w-full max-w-[420px] flex-col bg-ivory shadow-soft animate-slide-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
              Shopping bag
            </p>
            <h2
              id="cart-drawer-title"
              className="font-display text-lg font-extrabold uppercase tracking-tight text-ink"
            >
              Your bag · {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-clay"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {cartLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line">
              <ShoppingBag className="h-5 w-5 text-smoke" aria-hidden="true" />
            </div>
            <p className="mt-4 font-display text-xl font-extrabold uppercase tracking-tight text-ink">
              Your bag is empty
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-smoke">
              Explore the new season and find pieces that feel distinctly you.
            </p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="group mt-6 inline-flex items-center gap-2 bg-ink px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay"
            >
              Shop now
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ul className="space-y-5">
                {cartLines.map((line) => (
                  <li key={line.key} className="flex gap-4">
                    <Link
                      to={`/product/${line.product.slug}`}
                      onClick={closeCart}
                      className="relative block h-28 w-24 shrink-0 overflow-hidden bg-sand"
                    >
                      <SmartImage
                        src={line.product.images[0]?.src}
                        alt={line.product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-smoke">
                            {line.product.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-smoke">
                            Size {line.size} · {line.color}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.key)}
                          className="flex h-7 w-7 items-center justify-center text-smoke transition-colors hover:text-clay"
                          aria-label={`Remove ${line.product.name} from bag`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="inline-flex h-8 items-center border border-line">
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.key, line.quantity - 1)}
                            disabled={line.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-sand disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" aria-hidden="true" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.key, line.quantity + 1)}
                            disabled={line.quantity >= line.product.stock}
                            className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:bg-sand disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-ink">
                          {formatPrice(line.lineTotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[11px] leading-relaxed text-smoke">
                {siteConfig.demoNotice}
              </p>
            </div>

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-smoke">
                Delivery fees and discounts are calculated at checkout.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="group inline-flex h-11 items-center justify-center gap-2 bg-ink text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay"
                >
                  Proceed to checkout
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="inline-flex h-11 items-center justify-center text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-clay"
                >
                  View full cart
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
