import type { Category } from '../types'

export const categories: Category[] = [
  {
    slug: 'men',
    name: "Men's Clothing",
    shortName: 'Men',
    description: 'Tailoring, shirting and relaxed everyday layers.',
    image: '/images/cat-men.jpg',
    imageAlt: 'African man in a tailored dark suit',
  },
  {
    slug: 'women',
    name: "Women's Clothing",
    shortName: 'Women',
    description: 'Dresses, knitwear and modern wardrobe staples.',
    image: '/images/cat-women.jpg',
    imageAlt: 'African woman in a sequin dress',
  },
  {
    slug: 'sneakers',
    name: 'Sneakers',
    shortName: 'Sneakers',
    description: 'Clean court styles and easy everyday runners.',
    image: '/images/cat-sneakers.jpg',
    imageAlt: 'Young African man in denim and sneakers',
  },
  {
    slug: 'formal',
    name: 'Formal Shoes',
    shortName: 'Formal',
    description: 'Polished leather shoes for work and occasions.',
    image: '/images/cat-formal.jpg',
    imageAlt: 'African man in formal wear',
  },
  {
    slug: 'casual',
    name: 'Casual Wear',
    shortName: 'Casual',
    description: 'Easy pieces for off-duty days and weekends.',
    image: '/images/cat-casual.jpg',
    imageAlt: 'Stylish African man in a denim jacket',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    shortName: 'Accessories',
    description: 'Bags, watches and finishing touches.',
    image: '/images/cat-accessories.jpg',
    imageAlt: 'African woman in a black suit and sunglasses',
  },
]

export const categoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug)
