export interface Ad {
  id: number
  title: string
  description?: string
  image: string
  ctaText: string
  href: string
}

const ads: Ad[] = [
  {
    id: 1,
    title: 'Aproveite a Oferta Surpresa',
    image: '/images/offers/offer-1.png',
    ctaText: 'Saiba Mais',
    href: '/ofertas/surpresa'
  },
  {
    id: 2,
    title: '45% OFF',
    description: 'Especial Mercado e Bebidas com descontos de até 45%',
    image: '/images/offers/offer-2.png',
    ctaText: 'Saiba Mais',
    href: '/ofertas/mercado'
  },
  {
    id: 3,
    title: 'Aproveite as férias de julho com pontos 6Wings',
    image: '/images/offers/offer-3.png',
    ctaText: 'Saiba Mais',
    href: '/ofertas/ferias'
  },
  {
    id: 4,
    title: 'Garanta voos com 30% OFF',
    description: 'Voe para Grécia, Croácia Malta e Albânia',
    image: '/images/offers/offer-4.png',
    ctaText: 'Saiba Mais',
    href: '/ofertas/voos'
  }
]

export default ads
