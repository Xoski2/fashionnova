import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { SmartImage } from '../components/SmartImage'
import { siteConfig } from '../config/site'
import { isValidEmail, isValidMalawianPhone } from '../lib/validation'
import { whatsAppUrl } from '../lib/whatsapp'

interface FormState {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactPage() {
  usePageMeta({
    title: 'Contact NYASA — Clothing & Shoes',
    description:
      'Get in touch with NYASA. Demo contact form with WhatsApp, phone, email and business hours. Messages are not sent to a server.',
    image: '/images/cat-accessories.jpg',
  })

  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
    if (submitted) setSubmitted(false)
  }

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {}

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Enter your name.'
    }
    if (!isValidMalawianPhone(form.phone)) {
      nextErrors.phone = 'Enter a valid Malawian number.'
    }
    if (form.email.trim() && !isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.subject.trim().length < 3) {
      nextErrors.subject = 'Enter a subject.'
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setForm(initialForm)
  }

  const chatUrl = whatsAppUrl(
    'Hello Nyasa, I would like to enquire about your products and payments.',
  )

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/cat-accessories.jpg"
            alt="African woman in a black suit and sunglasses"
            className="h-full w-full object-cover opacity-65"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/25"
            aria-hidden="true"
          />
        </div>
        <div className="container-x relative py-10 sm:py-12 lg:py-14">
          <p className="text-[11px] font-bold uppercase tracking-widest2 text-clay">
            Contact
          </p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get in touch
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/65">
            Questions about sizing, orders or collections? Reach out using the
            form or the channels below.
          </p>
        </div>
      </section>

      <section className="container-x py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="We'd love to hear from you"
              description="Demo form — messages are not delivered to a server. Update the contact details in src/config/site.ts to use real information."
            />
            <form onSubmit={handleSubmit} noValidate className="mt-8 border border-line bg-white p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Full name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    className="mt-1.5 h-11 w-full border border-line px-4 text-sm text-ink outline-none focus:border-ink"
                  />
                  {errors.name ? (
                    <p className="mt-1.5 text-xs text-red-700" role="alert">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Phone number *
                  </label>
                  <input
                    id="contact-phone"
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
                  <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Email (optional)
                  </label>
                  <input
                    id="contact-email"
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
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(event) => updateField('subject', event.target.value)}
                    aria-invalid={Boolean(errors.subject)}
                    className="mt-1.5 h-11 w-full border border-line px-4 text-sm text-ink outline-none focus:border-ink"
                  />
                  {errors.subject ? (
                    <p className="mt-1.5 text-xs text-red-700" role="alert">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    className="mt-1.5 w-full border border-line px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-ink"
                    placeholder="Tell us how we can help you."
                  />
                  {errors.message ? (
                    <p className="mt-1.5 text-xs text-red-700" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>
              {submitted ? (
                <div className="mt-5 border border-ink/10 bg-sand/40 px-4 py-3 text-sm text-ink" role="status">
                  Message sent (demo). No email or data was delivered to a server.
                  Connect a form service or backend to make this live.
                </div>
              ) : null}
              <button
                type="submit"
                className="group mt-5 inline-flex items-center gap-2 bg-ink px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-clay"
              >
                Send message
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="border border-line bg-white p-6">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                Direct contact
              </h2>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center border border-line">
                    <Phone className="h-4 w-4 text-clay" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                      Phone
                    </p>
                    <a
                      href={siteConfig.contact.phoneHref}
                      className="mt-1 block text-sm text-smoke transition-colors hover:text-ink"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <a
                      href={siteConfig.contact.phoneAltHref}
                      className="mt-0.5 block text-sm text-smoke transition-colors hover:text-ink"
                    >
                      {siteConfig.contact.phoneAlt}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center border border-line">
                    <Mail className="h-4 w-4 text-clay" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="mt-1 block break-all text-sm text-smoke transition-colors hover:text-ink"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center border border-line">
                    <MessageCircle className="h-4 w-4 text-clay" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                      WhatsApp
                    </p>
                    <a
                      href={chatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1 inline-flex items-center gap-1 text-sm text-smoke transition-colors hover:text-ink"
                    >
                      Chat on WhatsApp
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                    <p className="mt-0.5 text-[11px] text-smoke/70">
                      Use WhatsApp for payments, sizing and delivery questions.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center border border-line">
                    <MapPin className="h-4 w-4 text-clay" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                      Location
                    </p>
                    <p className="mt-1 text-sm text-smoke">
                      {siteConfig.contact.address}
                    </p>
                    <p className="mt-0.5 text-[11px] text-smoke/70">
                      {siteConfig.contact.addressNote}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-line bg-white p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-clay" aria-hidden="true" />
                <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                  Business hours
                </h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {siteConfig.contact.hours.map((entry) => (
                  <li key={entry.days} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0 last:pb-0">
                    <span className="text-smoke">{entry.days}</span>
                    <span className="font-semibold text-ink">{entry.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-smoke">{siteConfig.contact.responseTime}</p>
            </div>

            <div id="delivery" className="border border-line bg-ink p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
                Delivery
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight">
                Nationwide demo coverage
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Delivery fees are configured in src/config/site.ts. Collection
                (pickup) is available in the demo checkout.
              </p>
              <Link
                to="/checkout"
                className="group mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-clay"
              >
                See checkout options
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
