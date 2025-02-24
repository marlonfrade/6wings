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
    title: 'homepage.carousel.cristo.title',
    highlight: 'homepage.carousel.cristo.highlight',
    description: 'homepage.carousel.cristo.description',
    ctaText: 'homepage.carousel.cristo.ctaText',
    ctaLink: '#',
    image: '/images/carousel/banner-cristo-redentor.jpg',
    altText: 'homepage.carousel.cristo.altText'
  },
  {
    id: 2,
    title: 'homepage.carousel.aquario.title',
    highlight: 'homepage.carousel.aquario.highlight',
    description: 'homepage.carousel.aquario.description',
    ctaText: 'homepage.carousel.aquario.ctaText',
    ctaLink: '#',
    image: '/images/carousel/banner-aqua-rio.jpg',
    altText: 'homepage.carousel.aquario.altText'
  },
  {
    id: 3,
    title: 'homepage.carousel.yabnabi.title',
    highlight: 'homepage.carousel.yabnabi.highlight',
    description: 'homepage.carousel.yabnabi.description',
    ctaText: 'homepage.carousel.yabnabi.ctaText',
    ctaLink: '#',
    image: '/images/carousel/banner-aldeia-paiter-surui.jpg',
    altText: 'homepage.carousel.yabnabi.altText'
  },
  {
    id: 4,
    title: 'homepage.carousel.canoagem.title',
    highlight: 'homepage.carousel.canoagem.highlight',
    description: 'homepage.carousel.canoagem.description',
    ctaText: 'homepage.carousel.canoagem.ctaText',
    ctaLink: '#',
    image: '/images/carousel/banner-boramar.jpg',
    altText: 'homepage.carousel.canoagem.altText'
  }
]

export default slides
