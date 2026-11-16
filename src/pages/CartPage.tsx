import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { SmartImage } from '../components/SmartImage'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/format'
import { siteConfig } from '../config/site'

export function CartPage() {
  usePageMeta({
    title: 'Shopping Bag — NYASA',
    description: 'Review your selected items, update quantities and proceed to the demo checkout.',
    image: '/images/cat-sneakers.jpg',
  })

  const { cartLines, cartCount, subtotal, updateQuantity, removeFromCart } = useStore()

  return (
    <section className="container-x py-10 sm:py-12 lg:py-16">
      <SectionHeading
        eyebrow="Shopping bag"
        title="Your bag"
        description="Review items, adjust quantities or remove pieces. Cart state is saved in localStorage for this demo."
      />
      <p className="mt-2 text-sm text-smoke">
        {cartCount} {cartCount === 1 ? 'item' : 'items'}
      </p>

      {cartLines.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center border border-line bg-white px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line">
            <ShoppingBag className="h-5 w-5 text-smoke" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
            Your bag is empty
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-smoke">
            Add pieces from the shop to see them here. Your bag will stay
            intact if you refresh the page in this demo.
          </p>
          <Link
            to="/shop"
            className="group mt-6 inline-flex items-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
          >
            Shop the collection
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="border border-line bg-white">
            <ul className="divide-y divide-line">
              {cartLines.map((line) => (
                <li key={line.key} className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-6">
                  <Link
                    to={`/product/${line.product.slug}`}
                    className="relative block h-40 w-full overflow-hidden bg-sand sm:h-44 sm:w-36"
                  >
                    <SmartImage
                      src={line.product.images[0]?.src}
                      alt={line.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
                          {line.product.name}
                        </p>
                        <p className="mt-1 text-sm text-smoke">
                          Size {line.size} · Colour {line.color}
                        </p>
                        <Link
                          to={`/product/${line.product.slug}`}
                          className="mt-1 inline-block text-xs text-ink transition-colors hover:text-clay"
                        >
                          View product
                        </Link>
                      </div>
                      <span className="text-lg font-bold text-ink">
                        {formatPrice(line.lineTotal)}
                      </span>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <div className="inline-flex h-10 items-center border border-line">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          disabled={line.quantity <= 1}
                          className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-sand disabled:opacity-30"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          disabled={line.quantity >= line.product.stock}
                          className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-sand disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.key)}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-smoke transition-colors hover:text-clay"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="border border-line bg-white p-6">
            <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
              Order summary
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-smoke">Subtotal</dt>
                <dd className="font-semibold text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-smoke">Delivery</dt>
                <dd className="text-smoke">Calculated at checkout</dd>
              </div>
              <div className="border-t border-line pt-3">
                <div className="flex items-center justify-between">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Estimated total
                  </dt>
                  <dd className="text-xl font-bold text-ink">{formatPrice(subtotal)}</dd>
                </div>
              </div>
            </dl>
            <p className="mt-3 text-[11px] leading-relaxed text-smoke">
              {siteConfig.demoNotice}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link
                to="/checkout"
                className="group inline-flex h-11 items-center justify-center gap-2 bg-ink text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay"
              >
                Proceed to checkout
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/shop"
                className="inline-flex h-11 items-center justify-center text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-clay"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}
