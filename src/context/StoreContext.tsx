import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, CartLine, Product } from '../types'
import { getProductById } from '../data/products'
import { readStorage, writeStorage } from '../lib/storage'

const CART_KEY = 'fashionnova-cart-v1'
const WISHLIST_KEY = 'fashionnova-wishlist-v1'

interface Notice {
  id: number
  message: string
  showCartAction: boolean
}

interface AddToCartOptions {
  size: string
  color: string
  quantity?: number
}

interface StoreContextValue {
  cartItems: CartItem[]
  cartLines: CartLine[]
  cartCount: number
  subtotal: number
  wishlist: string[]
  cartOpen: boolean
  notice: Notice | null
  addToCart: (product: Product, options: AddToCartOptions) => void
  updateQuantity: (key: string, quantity: number) => void
  removeFromCart: (key: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleWishlist: (product: Product) => void
  isWishlisted: (productId: string) => boolean
  dismissNotice: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.key === 'string' &&
    typeof item.productId === 'string' &&
    typeof item.size === 'string' &&
    typeof item.color === 'string' &&
    typeof item.quantity === 'number'
  )
}

function loadCart(): CartItem[] {
  const stored = readStorage<unknown>(CART_KEY, [])
  if (!Array.isArray(stored)) return []
  return stored.filter(isCartItem).filter((item) => Boolean(getProductById(item.productId)))
}

function loadWishlist(): string[] {
  const stored = readStorage<unknown>(WISHLIST_KEY, [])
  if (!Array.isArray(stored)) return []
  return stored.filter((id): id is string => typeof id === 'string')
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart)
  const [wishlist, setWishlist] = useState<string[]>(loadWishlist)
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState<Notice | null>(null)
  const noticeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    writeStorage(CART_KEY, cartItems)
  }, [cartItems])

  useEffect(() => {
    writeStorage(WISHLIST_KEY, wishlist)
  }, [wishlist])

  useEffect(() => {
    return () => window.clearTimeout(noticeTimer.current)
  }, [])

  const notify = useCallback((message: string, showCartAction = false) => {
    window.clearTimeout(noticeTimer.current)
    setNotice({ id: Date.now(), message, showCartAction })
    noticeTimer.current = window.setTimeout(() => setNotice(null), 3800)
  }, [])

  const dismissNotice = useCallback(() => {
    window.clearTimeout(noticeTimer.current)
    setNotice(null)
  }, [])

  const addToCart = useCallback(
    (product: Product, options: AddToCartOptions) => {
      const quantity = Math.max(1, options.quantity ?? 1)
      const key = `${product.id}::${options.size}::${options.color}`
      setCartItems((current) => {
        const existing = current.find((item) => item.key === key)
        if (existing) {
          return current.map((item) =>
            item.key === key
              ? {
                  ...item,
                  quantity: Math.min(product.stock, item.quantity + quantity),
                }
              : item,
          )
        }
        return [
          ...current,
          {
            key,
            productId: product.id,
            size: options.size,
            color: options.color,
            quantity: Math.min(product.stock, quantity),
          },
        ]
      })
      notify(`${product.name} added to your bag`, true)
    },
    [notify],
  )

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setCartItems((current) =>
      current.map((item) => {
        if (item.key !== key) return item
        const product = getProductById(item.productId)
        const max = product?.stock ?? quantity
        return { ...item, quantity: Math.min(Math.max(1, quantity), max) }
      }),
    )
  }, [])

  const removeFromCart = useCallback((key: string) => {
    setCartItems((current) => current.filter((item) => item.key !== key))
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])
  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((current) => {
        if (current.includes(product.id)) {
          notify(`${product.name} removed from wishlist`)
          return current.filter((id) => id !== product.id)
        }
        notify(`${product.name} saved to wishlist`)
        return [...current, product.id]
      })
    },
    [notify],
  )

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  )

  const cartLines = useMemo<CartLine[]>(() => {
    return cartItems
      .map((item) => {
        const product = getProductById(item.productId)
        if (!product) return null
        return {
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        }
      })
      .filter((line): line is CartLine => line !== null)
  }, [cartItems])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const subtotal = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.lineTotal, 0),
    [cartLines],
  )

  const value = useMemo<StoreContextValue>(
    () => ({
      cartItems,
      cartLines,
      cartCount,
      subtotal,
      wishlist,
      cartOpen,
      notice,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      toggleWishlist,
      isWishlisted,
      dismissNotice,
    }),
    [
      cartItems,
      cartLines,
      cartCount,
      subtotal,
      wishlist,
      cartOpen,
      notice,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      toggleWishlist,
      isWishlisted,
      dismissNotice,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
