import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Heart, Plus, ShoppingBag, X } from 'lucide-react'
import type { Product } from '../types'
import { useStore } from '../context/StoreContext'
import { categoryBySlug } from '../data/categories'
import { cn, discountPercent, formatPrice } from '../lib/format'

interface ProductCardProps {
  product: Product
}

function sizeRangeLabel(product: Product): string {
  if (product.sizes.length === 1) {
    return product.sizes[0] === 'One Size' ? 'One size' : `Size ${product.sizes[0]}`
  }
  return `${product.sizes[0]} – ${product.sizes[product.sizes.length - 1]}`
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '')
  const [justAdded, setJustAdded] = useState(false)

  const category = categoryBySlug(product.category)
  const discount = discountPercent(product.price, product.compareAtPrice)
  const soldOut = product.stock <= 0
  const wishlisted = isWishlisted(product.id)
  const requiresSize = !(product.sizes.length === 1 && product.sizes[0] === 'One Size')

  const completeAdd = (size: string, color: string) => {
    addToCart(product, { size, color, quantity: 1 })
    setQuickAddOpen(false)
    setSelectedSize('')
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1800)
  }

  const handleQuickAdd = () => {
    if (soldOut) return
    if (!requiresSize) {
      const color = product.colors[0]?.name ?? 'Standard'
      completeAdd('One Size', color)
      return
    }
    setSelectedColor(product.colors[0]?.name ?? '')
    setQuickAddOpen(true)
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link
          to={`/product/${product.slug}`}
          className="block h-full w-full focus-visible:outline-offset-[-4px]"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={product.images[0]?.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn(
              'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]',
              soldOut && 'opacity-70',
            )}
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.newArrival ? (
            <span className="bg-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
              New
            </span>
          ) : null}
          {discount ? (
            <span className="bg-clay px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
              Sale −{discount}%
            </span>
          ) : null}
          {soldOut ? (
            <span className="bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink">
              Sold out
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-clay focus-visible:bg-white"
        >
          <Heart
            className={cn('h-4 w-4', wishlisted && 'fill-clay text-clay')}
            aria-hidden="true"
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex justify-center p-3">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={soldOut}
            aria-label={`Add ${product.name} to bag`}
            className={cn(
              'flex h-10 w-full items-center justify-center gap-2 bg-ink/95 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition-all duration-300 hover:bg-clay disabled:cursor-not-allowed disabled:bg-ink/40',
              'sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100',
            )}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Added
              </>
            ) : soldOut ? (
              'Sold out'
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                {requiresSize ? 'Quick add' : 'Add to bag'}
              </>
            )}
          </button>
        </div>

        {quickAddOpen ? (
          <div
            className="absolute inset-0 z-10 flex items-end bg-ink/40 p-2 backdrop-blur-[1px] animate-fade-in"
            onClick={() => setQuickAddOpen(false)}
          >
            <div
              className="w-full bg-ivory p-4 shadow-soft"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-label={`Choose options for ${product.name}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                    Select a size
                  </p>
                  <p className="mt-0.5 text-[11px] text-smoke">
                    {formatPrice(product.price)} · {product.colors.length} colour
                    {product.colors.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickAddOpen(false)}
                  className="-mr-1 -mt-1 flex h-7 w-7 items-center justify-center text-smoke transition-colors hover:text-ink"
                  aria-label="Close size selector"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={cn(
                      'min-w-9 border px-2 py-1.5 text-[11px] font-semibold transition-colors',
                      selectedSize === size
                        ? 'border-ink bg-ink text-white'
                        : 'border-line bg-white text-ink hover:border-ink',
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Colour: ${color.name}`}
                    aria-pressed={selectedColor === color.name}
                    title={color.name}
                    className={cn(
                      'h-5 w-5 rounded-full border transition-transform',
                      selectedColor === color.name
                        ? 'scale-110 border-ink ring-1 ring-ink ring-offset-2 ring-offset-ivory'
                        : 'border-ink/20',
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
                <span className="ml-1 text-[11px] text-smoke">{selectedColor}</span>
              </div>
              <button
                type="button"
                disabled={!selectedSize}
                onClick={() => completeAdd(selectedSize, selectedColor)}
                className="mt-4 flex h-10 w-full items-center justify-center gap-2 bg-ink text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedSize ? 'Add to bag' : 'Choose a size'}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-smoke">
            {category?.name}
          </p>
          <div className="flex items-center gap-1" aria-label="Available colours">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-2.5 w-2.5 rounded-full border border-ink/15"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
        <h3 className="mt-1.5">
          <Link
            to={`/product/${product.slug}`}
            className="font-display text-[15px] font-bold leading-snug text-ink transition-colors hover:text-clay"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-xs text-smoke line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          <span className="text-[10px] uppercase tracking-[0.12em] text-smoke">
            {sizeRangeLabel(product)}
          </span>
        </div>
      </div>

    </article>
  )
}
