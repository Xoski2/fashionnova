import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Heart, MessageCircle, Plus, ShieldCheck, Truck } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { ProductGrid } from '../components/ProductGrid'
import { SmartImage } from '../components/SmartImage'
import { QuantitySelector } from '../components/QuantitySelector'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { categoryBySlug } from '../data/categories'
import { useStore } from '../context/StoreContext'
import { cn, discountPercent, formatPrice } from '../lib/format'
import { whatsAppUrl } from '../lib/whatsapp'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWishlisted, openCart } = useStore()

  const product = slug ? getProductBySlug(slug) : undefined
  const related = product ? getRelatedProducts(product, 4) : []

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '')
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState('')

  const category = product ? categoryBySlug(product.category) : undefined
  const discount = product ? discountPercent(product.price, product.compareAtPrice) : null
  const wishlisted = product ? isWishlisted(product.id) : false
  const soldOut = product ? product.stock <= 0 : true
  const productWhatsAppUrl = product
    ? whatsAppUrl(
        `Hello NYASA, I am interested in the ${product.name}${selectedColor ? ` (${selectedColor})` : ''}${selectedSize ? `, size ${selectedSize}` : ''}. I would like to arrange payment on WhatsApp.`,
      )
    : '#'
  const requiresSize = product ? !(product.sizes.length === 1 && product.sizes[0] === 'One Size') : false

  usePageMeta({
    title: product ? `${product.name} — NYASA` : 'Product — NYASA',
    description: product?.description.slice(0, 155),
    image: product?.images[0]?.src,
  })

  const stockMessage = useMemo(() => {
    if (!product) return ''
    if (soldOut) return 'Sold out — this item is currently unavailable for demo orders.'
    if (product.stock <= 3) return `Only ${product.stock} left in stock (demo inventory).`
    return 'In stock — ready to ship or collect (demo terms apply).'
  }, [product, soldOut])

  if (!product) {
    return (
      <section className="container-x py-16 text-center sm:py-20">
        <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
          Not found
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-ink">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-smoke">
          The product you are looking for may have been removed or the link is
          incorrect.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 bg-ink px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay"
          >
            Back to shop
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 border border-line bg-white px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
          >
            Go back
          </button>
        </div>
      </section>
    )
  }

  const handleAddToCart = () => {
    if (soldOut) return
    if (requiresSize && !selectedSize) {
      setSizeError('Please choose a size before adding to your bag.')
      return
    }
    setSizeError('')
    const size = requiresSize ? selectedSize : product.sizes[0] === 'One Size' ? 'One Size' : product.sizes[0]
    const color = selectedColor || product.colors[0]?.name || 'Standard'
    addToCart(product, { size, color, quantity })
    openCart()
  }

  const handleBuyNow = () => {
    if (soldOut) return
    if (requiresSize && !selectedSize) {
      setSizeError('Please choose a size before proceeding to checkout.')
      return
    }
    setSizeError('')
    const size = requiresSize ? selectedSize : product.sizes[0] === 'One Size' ? 'One Size' : product.sizes[0]
    const color = selectedColor || product.colors[0]?.name || 'Standard'
    addToCart(product, { size, color, quantity })
    navigate('/checkout')
  }

  return (
    <>
      <section className="container-x py-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-smoke">
          <Link to="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/shop" className="transition-colors hover:text-ink">
            Shop
          </Link>
          <span aria-hidden="true">/</span>
          {category ? (
            <Link to={`/shop?category=${category.slug}`} className="transition-colors hover:text-ink">
              {category.name}
            </Link>
          ) : null}
          {category ? <span aria-hidden="true">/</span> : null}
          <span className="text-ink">{product.name}</span>
        </nav>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-smoke transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back
        </button>
      </section>

      <section className="container-x pb-12 sm:pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="grid gap-3">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand">
              <SmartImage
                src={product.images[0]?.src}
                alt={product.images[0]?.alt ?? product.name}
                className="h-full w-full object-cover"
              />
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
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
              {category?.name}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-bold text-ink">{formatPrice(product.price)}</span>
              {product.compareAtPrice ? (
                <span className="text-base text-smoke line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-smoke">{product.description}</p>

            {product.colors.length > 0 ? (
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Colour
                  </p>
                  <p className="text-xs text-smoke">{selectedColor}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      aria-pressed={selectedColor === color.name}
                      aria-label={`Colour: ${color.name}`}
                      className={cn(
                        'h-7 w-7 rounded-full border transition-transform',
                        selectedColor === color.name
                          ? 'scale-110 border-ink ring-1 ring-ink ring-offset-2 ring-offset-ivory'
                          : 'border-ink/20',
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {requiresSize ? (
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Size
                  </p>
                  <p className="text-xs text-smoke">Select your size</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size)
                        setSizeError('')
                      }}
                      aria-pressed={selectedSize === size}
                      className={cn(
                        'min-w-10 border px-3 py-2 text-xs font-semibold transition-colors',
                        selectedSize === size
                          ? 'border-ink bg-ink text-white'
                          : 'border-line bg-white text-ink hover:border-ink',
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError ? (
                  <p className="mt-2 text-xs text-red-700" role="alert">
                    {sizeError}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="mt-7 text-xs uppercase tracking-[0.14em] text-smoke">
                One size
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.stock}
              />
              <span className="text-xs text-smoke">{stockMessage}</span>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={soldOut}
                className="group inline-flex flex-1 items-center justify-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-40"
              >
                {soldOut ? 'Sold out' : 'Add to bag'}
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={soldOut}
                className="inline-flex flex-1 items-center justify-center bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
              >
                Buy now
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={cn(
                  'flex h-11 w-11 items-center justify-center border transition-colors',
                  wishlisted
                    ? 'border-clay bg-clay/5 text-clay'
                    : 'border-line bg-white text-ink hover:border-ink',
                )}
              >
                <Heart className={cn('h-4 w-4', wishlisted && 'fill-clay')} aria-hidden="true" />
              </button>
            </div>

            <a
              href={productWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Order &amp; pay via WhatsApp
            </a>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 border border-line bg-white p-4">
                <Truck className="mt-0.5 h-4 w-4 text-clay" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Delivery & pickup
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-smoke">
                    Configurable fees by district. Pickup option available in demo
                    checkout.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border border-line bg-white p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-clay" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Demo flow
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-smoke">
                    Online card payments are coming soon. Message us on WhatsApp
                    to arrange payment and delivery now.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                Product details
              </h2>
              <ul className="mt-3 space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-smoke">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-smoke">
                <span className="border border-line px-2 py-1">Material: {product.material}</span>
                <span className="border border-line px-2 py-1">SKU: {product.id.toUpperCase()}</span>
                <span className="border border-line px-2 py-1">Category: {category?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-white">
          <div className="container-x py-12 sm:py-16 lg:py-20">
            <SectionHeading
              eyebrow="You may also like"
              title="Related products"
              action={{ label: 'Continue shopping', to: '/shop' }}
            />
            <div className="mt-8">
              <ProductGrid products={related} columns={4} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
