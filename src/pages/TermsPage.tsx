import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { siteConfig } from '../config/site'

export function TermsPage() {
  usePageMeta({
    title: 'Terms of Service — Fashionnova',
    description: 'Demo terms of service for the Fashionnova storefront.',
  })

  return (
    <section className="container-x py-10 sm:py-12">
      <SectionHeading
        eyebrow="Legal"
        title="Terms of service"
        description="These terms apply to this front-end demo only. Replace with your actual terms before going live."
      />
      <div className="mt-8 max-w-4xl space-y-8 border border-line bg-white p-6 sm:p-10">
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            1. Demo nature
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            This website is provided for demonstration purposes. Prices, stock
            levels, contact details, delivery fees and reviews are sample data.
            No real transactions, payments or deliveries are made through this
            site.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            2. Use of the site
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            You may browse, search and interact with the demo features. Do not
            enter real credit/debit card details or sensitive financial
            information — the checkout does not collect them.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            3. Product information
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            Product images are from Unsplash for demonstration. They do not
            represent actual stock unless updated. Sizing information is provided
            for guidance only in this demo.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            4. Intellectual property
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            The {siteConfig.name} name, design and code are the property of the
            project. Replace branding and assets before commercial use.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            5. Limitation of liability
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            This demo is provided as-is without warranties. The developer and
            site owner are not liable for any decisions made based on demo
            content.
          </p>
        </section>
        <p className="text-xs text-smoke">
          Last updated: {new Date().toISOString().split('T')[0]}
        </p>
      </div>
    </section>
  )
}
