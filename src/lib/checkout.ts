import type { CartLine, DeliveryZone, PlacedOrder } from '../types'
import { readStorage, writeStorage } from './storage'

const ORDERS_KEY = 'fashionnova-demo-orders-v1'

export interface CustomerDetails {
  fullName: string
  phone: string
  email: string
  address: string
  district: string
  notes: string
}

export interface PlaceOrderInput {
  customer: CustomerDetails
  delivery: DeliveryZone
  items: CartLine[]
  subtotal: number
}

function createReference(): string {
  const random = Math.floor(1000 + Math.random() * 9000)
  const stamp = Date.now().toString().slice(-4)
  return `NY-${stamp}-${random}`
}

/**
 * Demo order creation. This stores the order locally only.
 * Replace this function with a POST to an order API and a payment
 * provider integration when a backend is available. It deliberately
 * does not collect or process card details.
 */
export async function placeDemoOrder(input: PlaceOrderInput): Promise<PlacedOrder> {
  await new Promise((resolve) => setTimeout(resolve, 900))

  const order: PlacedOrder = {
    reference: createReference(),
    createdAt: new Date().toISOString(),
    customer: {
      fullName: input.customer.fullName.trim(),
      phone: input.customer.phone.trim(),
      email: input.customer.email.trim(),
      address: input.customer.address.trim(),
      district: input.customer.district,
      notes: input.customer.notes.trim(),
    },
    deliveryId: input.delivery.id,
    deliveryLabel: input.delivery.label,
    deliveryFee: input.delivery.fee,
    items: input.items.map((line) => ({
      name: line.product.name,
      slug: line.product.slug,
      size: line.size,
      color: line.color,
      quantity: line.quantity,
      unitPrice: line.product.price,
      lineTotal: line.lineTotal,
    })),
    subtotal: input.subtotal,
    total: input.subtotal + input.delivery.fee,
  }

  try {
    const existing = readStorage<PlacedOrder[]>(ORDERS_KEY, [])
    writeStorage(ORDERS_KEY, [order, ...existing].slice(0, 25))
  } catch {
    // The confirmation still works in memory if storage is unavailable.
  }

  return order
}

export function getDemoOrders(): PlacedOrder[] {
  return readStorage<PlacedOrder[]>(ORDERS_KEY, [])
}
