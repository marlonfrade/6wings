export interface Slide {
  id: number
  title: string
  highlight?: string
  description: string
  ctaText: string
  ctaLink: string
  image: string
  altText: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'homepage.hero.cristo.title',
    highlight: '',
    description: 'homepage.hero.cristo.description',
    ctaText: 'homepage.hero.cta',
    ctaLink: '#',
    image: '/images/carousel/banner-cristo.png',
    altText: 'homepage.hero.cristo.altText'
  },
  {
    id: 2,
    title: 'homepage.hero.aquario.title',
    highlight: '',
    description: 'homepage.hero.aquario.description',
    ctaText: 'homepage.hero.cta',
    ctaLink: '#',
    image: '/images/carousel/banner-aqua-rio.png',
    altText: 'homepage.hero.aquario.altText'
  }
]

export default slides
