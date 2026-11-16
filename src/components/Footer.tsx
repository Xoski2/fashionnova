import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
  Twitter,
} from 'lucide-react'
import { siteConfig } from '../config/site'
import { Logo } from './Logo'

const shopLinks = [
  { label: 'New arrivals', to: '/shop?new=1' },
  { label: "Women's clothing", to: '/shop?category=women' },
  { label: "Men's clothing", to: '/shop?category=men' },
  { label: 'Sneakers', to: '/shop?category=sneakers' },
  { label: 'Formal shoes', to: '/shop?category=formal' },
  { label: 'Accessories', to: '/shop?category=accessories' },
]

const helpLinks = [
  { label: 'Contact us', to: '/contact' },
  { label: 'Delivery & pickup', to: '/contact#delivery' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Shopping bag', to: '/cart' },
  { label: 'About Nyasa', to: '/about' },
]

const legalLinks = [
  { label: 'Privacy policy', to: '/privacy-policy' },
  { label: 'Terms of service', to: '/terms' },
]

const socials = [
  { label: 'Instagram', href: siteConfig.social.instagram, Icon: Instagram },
  { label: 'Facebook', href: siteConfig.social.facebook, Icon: Facebook },
  { label: 'X', href: siteConfig.social.x, Icon: Twitter },
  { label: 'TikTok', href: siteConfig.social.tiktok, Icon: Music2 },
]

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Nyasa on ${label} (external link)`}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-white/35">
              Social links are configurable placeholders
            </p>
          </div>

          <nav aria-label="Shop links">
            <h2 className="text-[10px] font-bold uppercase tracking-widest2 text-white/45">
              Shop
            </h2>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Customer care links">
            <h2 className="text-[10px] font-bold uppercase tracking-widest2 text-white/45">
              Customer care
            </h2>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-7 text-[10px] font-bold uppercase tracking-widest2 text-white/45">
              Legal
            </h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest2 text-white/45">
              Visit & contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                <span>
                  {siteConfig.contact.address}
                  <span className="mt-1 block text-[11px] text-white/40">
                    Zomba Main Market
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                <div>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="block transition-colors hover:text-white"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={siteConfig.contact.phoneAltHref}
                    className="block transition-colors hover:text-white"
                  >
                    {siteConfig.contact.phoneAlt}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                Business hours
              </p>
              <ul className="mt-2 space-y-1 text-xs text-white/60">
                {siteConfig.contact.hours.map((entry) => (
                  <li key={entry.days} className="flex justify-between gap-4">
                    <span>{entry.days}</span>
                    <span>{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/contact"
              className="group mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-clay"
            >
              Get in touch
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">
            Demo storefront — product prices, stock and reviews are sample data.
            Payments are arranged on WhatsApp; no card payments are processed
            online.
          </p>
          <p className="uppercase tracking-[0.16em]">Prices in MWK</p>
        </div>
      </div>
    </footer>
  )
}
