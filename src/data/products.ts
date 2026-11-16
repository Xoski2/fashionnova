import type { Product } from '../types'

/**
 * Demo catalogue. All prices are in Malawian Kwacha (MWK), are illustrative
 * and can be edited here by the shop owner. Stock values are demo inventory.
 */
export const products: Product[] = [
  {
    id: 'p01',
    slug: 'essential-oversized-tee',
    name: 'Essential Oversized Tee',
    category: 'men',
    price: 18500,
    description:
      'A heavyweight cotton tee cut with a relaxed, drop-shoulder silhouette. The kind of piece that anchors a weekend wardrobe and layers effortlessly under a jacket.',
    details: [
      'Heavyweight 240gsm cotton jersey',
      'Relaxed oversized fit with dropped shoulders',
      'Ribbed crew neck and reinforced hems',
      'Machine wash cold, inside out',
    ],
    images: [
      {
        src: '/images/p-tee.jpg',
        alt: 'White cotton t-shirt on a hanger against a neutral backdrop',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#171717' },
      { name: 'Ivory', hex: '#EFE9DD' },
      { name: 'Olive', hex: '#5C6247' },
    ],
    stock: 24,
    featured: true,
    newArrival: false,
    popularity: 91,
    material: '100% cotton',
  },
  {
    id: 'p02',
    slug: 'kaya-linen-shirt',
    name: 'Kaya Linen Shirt',
    category: 'men',
    price: 32000,
    compareAtPrice: 38000,
    description:
      'A breathable linen shirt with a soft collar and a clean, straight cut. Designed for warm days in the city and slow evenings out of it.',
    details: [
      'Lightweight linen-cotton blend',
      'Regular fit with a soft point collar',
      'Corozo-style buttons and a single chest pocket',
      'Cool iron; wash with similar colours',
    ],
    images: [
      {
        src: '/images/p-shirt.jpg',
        alt: 'Linen shirt on a wooden hanger against a neutral background',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F4F1EA' },
      { name: 'Sand', hex: '#C8B49A' },
      { name: 'Olive', hex: '#5C6247' },
    ],
    stock: 12,
    featured: true,
    newArrival: true,
    popularity: 84,
    material: '55% linen, 45% cotton',
  },
  {
    id: 'p03',
    slug: 'mtende-tailored-blazer',
    name: 'Mtende Tailored Blazer',
    category: 'men',
    price: 78000,
    description:
      'A single-breasted blazer with a soft shoulder and a modern, slightly tapered waist. Sharp enough for meetings, easy enough for dinner afterwards.',
    details: [
      'Mid-weight suiting fabric with a soft hand-feel',
      'Single-breasted with two-button closure',
      'Two flap pockets and a double back vent',
      'Dry clean only',
    ],
    images: [
      {
        src: '/images/p-blazer.jpg',
        alt: 'Brown tailored blazer displayed on a mannequin',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#3A3A3A' },
      { name: 'Navy', hex: '#1F2A44' },
    ],
    stock: 6,
    featured: true,
    newArrival: false,
    popularity: 76,
    material: '68% polyester, 30% viscose, 2% elastane',
  },
  {
    id: 'p04',
    slug: 'mwai-relaxed-denim-jacket',
    name: 'Mwai Relaxed Denim Jacket',
    category: 'men',
    price: 54000,
    compareAtPrice: 62000,
    description:
      'A washed denim jacket with room to layer. Vintage-inspired detailing meets a modern, boxy fit that works over tees, hoodies and knitwear.',
    details: [
      'Mid-weight washed denim',
      'Relaxed boxy fit with button front',
      'Chest flap pockets and side welt pockets',
      'Wash separately on a gentle cycle',
    ],
    images: [
      {
        src: '/images/p-jacket.jpg',
        alt: 'Mwai Relaxed Denim Jacket in a washed blue finish',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Indigo', hex: '#3F5372' },
      { name: 'Washed Blue', hex: '#7C93AE' },
    ],
    stock: 9,
    featured: false,
    newArrival: true,
    popularity: 73,
    material: '100% cotton denim',
  },
  {
    id: 'p05',
    slug: 'kalonga-two-piece-suit',
    name: 'Kalonga Two-Piece Suit',
    category: 'men',
    price: 96000,
    description:
      'A considered two-piece for the moments that call for polish. Clean lines, a comfortable drape and a versatile colour that moves from ceremony to celebration.',
    details: [
      'Suit jacket and matching trousers included',
      'Slim-regular fit with a natural shoulder',
      'Fully lined jacket with internal pockets',
      'Dry clean only',
    ],
    images: [
      {
        src: '/images/p-suit.jpg',
        alt: 'Kalonga Two-Piece Suit in blue on a hanger',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#343434' },
      { name: 'Navy', hex: '#1F2A44' },
    ],
    stock: 4,
    featured: false,
    newArrival: true,
    popularity: 68,
    material: 'Poly-viscose suiting',
  },
  {
    id: 'p06',
    slug: 'chikondi-oxford-shirt',
    name: 'Chikondi Oxford Shirt',
    category: 'men',
    price: 29000,
    description:
      'A crisp Oxford shirt with a button-down collar — a reliable foundation for smart and casual outfits alike. Cut for comfort without losing its shape.',
    details: [
      'Durable cotton Oxford weave',
      'Button-down collar and curved hem',
      'Regular fit through the body',
      'Machine wash warm',
    ],
    images: [
      {
        src: '/images/p-shirt2.jpg',
        alt: 'White button-down shirt on a hanger',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#F7F6F2' },
      { name: 'Sky', hex: '#AFC3D6' },
    ],
    stock: 18,
    featured: false,
    newArrival: false,
    popularity: 65,
    material: '100% cotton Oxford',
  },
  {
    id: 'p07',
    slug: 'aisha-satin-slip-dress',
    name: 'Aisha Satin Slip Dress',
    category: 'women',
    price: 46000,
    description:
      'An elegant slip dress with a fluid drape and delicate straps. Wear it on its own for evening or layer it over a knit for a softer daytime look.',
    details: [
      'Satin-finish fabric with a soft sheen',
      'Bias-cut midi length with adjustable straps',
      'Concealed side zip',
      'Cool hand wash or dry clean',
    ],
    images: [
      {
        src: '/images/p-dress.jpg',
        alt: 'White satin slip dress hanging on a hanger',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#D8C3A5' },
      { name: 'Black', hex: '#171717' },
    ],
    stock: 10,
    featured: true,
    newArrival: true,
    popularity: 88,
    material: 'Satin-finish polyester',
  },
  {
    id: 'p08',
    slug: 'zuri-knit-layering-set',
    name: 'Zuri Knit Layering Set',
    category: 'women',
    price: 38500,
    description:
      'A soft knit set designed for effortless layering. The relaxed fit and neutral palette make it a quiet essential you will reach for all season.',
    details: [
      'Soft fine-gauge knit',
      'Relaxed top and coordinating piece',
      'Stretch comfort with a clean finish',
      'Hand wash cold and dry flat',
    ],
    images: [
      {
        src: '/images/p-knit.jpg',
        alt: 'Stack of neutral knit sweaters on a white surface',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oat', hex: '#D9CBB5' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    stock: 7,
    featured: false,
    newArrival: true,
    popularity: 79,
    material: 'Viscose blend knit',
  },
  {
    id: 'p09',
    slug: 'nia-wide-leg-trousers',
    name: 'Nia Wide-Leg Trousers',
    category: 'women',
    price: 38000,
    description:
      'High-waisted trousers with a fluid wide leg and a clean front. A tailored alternative to denim that works just as well with a tee as it does with a blazer.',
    details: [
      'Flowing crepe-feel fabric',
      'High waist with concealed closure',
      'Wide leg with a full-length drape',
      'Machine wash cold on a gentle cycle',
    ],
    images: [
      {
        src: '/images/p-trouser.jpg',
        alt: 'Beige wide-leg style trousers',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#161616' },
      { name: 'Tan', hex: '#B39270' },
    ],
    stock: 15,
    featured: true,
    newArrival: false,
    popularity: 82,
    material: 'Recycled polyester blend',
  },
  {
    id: 'p10',
    slug: 'lulu-summer-midi-dress',
    name: 'Lulu Summer Midi Dress',
    category: 'women',
    price: 52000,
    compareAtPrice: 58000,
    description:
      'A lightweight midi dress with an easy shape and a warm-weather palette. An instant outfit for brunches, errands and everything in between.',
    details: [
      'Lightweight breathable fabric',
      'Midi length with a relaxed A-line skirt',
      'Adjustable straps and lined bodice',
      'Machine wash cold, line dry',
    ],
    images: [
      {
        src: '/images/p-midi.jpg',
        alt: 'Floral summer midi dress hanging by a window',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta', hex: '#B4552D' },
      { name: 'Ivory', hex: '#EFE8DB' },
    ],
    stock: 8,
    featured: true,
    newArrival: true,
    popularity: 90,
    material: 'Cotton-viscose blend',
  },
  {
    id: 'p11',
    slug: 'chikondi-blazer-dress',
    name: 'Chikondi Blazer Dress',
    category: 'women',
    price: 72000,
    description:
      'A structured blazer dress with a sharp lapel and a confident line. Designed for evenings when you want to look considered with minimal effort.',
    details: [
      'Structured suiting fabric',
      'Double-breasted front with lapel collar',
      'Fully lined with a mini-length hem',
      'Dry clean only',
    ],
    images: [
      {
        src: '/images/p-wblazer.jpg',
        alt: 'White structured blazer dress on a mannequin',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#141414' },
      { name: 'Sand', hex: '#C3AE92' },
    ],
    stock: 5,
    featured: false,
    newArrival: false,
    popularity: 71,
    material: 'Poly-viscose suiting',
  },
  {
    id: 'p12',
    slug: 'thandi-utility-jacket',
    name: 'Thandi Utility Jacket',
    category: 'women',
    price: 64500,
    description:
      'A practical utility jacket with a relaxed cut and roomy pockets. A seasonless layer that adds structure to simple outfits.',
    details: [
      'Mid-weight cotton twill',
      'Relaxed fit with a drawstring waist',
      'Four front pockets and a concealed zip',
      'Machine wash cold',
    ],
    images: [
      {
        src: '/images/p-woman2.jpg',
        alt: 'Tan utility-style jacket on a wooden hanger',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive', hex: '#5C6247' },
      { name: 'Stone', hex: '#B7AB98' },
    ],
    stock: 6,
    featured: false,
    newArrival: true,
    popularity: 69,
    material: '100% cotton twill',
  },
  {
    id: 'p13',
    slug: 'zoe-heeled-mule',
    name: 'Zoe Heeled Mule',
    category: 'formal',
    price: 58000,
    description:
      'A sculptural heeled mule with a square toe and a comfortable block heel. The finishing touch for occasion dressing, from ceremonies to dinners.',
    details: [
      'Smooth synthetic upper',
      'Square toe with a 6cm block heel',
      'Padded footbed for comfort',
      'Wipe clean with a soft cloth',
    ],
    images: [
      {
        src: '/images/p-heels.jpg',
        alt: 'High-heeled strappy sandals in a studio product shot',
      },
    ],
    sizes: ['38', '39', '40', '41', '42'],
    colors: [
      { name: 'Tan', hex: '#B08A63' },
      { name: 'Black', hex: '#171717' },
    ],
    stock: 0,
    featured: false,
    newArrival: false,
    popularity: 67,
    material: 'Synthetic upper, rubber sole',
  },
  {
    id: 'p14',
    slug: 'nyasa-court-low',
    name: 'Nyasa Court Low',
    category: 'sneakers',
    price: 58000,
    description:
      'Our everyday court sneaker: a clean leather-look upper, a cushioned collar and a low-profile sole. Simple, versatile and made for city days.',
    details: [
      'Smooth leather-look upper',
      'Cushioned insole with a padded collar',
      'Durable rubber cupsole',
      'Spot clean with a damp cloth',
    ],
    images: [
      {
        src: '/images/p-sneaker1.jpg',
        alt: 'White low-top sneakers on a wooden chair',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'White', hex: '#F2F0EA' },
      { name: 'Black', hex: '#1A1A1A' },
    ],
    stock: 20,
    featured: true,
    newArrival: true,
    popularity: 95,
    material: 'Synthetic leather upper, rubber sole',
  },
  {
    id: 'p15',
    slug: 'chikwawa-runner',
    name: 'Chikwawa Runner',
    category: 'sneakers',
    price: 64000,
    compareAtPrice: 72000,
    description:
      'A lightweight runner-inspired sneaker with a breathable upper and a springy sole. Built for long walks, busy days and everything on your list.',
    details: [
      'Breathable knit and mesh upper',
      'Cushioned EVA midsole',
      'Padded heel and tongue',
      'Wipe clean; air dry away from direct heat',
    ],
    images: [
      {
        src: '/images/p-sneaker2.jpg',
        alt: 'Blue athletic running sneakers on a neutral surface',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45', '46'],
    colors: [
      { name: 'Stone', hex: '#B7AC9C' },
      { name: 'Clay', hex: '#B4552D' },
    ],
    stock: 11,
    featured: true,
    newArrival: false,
    popularity: 89,
    material: 'Knit textile upper, EVA sole',
  },
  {
    id: 'p16',
    slug: 'mzuzu-street-sneaker',
    name: 'Mzuzu Street Sneaker',
    category: 'sneakers',
    price: 69500,
    description:
      'A chunky street sneaker with layered panels and a bold sole. A statement shoe that still plays well with denim, tailoring and relaxed fits.',
    details: [
      'Layered synthetic and mesh upper',
      'Chunky rubber outsole',
      'Padded collar and tongue',
      'Spot clean only',
    ],
    images: [
      {
        src: '/images/p-sneaker3.jpg',
        alt: 'Chunky sneakers with textured panels on a grey background',
      },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Ivory', hex: '#EEE9DE' },
      { name: 'Black', hex: '#181818' },
    ],
    stock: 8,
    featured: false,
    newArrival: true,
    popularity: 85,
    material: 'Textile and synthetic upper, rubber sole',
  },
  {
    id: 'p17',
    slug: 'everyday-canvas-sneaker',
    name: 'Everyday Canvas Sneaker',
    category: 'sneakers',
    price: 42000,
    description:
      'A simple canvas sneaker with a vulcanised sole and a low-key finish. The pair you keep by the door for errands, coffee runs and easy weekends.',
    details: [
      'Cotton canvas upper',
      'Vulcanised rubber sole',
      'Cushioned footbed',
      'Machine washable on a gentle cycle',
    ],
    images: [
      {
        src: '/images/p-sneaker4.jpg',
        alt: 'Blue canvas low-top sneakers with white soles',
      },
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Off White', hex: '#EFEBE2' },
      { name: 'Black', hex: '#1B1B1B' },
    ],
    stock: 16,
    featured: false,
    newArrival: false,
    popularity: 80,
    material: '100% cotton canvas, rubber sole',
  },
  {
    id: 'p18',
    slug: 'heritage-leather-oxford',
    name: 'Heritage Leather Oxford',
    category: 'formal',
    price: 86000,
    description:
      'A timeless Oxford with a refined leather finish and a comfortable sole. The pair to reach for when the occasion calls for something properly polished.',
    details: [
      'Smooth leather upper',
      'Classic Oxford lacing with a closed lace panel',
      'Cushioned leather-lined insole',
      'Use a shoe tree and polish regularly',
    ],
    images: [
      {
        src: '/images/p-formal1.jpg',
        alt: 'Heritage Leather Oxford formal shoe in brown leather',
      },
    ],
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    colors: [
      { name: 'Brown', hex: '#6B4A32' },
      { name: 'Black', hex: '#141414' },
    ],
    stock: 7,
    featured: true,
    newArrival: false,
    popularity: 78,
    material: 'Leather upper, rubber sole',
  },
  {
    id: 'p19',
    slug: 'executive-derby-shoe',
    name: 'Executive Derby Shoe',
    category: 'formal',
    price: 92000,
    description:
      'A clean Derby shoe with an open lace panel and a sleek profile. Understated enough for the office, elevated enough for celebrations.',
    details: [
      'Polished leather-look upper',
      'Derby lacing with a cushioned insole',
      'Durable stacked-look sole',
      'Wipe clean and store with shoe trees',
    ],
    images: [
      {
        src: '/images/p-derby.jpg',
        alt: 'Executive Derby Shoe in black leather',
      },
    ],
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    colors: [
      { name: 'Brown', hex: '#7A5335' },
      { name: 'Black', hex: '#151515' },
    ],
    stock: 5,
    featured: false,
    newArrival: false,
    popularity: 74,
    material: 'Leather-look upper, rubber sole',
  },
  {
    id: 'p20',
    slug: 'desert-suede-boot',
    name: 'Desert Suede Boot',
    category: 'casual',
    price: 72000,
    description:
      'A soft suede desert boot with a crepe-style sole and a relaxed silhouette. Equally at home with chinos or rolled-up denim.',
    details: [
      'Suede-look upper with contrast stitching',
      'Two-eyelet lace-up with a padded collar',
      'Textured crepe-style sole',
      'Protect with a suede brush and spray',
    ],
    images: [
      {
        src: '/images/p-boot.jpg',
        alt: 'Leather chukka boot in a warm brown tone',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Sand', hex: '#B99B75' },
      { name: 'Brown', hex: '#6B4A32' },
    ],
    stock: 9,
    featured: true,
    newArrival: false,
    popularity: 77,
    material: 'Suede-look upper, rubber sole',
  },
  {
    id: 'p21',
    slug: 'nyasa-everyday-slip-on',
    name: 'Nyasa Everyday Slip-On',
    category: 'casual',
    price: 36000,
    compareAtPrice: 42000,
    description:
      'A low-maintenance slip-on with a clean canvas upper and an easy fit. Designed for days when getting dressed should be the simplest part.',
    details: [
      'Durable canvas upper',
      'Elastic side gores for easy wear',
      'Padded footbed and flexible sole',
      'Spot clean with a soft brush',
    ],
    images: [
      {
        src: '/images/p-slipon.jpg',
        alt: 'Checkered canvas slip-on shoes',
      },
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Off White', hex: '#EEE9DF' },
    ],
    stock: 14,
    featured: false,
    newArrival: false,
    popularity: 72,
    material: 'Cotton canvas, rubber sole',
  },
  {
    id: 'p22',
    slug: 'leather-weekender-bag',
    name: 'Leather Weekender Bag',
    category: 'accessories',
    price: 95000,
    description:
      'A roomy weekender with a structured shape and considered details. Enough space for a short trip, with a detachable strap for hands-free carrying.',
    details: [
      'Textured leather-look body',
      'Detachable and adjustable shoulder strap',
      'Interior zip pocket and two slip pockets',
      'Wipe clean; store in the dust bag provided',
    ],
    images: [
      {
        src: '/images/p-bag.jpg',
        alt: 'Black leather weekender bag with brown accents',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Tan', hex: '#A7784E' },
      { name: 'Black', hex: '#171717' },
    ],
    stock: 4,
    featured: true,
    newArrival: false,
    popularity: 83,
    material: 'Leather-look PU, cotton lining',
  },
  {
    id: 'p23',
    slug: 'classic-aviator-sunglasses',
    name: 'Classic Aviator Sunglasses',
    category: 'accessories',
    price: 28000,
    description:
      'A lightweight aviator silhouette with tinted lenses and a slim metal frame. A timeless finishing piece for bright days.',
    details: [
      'Metal frame with adjustable nose pads',
      'UV400 tinted lenses',
      'Includes a protective pouch',
      'Clean with the supplied cloth',
    ],
    images: [
      {
        src: '/images/p-sunglasses.jpg',
        alt: 'Black and silver aviator sunglasses',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Gold / Green', hex: '#A98B4B' },
      { name: 'Black / Smoke', hex: '#252525' },
    ],
    stock: 22,
    featured: false,
    newArrival: true,
    popularity: 75,
    material: 'Metal frame, polycarbonate lenses',
  },
  {
    id: 'p24',
    slug: 'minimalist-leather-watch',
    name: 'Minimalist Leather Watch',
    category: 'accessories',
    price: 65000,
    description:
      'A pared-back watch with a clean dial and a soft leather-look strap. The kind of accessory that quietly finishes an outfit.',
    details: [
      'Quartz movement with a minimalist dial',
      'Stainless steel case',
      'Adjustable leather-look strap',
      '3 ATM water resistance; avoid swimming',
    ],
    images: [
      {
        src: '/images/p-watch.jpg',
        alt: 'Minimalist watch with a white dial and leather strap',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Tan / White', hex: '#B08A63' },
      { name: 'Black / Black', hex: '#1C1C1C' },
    ],
    stock: 10,
    featured: false,
    newArrival: false,
    popularity: 81,
    material: 'Stainless steel, leather-look strap',
  },
  {
    id: 'p25',
    slug: 'canvas-market-tote',
    name: 'Canvas Market Tote',
    category: 'accessories',
    price: 26000,
    description:
      'A sturdy canvas tote with a generous shape and internal pocket. Built for the market, the office and everything you collect along the way.',
    details: [
      'Heavyweight cotton canvas',
      'Two top handles with reinforced stitching',
      'Interior slip pocket',
      'Spot clean recommended',
    ],
    images: [
      {
        src: '/images/p-tote.jpg',
        alt: 'Canvas tote bag with leather handles',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Natural', hex: '#D8C8AC' },
      { name: 'Black', hex: '#191919' },
    ],
    stock: 30,
    featured: false,
    newArrival: true,
    popularity: 70,
    material: '100% cotton canvas',
  },
]

export const allSizes = Array.from(
  new Set(products.flatMap((product) => product.sizes)),
)

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug)

export const getProductById = (id: string) =>
  products.find((product) => product.id === id)

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.category === product.category ||
          candidate.material.split(' ')[0] === product.material.split(' ')[0]),
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)

export const newArrivals = products
  .filter((product) => product.newArrival)
  .sort((a, b) => b.popularity - a.popularity)

export const bestSellers = products
  .filter((product) => product.featured)
  .sort((a, b) => b.popularity - a.popularity)

export const priceBounds = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price)),
}
