'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Typography from '@/components/typography'
import PromotionCard from './promotionCard'
import QuickPromotionsSkeleton from './quickPromotionsSkeleton'

interface Promotion {
  id: string
  produto: {
    id: string
    titulo: string
    descricao: string
    valor: number | string
    imagens: {
      id: number
      image_base64: string
    }[]
  }
  porcentagem_valor: number
}

const fetchPromotions = async (): Promise<Promotion[]> => {
  const response = await fetch('/api/offers')
  if (!response.ok) {
    throw new Error('Erro ao buscar promoções')
  }
  return response.json()
}

export const QuickPromotionsCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const {
    data: promotions,
    isLoading,
    error
  } = useQuery({
    queryKey: ['promotions'],
    queryFn: fetchPromotions
  })

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollButtons()
    carouselApi.on('select', updateScrollButtons)

    return () => {
      carouselApi.off('select', updateScrollButtons)
    }
  }, [carouselApi])

  if (isLoading) {
    return <QuickPromotionsSkeleton />
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <Typography variant="h3" className="text-red-500">
          Erro ao carregar promoções
        </Typography>
      </div>
    )
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <Typography variant="quick-promotions">
              Promoções <span className="text-primary">rápidas</span>
            </Typography>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            loop: false,
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true
              }
            }
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {promotions?.map((promotion) => (
              <CarouselItem
                key={promotion.id}
                className="pl-4 md:max-w-[452px]"
              >
                <PromotionCard
                  produto={promotion.produto}
                  porcentagem_valor={promotion.porcentagem_valor}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export default QuickPromotionsCarousel
