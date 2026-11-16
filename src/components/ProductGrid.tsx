import type { Product } from '../types'
import { ProductCard } from './ProductCard'
import { cn } from '../lib/format'

interface ProductGridProps {
  products: Product[]
  columns?: 3 | 4
  className?: string
}

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-12',
        columns === 4
          ? 'md:grid-cols-3 xl:grid-cols-4'
          : 'md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
