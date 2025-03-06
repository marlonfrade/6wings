'use client'

import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ChevronRight,
  Car,
  Bike,
  Bus,
  Caravan,
  CarFrontIcon as SUV,
  CarFrontIcon as Sedan,
  CarFrontIcon as Hatchback,
  CarFrontIcon as Luxury,
  CarFrontIcon as Electric,
  CarFrontIcon as Compact,
  CarFrontIcon as Convertible,
  CarFrontIcon as Pickup,
  CarFrontIcon as Minivan,
  CarFrontIcon as Sports
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'

interface CarRentalTypeProps {
  onTypeSelect: (type: string) => void
  selectedType: string | null
}

const carTypes = [
  { id: 'economico', icon: Car },
  { id: 'sedan', icon: Sedan },
  { id: 'suv', icon: SUV },
  { id: 'hatchback', icon: Hatchback },
  { id: 'luxo', icon: Luxury },
  { id: 'eletrico', icon: Electric },
  { id: 'compacto', icon: Compact },
  { id: 'conversivel', icon: Convertible },
  { id: 'pickup', icon: Pickup },
  { id: 'minivan', icon: Minivan },
  { id: 'esportivo', icon: Sports },
  { id: 'moto', icon: Bike },
  { id: 'onibus', icon: Bus },
  { id: 'caravan', icon: Caravan }
]

export function CarRentalType({
  onTypeSelect,
  selectedType
}: CarRentalTypeProps) {
  const t = useTranslations('homepage.travel.search.carRentals.types')
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      onSelect()
      emblaApi.on('select', onSelect)
      emblaApi.on('reInit', onSelect)

      return () => {
        emblaApi.off('select', onSelect)
        emblaApi.off('reInit', onSelect)
      }
    }
  }, [emblaApi, onSelect])

  return (
    <TooltipProvider>
      <div className="relative w-full max-w-full">
        <div className="flex items-center justify-between">
          <div className="flex-1 overflow-hidden">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4 px-2 py-4">
                {carTypes.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTypeSelect(item.id)}
                      className={cn(
                        'flex min-w-[70px] flex-col items-center justify-center transition-all',
                        selectedType === item.id
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      )}
                    >
                      <Icon className="mb-2 h-6 w-6" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="max-w-[70px] truncate whitespace-nowrap text-xs">
                            {t(item.id)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white">{t(item.id)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="ml-2 flex items-center">
            {canScrollPrev && (
              <button
                onClick={scrollPrev}
                className="mr-1 rounded-full bg-background p-1 shadow-md hover:bg-accent"
                aria-label="Rolar para a esquerda"
              >
                <ChevronRight className="h-5 w-5 rotate-180 transform" />
              </button>
            )}

            {canScrollNext && (
              <button
                onClick={scrollNext}
                className="rounded-full bg-background p-1 shadow-md hover:bg-accent"
                aria-label="Rolar para a direita"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
