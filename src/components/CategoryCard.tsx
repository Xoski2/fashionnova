import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Category } from '../types'
import { SmartImage } from './SmartImage'
import { cn } from '../lib/format'

interface CategoryCardProps {
  category: Category
  className?: string
  imageClassName?: string
}

export function CategoryCard({ category, className, imageClassName }: CategoryCardProps) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={cn(
        'group relative block overflow-hidden bg-ink focus-visible:outline-offset-4',
        className,
      )}
      aria-label={`Shop ${category.name}`}
    >
      <SmartImage
        src={category.image}
        alt={category.imageAlt}
        className={cn(
          'h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100',
          imageClassName,
        )}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
            Shop
          </p>
          <h3 className="mt-1 font-display text-xl font-extrabold uppercase leading-tight tracking-tight sm:text-2xl">
            {category.name}
          </h3>
          <p className="mt-1.5 max-w-[24ch] text-xs leading-relaxed text-white/70">
            {category.description}
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
