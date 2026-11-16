# CHAT MEMORY — Fashionnova Storefront

This file is the persistent project memory for AI-assisted sessions. Read it
before making changes and update the "Session log" and "Current status"
sections after significant work.

Last updated: 2026-11-16

## Project snapshot

- Project: **Fashionnova** — "Your Style. Your Statement."
- Type: front-end fashion storefront (clothing and footwear), Malawi-focused.
- Location: `E:\xoski\business-website-pro`
- Package name: `fashionnova-store` (private, version 1.0.0, ESM).
- Stack: React 18 + TypeScript 5.6 + Vite 6 + Tailwind CSS 3 + React Router 6.
- Icons: `lucide-react`. Fonts: Archivo (display) and Manrope (body), loaded
  from Google Fonts in `index.html`.
- No backend, database, authentication, or real payment integration. This is a
  demonstration storefront.

## Current status

- `npm run typecheck` passes.
- `npm run build` passes and outputs to `dist/`.
- `npm run dev` is the normal local workflow.
- No lint or test scripts are configured.
- Added `src/vite-env.d.ts` to fix the previous `Cannot find module
  './index.css'` TypeScript error.
- Before launch, the placeholder business details and social links in
  `src/config/site.ts` must be replaced.
- Business location is Zomba Main Market; contact phones, WhatsApp, and email
  are configured in `src/config/site.ts`.
- A floating WhatsApp button links to `wa.me` for payments and enquiries; the
  product page, cart checkout summary, and contact page also offer WhatsApp.
- All imagery is now real photography in `public/images` (36 JPGs), sourced from
  Pexels (free license, commercial use allowed, no attribution required).
  Product shots contain no people; editorial and category shots feature Black
  African models, verified from Pexels titles, descriptions, and tags.
  `placeholder.svg` remains only as the `SmartImage` fallback.
- Stock photos are stand-ins for a demo catalogue and should be replaced with
  the shop owner's real inventory photos before launch.
- The logo has a continuous sheen and pulsing dot; the home hero has a slow
  background zoom and staggered entrance animation. Both respect
  `prefers-reduced-motion`.

## Commands

```powershell
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # TypeScript only, no emit
```

`readme.cmd` in the project root is a Windows menu that runs these commands.

## Deployment

- GitHub (public): https://github.com/Xoski2/nyasa-store (branch `main`).
- Vercel project: `nyasa-store` under the `xoski2s-projects` scope.
- Production URL: https://nyasa-store-iota.vercel.app
- The repo is connected to Vercel, so every push to `main` triggers a new
  production deployment automatically. `vercel.json` provides the SPA rewrite.
- GitHub repository and Vercel project/resource names still use `nyasa-store`;
  only the storefront brand was renamed to Fashionnova.
- GitHub CLI (portable): `C:\Users\XoskiDesign\AppData\Local\Temp\opencode\tools\bin\gh.exe`.
- Vercel CLI 65.16.0 is installed at
  `C:\Users\XoskiDesign\AppData\Roaming\npm\node_modules\vercel\dist\vc.js`
  (run with `node <path> ...` because the global shims are missing).

## Source map

```text
index.html                     document shell, SEO defaults, fonts
src/main.tsx                   React root + BrowserRouter
src/App.tsx                    store provider, layout, all routes
src/index.css                  Tailwind entry, global styles, skip link
src/types.ts                   shared domain types
src/config/site.ts             brand, contact, social, delivery, sizes, sorting
src/data/categories.ts         six categories
src/data/products.ts           25 products + selectors and derived collections
src/context/StoreContext.tsx   cart/wishlist state, notices, localStorage
src/hooks/usePageMeta.ts       per-page title/description/OG meta
src/lib/format.ts              MWK price formatting, discount %, class helper
src/lib/storage.ts             safe localStorage read/write
src/lib/validation.ts          email + Malawian phone validation
src/lib/checkout.ts            demo order creation and local order storage
src/lib/whatsapp.ts            WhatsApp deep-link builder
src/components/                layout, product, cart, form, and UI components
src/pages/                     route-level pages
public/images/                 local JPG photos (Pexels) + placeholder.svg fallback
public/favicon.svg             favicon
```

### Components

- `AnnouncementBar`, `Header`, `Footer`, `Logo`: site chrome.
- `CartDrawer`: slide-in bag with quantity controls.
- `NoticeBanner`: transient toast messages from the store context.
- `ProductCard`, `ProductGrid`, `CategoryCard`, `SectionHeading`: catalog UI.
- `SmartImage`: image with fallback behavior.
- `QuantitySelector`, `SearchBar`, `NewsletterForm`, `ScrollToTop`.
- `WhatsAppButton`: floating site-wide chat/payment link.

### Pages and routes

- `/` Home — hero, categories, new arrivals, best sellers, editorial, trust,
  testimonials, newsletter.
- `/shop` Shop — category, size, price, search, sort, and pagination/filtering.
- `/product/:slug` Product detail — gallery, size/color choice, quantity,
  add to bag, wishlist, related products.
- `/cart` Cart — line editing, summary, checkout entry.
- `/checkout` Checkout — validated customer form, delivery zone, demo order.
- `/wishlist` Wishlist — saved products.
- `/about`, `/contact`, `/privacy-policy`, `/terms`, `*` Not found.

## Behavioral notes

- Cart and wishlist persist in `localStorage` under `fashionnova-cart-v1` and
  `fashionnova-wishlist-v1`.
- Demo orders persist under `fashionnova-demo-orders-v1`, capped at 25 entries.
- Cart keys combine product id, size, and color: `id::size::color`.
- Quantities are clamped to product stock.
- `placeDemoOrder` simulates latency and stores locally; it does not collect
  card details or call a server.
- The contact form validates and shows a local success state only; it does not
  send messages.
- Checkout validates Malawian mobile formats (`09xxxxxxxx` or
  `+2659xxxxxxxx`) and email when provided.
- WhatsApp payments are arranged manually through `wa.me` while a payment
  provider is not integrated. No card data is collected.
- Prices are integer MWK values formatted by `formatPrice`.
- Delivery zones and fees are demo values in `src/config/site.ts`.

## Configuration to replace before launch

All in `src/config/site.ts` unless noted:

- Confirm the real showroom/stall details at Zomba Main Market (phone, email,
  and WhatsApp are already set).
- Instagram, Facebook, TikTok, and X URLs (currently generic home pages).
- Delivery zones, fees, and pickup wording.
- Product data, stock, and prices in `src/data/`; replace the stock Pexels
  product photos with real inventory photography when available.
- SEO defaults and canonical/OG URL in `index.html`.
- Demo notices and legal copy, reviewed for the real business.

## Image sources

All photos are from Pexels under the Pexels License (free for commercial use,
no attribution required): https://www.pexels.com/license/. Source photo IDs:

- Products (no people): p-tee 11671964, p-shirt 22441297, p-blazer 7778197,
  p-jacket 11096066, p-suit 6375747, p-shirt2 28576622, p-dress 35538618,
  p-knit 5704187, p-trouser 17135748, p-midi 16427119, p-wblazer 19133952,
  p-woman2 6909817, p-heels 26925257, p-sneaker1 7193629, p-sneaker2 17931134,
  p-sneaker3 1456733, p-sneaker4 19090, p-formal1 15059774, p-derby 292998,
  p-boot 9397837, p-slipon 1447262, p-bag 9582656, p-sunglasses 33927043,
  p-watch 30838490, p-tote 35685415.
- Editorial/categories (Black African models): hero 31909452, hero-alt 34066939,
  promo 34066938, story 34330967, editorial 36245726, cat-men 35303003,
  cat-women 38256847, cat-sneakers 3551487, cat-formal 9154590,
  cat-casual 7061987, cat-accessories 36621281.
- Full-size pattern: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`.
- Limitation: imagery was matched using Pexels metadata (titles/descriptions/
  tags) rather than visual review; the owner should confirm every photo and
  swap in real Fashionnova inventory shots.

## Conventions

- Functional React components with named exports for pages/components.
- TypeScript is strict; avoid `any`, unused locals, and implicit types.
- Tailwind utility classes; custom colors are `ink`, `smoke`, `ivory`, `sand`,
  `line`, `clay`, `clay-dark`, `olive`.
- Display font: `font-display`; body font: `font-sans`.
- Use `container-x` for page width, `formatPrice` for money, and `usePageMeta`
  for per-route metadata.
- No comments unless they explain non-obvious behavior.
- Keep the site accessible: labels, focus states, alt text, skip link, and
  reduced-motion support are already in place.

## Known gaps / suggested next work

1. Replace all placeholder business and social details.
2. Replace stock Pexels product photos with real Fashionnova inventory photos and
   confirm final image licensing/usage.
3. Add a backend/order API and a payment provider; do not collect card data in
   the front end.
4. Wire the contact form and newsletter form to real endpoints.
5. Add linting, formatting, and automated tests.
6. Consider inventory synchronization, order lookup, and analytics consent.

## Session log

### 2026-11-16

- Set real contact details: two phone numbers, WhatsApp, Innocentmwase7@gmail.com,
  and Zomba Main Market.
- Added a floating WhatsApp button and WhatsApp payment/enquiry links on
  product, checkout, and contact views.
- Set Zomba as the local delivery zone and pickup option.
- Added continuous logo animation (text sheen + pulsing dot) and a home hero
  animation (background zoom + staggered fade-up), with reduced-motion support.
- Replaced generated SVG artwork with real Pexels photography: product-only
  shots for the 25 catalogue items and Black African models for hero, promo,
  story, editorial, and all six category tiles.
- Updated every image reference and alt text; `og:image` is now `hero.jpg`.
- Removed all old SVGs except `placeholder.svg` (SmartImage fallback).
- `npm run typecheck` and `npm run build` pass; `dist/images` contains 36 JPGs.
- Added `.gitignore` and `vercel.json` (Vite build, `dist` output, SPA rewrite).
- Initialized git and committed `e5881a2`.
- Pushed to the public GitHub repo `Xoski2/nyasa-store`.
- Created and linked the Vercel project `nyasa-store`, connected it to GitHub,
  and deployed production to https://nyasa-store-iota.vercel.app.
- Verified the live site returns 200 for `/`, `/shop`, a product route, and
  image assets.
- Renamed the brand from NYASA to Fashionnova across the header logo, page
  titles/meta, prose, WhatsApp messages, product names/slugs, storage keys,
  package name, and placeholder artwork; adjusted the logo sizing for the
  longer name.

### 2026-10-25

- Audited the existing storefront and confirmed routes, state, and demo flows.
- Added `src/vite-env.d.ts`; `npm run typecheck` and `npm run build` now pass.
- Created `CHAT_MEMORY.md` (this file).
- Created `readme.cmd`, a Windows quick-start/command menu.
