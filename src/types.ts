export type CategorySlug =
  | 'men'
  | 'women'
  | 'sneakers'
  | 'formal'
  | 'casual'
  | 'accessories'

export interface Category {
  slug: CategorySlug
  name: string
  shortName: string
  description: string
  image: string
  imageAlt: string
}

export interface ProductColor {
  name: string
  hex: string
}

export interface ProductImage {
  src: string
  alt: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: CategorySlug
  price: number
  compareAtPrice?: number
  description: string
  details: string[]
  images: ProductImage[]
  sizes: string[]
  colors: ProductColor[]
  stock: number
  featured: boolean
  newArrival: boolean
  popularity: number
  material: string
}

export interface CartItem {
  key: string
  productId: string
  size: string
  color: string
  quantity: number
}

export interface CartLine extends CartItem {
  product: Product
  lineTotal: number
}

export interface OrderLine {
  name: string
  slug: string
  size: string
  color: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface DeliveryZone {
  id: string
  label: string
  fee: number
  note: string
}

export interface PlacedOrder {
  reference: string
  createdAt: string
  customer: {
    fullName: string
    phone: string
    email: string
    address: string
    district: string
    notes: string
  }
  deliveryId: string
  deliveryLabel: string
  deliveryFee: number
  items: OrderLine[]
  subtotal: number
  total: number
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'popular'
