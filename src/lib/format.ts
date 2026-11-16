const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

export function formatPrice(value: number): string {
  return `MWK ${numberFormatter.format(Math.round(value))}`
}

export function discountPercent(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
