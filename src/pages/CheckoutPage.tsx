import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, CreditCard, MessageCircle, ShieldCheck } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { SmartImage } from '../components/SmartImage'
import { useStore } from '../context/StoreContext'
import { deliveryZones } from '../config/site'
import { formatPrice } from '../lib/format'
import { isValidEmail, isValidMalawianPhone } from '../lib/validation'
import { placeDemoOrder, type CustomerDetails } from '../lib/checkout'
import { whatsAppUrl } from '../lib/whatsapp'

type FormState = CustomerDetails

const initialForm: FormState = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  district: '',
  notes: '',
}

export function CheckoutPage() {
  usePageMeta({
    title: 'Checkout — NYASA',
    description: 'Demo checkout for NYASA. No card details collected. Prices in MWK.',
    image: '/images/cat-men.jpg',
  })

  const { cartLines, subtotal, clearCart } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(initialForm)
  const [deliveryId, setDeliveryId] = useState(deliveryZones[0].id)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [orderRef, setOrderRef] = useState<string | null>(null)
  const [orderTotal, setOrderTotal] = useState(0)

  const delivery = deliveryZones.find((zone) => zone.id === deliveryId) ?? deliveryZones[0]
  const total = subtotal + delivery.fee

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {}

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your full name.'
    }
    if (!isValidMalawianPhone(form.phone)) {
      nextErrors.phone = 'Enter a valid Malawian number, e.g. 0991234567 or +265991234567.'
    }
    if (form.email.trim() && !isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.address.trim().length < 5) {
      nextErrors.address = 'Enter your delivery or collection details.'
    }
    if (!form.district) {
      nextErrors.district = 'Select a delivery or pickup option.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (cartLines.length === 0) return
    if (!validate()) return

    setSubmitting(true)
    try {
      const order = await placeDemoOrder({
        customer: form,
        delivery,
        items: cartLines,
        subtotal,
      })
      setOrderRef(order.reference)
      setOrderTotal(order.total)
      clearCart()
    } catch {
      setErrors({
        form: 'Something went wrong placing the demo order. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (cartLines.length === 0 && !orderRef) {
    return (
      <section className="container-x py-16 text-center sm:py-20">
        <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
          Checkout
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-ink">
          Your bag is empty
        </h1>
        <p className="mt-2 text-sm text-smoke">
          Add products to your bag before checking out.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
        >
          Browse shop
        </Link>
      </section>
    )
  }

  if (orderRef) {
    return (
      <section className="container-x py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-white">
            <CheckCircle2 className="h-6 w-6 text-clay" aria-hidden="true" />
          </div>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-widest2 text-clay">
            Demo order confirmed
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            Thank you for your order
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-smoke">
            This is a front-end demonstration. No payment was processed and no
            order was sent to a server — the details were saved locally only.
          </p>
          <div className="mt-6 inline-flex flex-col items-center gap-1 border border-line bg-white px-8 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-smoke">
              Order reference
            </p>
            <p className="font-display text-2xl font-extrabold tracking-[0.24em] text-ink">
              {orderRef}
            </p>
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border border-line bg-white p-4">
              <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-smoke">
                Total (demo)
              </dt>
              <dd className="mt-1 text-lg font-bold text-ink">
                {formatPrice(orderTotal)}
              </dd>
            </div>
            <div className="border border-line bg-white p-4">
              <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-smoke">
                Delivery
              </dt>
              <dd className="mt-1 text-sm text-ink">{delivery.label}</dd>
            </div>
            <div className="border border-line bg-white p-4">
              <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-smoke">
                Contact
              </dt>
              <dd className="mt-1 text-sm text-ink">{form.phone}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
            >
              Continue shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-line bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
            >
              Back home
            </Link>
          </div>
          <p className="mt-6 text-[11px] leading-relaxed text-smoke">
            To make this a real checkout, connect a backend API for orders, a
            database for inventory, and a payment provider. No card details are
            stored in this demo.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="container-x py-10 sm:py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-smoke transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to bag
      </button>
      <SectionHeading
        eyebrow="Checkout"
        title="Complete your order"
        description="Demo form only. No card details are collected and no payment is processed."
        className="mt-4"
      />

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="space-y-8">
          <div className="border border-line bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
              Contact details
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  Full name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) => updateField('fullName', event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  className="mt-1.5 h-11 w-full border border-line px-4 text-sm text-ink outline-none focus:border-ink"
                />
                {errors.fullName ? (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  Phone number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0991234567 or +265991234567"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  className="mt-1.5 h-11 w-full border border-line px-4 text-sm text-ink outline-none focus:border-ink"
                />
                {errors.phone ? (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  Email (optional)
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className="mt-1.5 h-11 w-full border border-line px-4 text-sm text-ink outline-none focus:border-ink"
                />
                {errors.email ? (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="border border-line bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
              Delivery or pickup
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  Delivery address or collection details *
                </label>
                <textarea
                  id="address"
                  rows={3}
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(event) => updateField('address', event.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  className="mt-1.5 w-full border border-line px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-ink"
                  placeholder="House number, area, landmark or collection point details."
                />
                {errors.address ? (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.address}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="district" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  District / Option *
                </label>
                <select
                  id="district"
                  value={form.district}
                  onChange={(event) => {
                    updateField('district', event.target.value)
                    const match = deliveryZones.find((zone) => zone.label === event.target.value)
                    if (match) setDeliveryId(match.id)
                  }}
                  aria-invalid={Boolean(errors.district)}
                  className="mt-1.5 h-11 w-full border border-line px-4 text-sm text-ink focus:border-ink focus:outline-none"
                >
                  <option value="">Select an option</option>
                  {deliveryZones.map((zone) => (
                    <option key={zone.id} value={zone.label}>
                      {zone.label} — {formatPrice(zone.fee)}
                    </option>
                  ))}
                </select>
                {errors.district ? (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.district}
                  </p>
                ) : null}
                {form.district ? (
                  <p className="mt-2 text-xs text-smoke">
                    {deliveryZones.find((zone) => zone.label === form.district)?.note}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  Order notes (optional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={form.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                  className="mt-1.5 w-full border border-line px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-ink"
                  placeholder="Sizing preferences, delivery instructions or other details."
                />
              </div>
            </div>
          </div>

          <div className="border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                Order review
              </h2>
              <Link
                to="/cart"
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-clay transition-colors hover:text-ink"
              >
                Edit bag
              </Link>
            </div>
            <ul className="mt-5 divide-y divide-line">
              {cartLines.map((line) => (
                <li key={line.key} className="flex gap-4 py-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand">
                    <SmartImage
                      src={line.product.images[0]?.src}
                      alt={line.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-ink">{line.product.name}</p>
                    <p className="mt-0.5 text-xs text-smoke">
                      Size {line.size} · {line.color} · Qty {line.quantity}
                    </p>
                    <p className="mt-auto text-sm font-bold text-ink">
                      {formatPrice(line.lineTotal)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start gap-3 border border-line bg-sand/40 p-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-clay" aria-hidden="true" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                Demo checkout notice
              </p>
              <p className="mt-1 text-xs leading-relaxed text-smoke">
                This checkout does not collect card details or process online
                payments. Place the demo order, then arrange payment with us on
                WhatsApp. A production launch will add a payment provider and
                backend order API.
              </p>
            </div>
          </div>
        </div>

        <aside className="border border-line bg-white p-6">
          <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
            Summary
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-smoke">Subtotal</dt>
              <dd className="font-semibold text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-smoke">Delivery</dt>
              <dd className="font-semibold text-ink">{formatPrice(delivery.fee)}</dd>
            </div>
            <div className="border-t border-line pt-3">
              <div className="flex items-center justify-between">
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  Total payable
                </dt>
                <dd className="text-xl font-bold text-ink">{formatPrice(total)}</dd>
              </div>
            </div>
          </dl>
          <div className="mt-5 flex items-center gap-2 border border-line px-3 py-2 text-[11px] text-smoke">
            <CreditCard className="h-4 w-4 text-smoke" aria-hidden="true" />
            <span>No card details required for this demo</span>
          </div>
          <a
            href={whatsAppUrl(
              `Hello NYASA, I would like to arrange payment for my order. Total: ${formatPrice(total)}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-[#25D366]/20"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Arrange payment on WhatsApp
          </a>
          {errors.form ? (
            <p className="mt-4 text-xs text-red-700" role="alert">
              {errors.form}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting || cartLines.length === 0}
            className="mt-4 group inline-flex h-11 w-full items-center justify-center gap-2 bg-ink text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? 'Placing demo order...' : 'Place demo order'}
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-3 text-[10px] leading-relaxed text-smoke">
            By placing this demo order you agree that this is a frontend
            demonstration with no real transaction.
          </p>
        </aside>
      </form>
    </section>
  )
}
