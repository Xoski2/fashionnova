import type { DeliveryZone } from '../types'

/**
 * Central business configuration.
 * Replace the placeholder contact details and social URLs with the real
 * business details before going live. Delivery fees are demo values.
 */
export const siteConfig = {
  name: 'Fashionnova',
  tagline: 'Your Style. Your Statement.',
  description:
    'A modern Malawi-based fashion store for considered clothing and footwear — everyday essentials, statement pieces and sneakers selected with care.',
  currency: 'MWK',
  locale: 'en-MW',
  year: new Date().getFullYear(),
  contact: {
    phone: '+265 992 307 144',
    phoneHref: 'tel:+265992307144',
    phoneAlt: '+265 996 656 162',
    phoneAltHref: 'tel:+265996656162',
    whatsapp: '265992307144',
    whatsappMessage:
      'Hello Fashionnova, I would like to make a payment or ask about a product.',
    email: 'Innocentmwase7@gmail.com',
    emailPlaceholder: 'Innocentmwase7@gmail.com',
    address: 'Zomba Main Market, Zomba, Malawi',
    addressNote: 'Call or WhatsApp before visiting so we can meet you.',
    hours: [
      { days: 'Monday – Friday', time: '09:00 – 18:00' },
      { days: 'Saturday', time: '09:00 – 15:00' },
      { days: 'Sunday', time: 'Closed' },
    ],
    responseTime: 'We aim to reply within one business day.',
  },
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
    x: 'https://x.com/',
  },
  demoNotice:
    'Payments are arranged directly on WhatsApp while online payment integration is completed. Product prices and stock are sample data.',
} as const

export const deliveryZones: DeliveryZone[] = [
  {
    id: 'zomba',
    label: 'Zomba',
    fee: 3000,
    note: 'Local delivery within Zomba town — fee is configurable at checkout.',
  },
  {
    id: 'lilongwe',
    label: 'Lilongwe',
    fee: 5000,
    note: 'Standard delivery — fee is configurable at checkout.',
  },
  {
    id: 'blantyre',
    label: 'Blantyre',
    fee: 7500,
    note: 'Standard delivery — fee is configurable at checkout.',
  },
  {
    id: 'mzuzu',
    label: 'Mzuzu',
    fee: 9000,
    note: 'Standard delivery — fee is configurable at checkout.',
  },
  {
    id: 'other',
    label: 'Other district',
    fee: 12000,
    note: 'Nationwide delivery arrangement confirmed after order.',
  },
  {
    id: 'pickup',
    label: 'Collect in Zomba',
    fee: 0,
    note: 'Demo pickup option in Zomba Town — collection address is a placeholder.',
  },
]

export const sizeOrder = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'One Size',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
]

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most popular' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
] as const
