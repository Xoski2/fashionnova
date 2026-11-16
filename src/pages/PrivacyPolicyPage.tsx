import { usePageMeta } from '../hooks/usePageMeta'
import { SectionHeading } from '../components/SectionHeading'
import { siteConfig } from '../config/site'

export function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy — Fashionnova',
    description: 'Demo privacy policy for the Fashionnova storefront.',
  })

  return (
    <section className="container-x py-10 sm:py-12">
      <SectionHeading
        eyebrow="Legal"
        title="Privacy policy"
        description="This is a demo policy for a front-end showcase. Replace with your actual privacy policy when connected to real services."
      />
      <div className="mt-8 max-w-4xl space-y-8 border border-line bg-white p-6 sm:p-10">
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            1. Overview
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            This website ({siteConfig.name}) is a front-end demonstration
            storefront. No payment information, account passwords or sensitive
            personal data are processed by a live backend. Demo actions (cart,
            wishlist, orders, newsletter) use localStorage on your device.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            2. Information we collect
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            In this demo, information you enter into forms (checkout/contact) is
            held in memory for the session and may be stored locally for order
            history display only. We do not transmit this data to external
            servers. Do not submit real payment card details — none are requested.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            3. Cookies & localStorage
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            This site uses localStorage to remember your shopping bag and
            wishlist for demonstration purposes. You can clear these at any time
            through your browser settings.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            4. Third-party links
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            Social media and WhatsApp links are placeholders configured in{' '}
            <code>src/config/site.ts</code>. These are external sites with their
            own privacy policies.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
            5. Changes
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-smoke">
            This is a template demo policy and may be updated. Replace it with
            your own policy before deploying to production.
          </p>
        </section>
        <p className="text-xs text-smoke">
          Last updated: {new Date().toISOString().split('T')[0]}
        </p>
      </div>
    </section>
  )
}
