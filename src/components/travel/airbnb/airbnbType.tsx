'use client'

import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ChevronRight,
  Hotel,
  Home,
  Building2,
  BedDouble,
  Tent,
  Waves,
  Landmark,
  House,
  Mountain,
  WavesIcon,
  Palmtree,
  Droplets,
  TreePine,
  Tractor,
  Anchor,
  Triangle,
  Trees,
  CircleDollarSign,
  MountainSnow,
  Castle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'

interface AirbnbTypeProps {
  onTypeSelect: (type: string) => void
  selectedType: string | null
}

const airbnbTypes = [
  { id: 'resort', icon: Hotel },
  { id: 'hotel', icon: Building2 },
  { id: 'pousada', icon: Home },
  { id: 'hostel', icon: BedDouble },
  { id: 'camping', icon: Tent },
  { id: 'lago', icon: Waves },
  { id: 'iconicos', icon: Landmark },
  { id: 'chales', icon: House },
  { id: 'vistas-incriveis', icon: Mountain },
  { id: 'frente-praia', icon: WavesIcon },
  { id: 'tropical', icon: Palmtree },
  { id: 'piscinas', icon: Droplets },
  { id: 'interior', icon: TreePine },
  { id: 'fazendas', icon: Tractor },
  { id: 'beira-lago', icon: Anchor },
  { id: 'triangulares', icon: Triangle },
  { id: 'arvore', icon: Trees },
  { id: 'ilhas', icon: WavesIcon },
  { id: 'parques', icon: Trees },
  { id: 'arredondadas', icon: CircleDollarSign },
  { id: 'terra', icon: MountainSnow },
  { id: 'castelos', icon: Castle },
  { id: 'surf', icon: Waves }
]

export function AirbnbType({ onTypeSelect, selectedType }: AirbnbTypeProps) {
  const t = useTranslations(
    'homepage.travel.search.accommodation.accommodation-type'
  )
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
                {airbnbTypes.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTypeSelect(item.id)}
                      className={cn(
                        'flex min-w-[70px] flex-col items-center justify-center transition-all',
                        selectedType === item.id
                          ? 'border-airbnb-primary text-airbnb-primary border-b-2'
                          : 'hover:text-airbnb-primary text-muted-foreground'
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
