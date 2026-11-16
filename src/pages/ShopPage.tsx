import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { ProductGrid } from '../components/ProductGrid'
import { SearchBar } from '../components/SearchBar'
import { SmartImage } from '../components/SmartImage'
import { products, priceBounds } from '../data/products'
import { categories } from '../data/categories'
import { sortOptions, sizeOrder } from '../config/site'
import { cn, formatPrice } from '../lib/format'

const groupToCategories = {
  clothing: ['men', 'women'],
  shoes: ['sneakers', 'formal', 'casual'],
} as const

function sortProducts(items: typeof products, sort: string) {
  const copy = [...items]
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'newest':
      return copy.sort((a, b) => Number(b.newArrival) - Number(a.newArrival))
    case 'popular':
      return copy.sort((a, b) => b.popularity - a.popularity)
    case 'featured':
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.popularity - a.popularity)
  }
}

function sortSizes(sizes: string[]) {
  const orderMap = new Map(sizeOrder.map((size, index) => [size, index]))
  return [...sizes].sort((a, b) => {
    const aIndex = orderMap.get(a)
    const bIndex = orderMap.get(b)
    if (aIndex === undefined && bIndex === undefined) return a.localeCompare(b)
    if (aIndex === undefined) return 1
    if (bIndex === undefined) return -1
    return aIndex - bIndex
  })
}

export function ShopPage() {
  usePageMeta({
    title: 'Shop — Fashionnova Clothing & Shoes',
    description:
      'Browse all Fashionnova products. Filter by category, size, price and sort by newest or popularity. Prices shown in MWK.',
    image: '/images/cat-sneakers.jpg',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [priceMin, setPriceMin] = useState(priceBounds.min)
  const [priceMax, setPriceMax] = useState(priceBounds.max)

  const query = searchParams.get('q')?.toLowerCase() ?? ''
  const categoryFilter = searchParams.get('category') ?? ''
  const group = searchParams.get('group') ?? ''
  const newOnly = searchParams.get('new') === '1'
  const sort = searchParams.get('sort') ?? 'featured'
  const sizeFilter = searchParams.get('size') ?? ''

  useEffect(() => {
    setDrawerOpen(false)
  }, [searchParams])

  useEffect(() => {
    const min = Number(searchParams.get('min'))
    const max = Number(searchParams.get('max'))
    if (!Number.isNaN(min) && min >= priceBounds.min) setPriceMin(min)
    if (!Number.isNaN(max) && max <= priceBounds.max && max >= priceMin) setPriceMax(max)
  }, [])

  const availableSizes = useMemo(() => {
    let base = products
    if (categoryFilter) {
      base = base.filter((product) => product.category === categoryFilter)
    }
    if (group === 'clothing') {
      base = base.filter((product) =>
        (groupToCategories.clothing as readonly string[]).includes(product.category),
      )
    }
    if (group === 'shoes') {
      base = base.filter((product) =>
        (groupToCategories.shoes as readonly string[]).includes(product.category),
      )
    }
    return sortSizes(Array.from(new Set(base.flatMap((product) => product.sizes))))
  }, [categoryFilter, group])

  const filtered = useMemo(() => {
    let items = products

    if (query) {
      items = items.filter((product) =>
        product.name.toLowerCase().includes(query),
      )
    }
    if (categoryFilter) {
      items = items.filter((product) => product.category === categoryFilter)
    }
    if (group === 'clothing') {
      items = items.filter((product) =>
        (groupToCategories.clothing as readonly string[]).includes(product.category),
      )
    }
    if (group === 'shoes') {
      items = items.filter((product) =>
        (groupToCategories.shoes as readonly string[]).includes(product.category),
      )
    }
    if (newOnly) {
      items = items.filter((product) => product.newArrival)
    }
    if (sizeFilter) {
      items = items.filter((product) => product.sizes.includes(sizeFilter))
    }
    items = items.filter((product) => product.price >= priceMin && product.price <= priceMax)

    return sortProducts(items, sort)
  }, [query, categoryFilter, group, newOnly, sizeFilter, sort, priceMin, priceMax])

  const updateFilter = (key: string, value: string) => {
    setSearchParams((params) => {
      if (!value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      if (key === 'category') params.delete('group')
      if (key === 'group') params.delete('category')
      return params
    })
  }

  const clearAll = () => {
    setSearchParams(new URLSearchParams())
    setPriceMin(priceBounds.min)
    setPriceMax(priceBounds.max)
  }

  const hasActiveFilters =
    Boolean(query || categoryFilter || group || newOnly || sizeFilter) ||
    priceMin !== priceBounds.min ||
    priceMax !== priceBounds.max

  const activeLabel = useMemo(() => {
    if (query) return `Search: "${query}"`
    if (newOnly) return 'New arrivals'
    if (group === 'clothing') return 'Clothing'
    if (group === 'shoes') return 'Shoes'
    const category = categories.find((item) => item.slug === categoryFilter)
    return category?.name ?? 'All products'
  }, [query, newOnly, group, categoryFilter])

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
          Browse
        </p>
        <ul className="mt-4 space-y-2.5">
          <li>
            <button
              type="button"
              onClick={clearAll}
              className={cn(
                'text-sm transition-colors',
                !hasActiveFilters ? 'font-semibold text-ink' : 'text-smoke hover:text-ink',
              )}
            >
              All products
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setSearchParams(new URLSearchParams({ new: '1' }))
                setPriceMin(priceBounds.min)
                setPriceMax(priceBounds.max)
              }}
              className={cn(
                'text-sm transition-colors',
                newOnly ? 'font-semibold text-ink' : 'text-smoke hover:text-ink',
              )}
            >
              New arrivals
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => updateFilter('group', group === 'clothing' ? '' : 'clothing')}
              className={cn(
                'text-sm transition-colors',
                group === 'clothing' ? 'font-semibold text-ink' : 'text-smoke hover:text-ink',
              )}
            >
              Clothing
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => updateFilter('group', group === 'shoes' ? '' : 'shoes')}
              className={cn(
                'text-sm transition-colors',
                group === 'shoes' ? 'font-semibold text-ink' : 'text-smoke hover:text-ink',
              )}
            >
              Shoes
            </button>
          </li>
        </ul>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
          Categories
        </p>
        <ul className="mt-3 space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                onClick={() =>
                  updateFilter('category', categoryFilter === category.slug ? '' : category.slug)
                }
                className={cn(
                  'flex w-full items-center justify-between text-sm transition-colors',
                  categoryFilter === category.slug
                    ? 'font-semibold text-ink'
                    : 'text-smoke hover:text-ink',
                )}
              >
                {category.name}
                <span className="text-xs text-smoke/60">
                  {products.filter((product) => product.category === category.slug).length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
          Price range (MWK)
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="price-min" className="text-[11px] text-smoke">
              Min
            </label>
            <input
              id="price-min"
              type="number"
              min={priceBounds.min}
              max={priceMax}
              step={500}
              value={priceMin}
              onChange={(event) => setPriceMin(Number(event.target.value))}
              className="mt-1 h-9 w-full border border-line bg-white px-2 text-sm text-ink"
            />
          </div>
          <div>
            <label htmlFor="price-max" className="text-[11px] text-smoke">
              Max
            </label>
            <input
              id="price-max"
              type="number"
              min={priceMin}
              max={priceBounds.max}
              step={500}
              value={priceMax}
              onChange={(event) => setPriceMax(Number(event.target.value))}
              className="mt-1 h-9 w-full border border-line bg-white px-2 text-sm text-ink"
            />
          </div>
        </div>
        <p className="mt-2 text-[11px] text-smoke">
          {formatPrice(priceMin)} – {formatPrice(priceMax)}
        </p>
      </div>

      {availableSizes.length > 0 ? (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
            Size
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => updateFilter('size', sizeFilter === size ? '' : size)}
                aria-pressed={sizeFilter === size}
                className={cn(
                  'min-w-9 border px-2 py-1.5 text-[11px] font-semibold transition-colors',
                  sizeFilter === size
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-white text-ink hover:border-ink',
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={clearAll}
          className="text-[10px] font-bold uppercase tracking-[0.16em] text-clay transition-colors hover:text-ink"
        >
          Clear all filters
        </button>
      ) : null}
    </div>
  )

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/editorial.jpg"
            alt="Editorial black and white portrait of a stylish African man"
            className="h-full w-full object-cover opacity-65"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent"
            aria-hidden="true"
          />
        </div>
        <div className="container-x relative py-10 sm:py-12 lg:py-14">
          <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
            Fashionnova store
          </p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {activeLabel}
          </h1>
          <p className="mt-2 text-sm text-white/65">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} · Prices in MWK
          </p>
        </div>
      </section>

      <section className="container-x py-8 sm:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-xl">
            <SearchBar
              initialValue={query}
              onSubmit={(value) => updateFilter('q', value)}
              placeholder="Search by product name…"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 border border-line bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Filters
            </button>
            <label htmlFor="sort-select" className="text-[10px] font-bold uppercase tracking-[0.16em] text-smoke">
              Sort by
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(event) => updateFilter('sort', event.target.value)}
              className="h-9 border border-line bg-white px-3 text-sm text-ink focus:border-ink focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {query ? (
              <span className="inline-flex items-center gap-1 border border-line bg-white px-3 py-1.5 text-xs text-ink">
                Search: {query}
                <button
                  type="button"
                  onClick={() => updateFilter('q', '')}
                  className="ml-1 text-smoke hover:text-ink"
                  aria-label="Remove search filter"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ) : null}
            {categoryFilter ? (
              <span className="inline-flex items-center gap-1 border border-line bg-white px-3 py-1.5 text-xs text-ink">
                {categories.find((item) => item.slug === categoryFilter)?.name}
                <button
                  type="button"
                  onClick={() => updateFilter('category', '')}
                  className="ml-1 text-smoke hover:text-ink"
                  aria-label="Remove category filter"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ) : null}
            {group ? (
              <span className="inline-flex items-center gap-1 border border-line bg-white px-3 py-1.5 text-xs text-ink">
                {group === 'clothing' ? 'Clothing' : 'Shoes'}
                <button
                  type="button"
                  onClick={() => updateFilter('group', '')}
                  className="ml-1 text-smoke hover:text-ink"
                  aria-label="Remove group filter"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ) : null}
            {newOnly ? (
              <span className="inline-flex items-center gap-1 border border-line bg-white px-3 py-1.5 text-xs text-ink">
                New arrivals
                <button
                  type="button"
                  onClick={() => updateFilter('new', '')}
                  className="ml-1 text-smoke hover:text-ink"
                  aria-label="Remove new arrivals filter"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ) : null}
            {sizeFilter ? (
              <span className="inline-flex items-center gap-1 border border-line bg-white px-3 py-1.5 text-xs text-ink">
                Size {sizeFilter}
                <button
                  type="button"
                  onClick={() => updateFilter('size', '')}
                  className="ml-1 text-smoke hover:text-ink"
                  aria-label="Remove size filter"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ) : null}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-clay transition-colors hover:text-ink"
            >
              Clear all
            </button>
          </div>
        ) : null}

        <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <FilterPanel />
          </aside>
          <div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-line bg-white px-6 py-16 text-center">
                <p className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
                  No products match
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-smoke">
                  Try adjusting your search, clearing filters or browsing a
                  different category.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 inline-flex items-center gap-2 bg-ink px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ProductGrid products={filtered} columns={4} />
            )}
          </div>
        </div>
      </section>

      {drawerOpen ? (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/60 animate-fade-in"
            aria-label="Close filters"
          />
          <aside className="relative flex h-full w-full max-w-[320px] flex-col bg-ivory animate-slide-in">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
                  Filters
                </p>
                <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                  Refine
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-clay"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterPanel />
            </div>
            <div className="border-t border-line px-5 py-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex h-11 w-full items-center justify-center bg-ink text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay"
              >
                Show {filtered.length} results
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
