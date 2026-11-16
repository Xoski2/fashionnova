import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { ProductGrid } from '../components/ProductGrid'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'

export function WishlistPage() {
  usePageMeta({
    title: 'Wishlist — Fashionnova',
    description: 'Saved products in your Fashionnova wishlist. Add them to your bag or continue shopping.',
    image: '/images/cat-women.jpg',
  })

  const { wishlist } = useStore()
  const saved = products.filter((product) => wishlist.includes(product.id))

  return (
    <section className="container-x py-10 sm:py-12 lg:py-16">
      <SectionHeading
        eyebrow="Wishlist"
        title="Saved items"
        description="Keep track of pieces you love. Wishlist is saved in localStorage for this demo."
      />
      <p className="mt-2 text-sm text-smoke">
        {saved.length} {saved.length === 1 ? 'item' : 'items'} saved
      </p>

      {saved.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center border border-line bg-white px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line">
            <Heart className="h-5 w-5 text-smoke" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
            Your wishlist is empty
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-smoke">
            Tap the heart on any product to save it here for later.
          </p>
          <Link
            to="/shop"
            className="group mt-6 inline-flex items-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
          >
            Discover products
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid products={saved} columns={4} />
        </div>
      )}
    </section>
  )
}
