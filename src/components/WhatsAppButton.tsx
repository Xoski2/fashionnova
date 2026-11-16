import { MessageCircle } from 'lucide-react'
import { whatsAppUrl } from '../lib/whatsapp'

export function WhatsAppButton() {
  return (
    <a
      href={whatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NYASA on WhatsApp for payments and orders"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-soft transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
