'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { Plane, Hotel, Utensils, MapPin, Heart, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PackageType {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
  badge?: string
}

interface TravelPackagesTypeProps {
  onSelectPackage: (packageId: string) => void
  selectedPackage: string
}

export function TravelPackagesType({
  onSelectPackage,
  selectedPackage
}: TravelPackagesTypeProps) {
  const t = useTranslations(
    'homepage.travel.search.travelPackages.package-types'
  )
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const packageTypes: PackageType[] = [
    {
      id: 'flight-only',
      name: t('flight-only.name'),
      description: t('flight-only.description'),
      icon: <Plane className="h-6 w-6" />,
      features: t.raw('flight-only.features')
    },
    {
      id: 'flight-hotel',
      name: t('flight-hotel.name'),
      description: t('flight-hotel.description'),
      icon: <Hotel className="h-6 w-6" />,
      features: t.raw('flight-hotel.features')
    },
    {
      id: 'all-inclusive',
      name: t('all-inclusive.name'),
      description: t('all-inclusive.description'),
      icon: <Utensils className="h-6 w-6" />,
      badge: 'Mais Popular',
      features: t.raw('all-inclusive.features')
    },
    {
      id: 'luxury',
      name: t('luxury.name'),
      description: t('luxury.description'),
      icon: <Sparkles className="h-6 w-6" />,
      badge: 'Premium',
      features: t.raw('luxury.features')
    },
    {
      id: 'adventure',
      name: t('adventure.name'),
      description: t('adventure.description'),
      icon: <MapPin className="h-6 w-6" />,
      features: t.raw('adventure.features')
    },
    {
      id: 'romantic',
      name: t('romantic.name'),
      description: t('romantic.description'),
      icon: <Heart className="h-6 w-6" />,
      features: t.raw('romantic.features')
    }
  ]

  return (
    <div className="w-full py-6">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: isMobile ? 1 : 2
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {packageTypes.map((pkg) => (
            <CarouselItem
              key={pkg.id}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-lg',
                      selectedPackage === pkg.id && 'border-2 border-primary'
                    )}
                    onClick={() => onSelectPackage(pkg.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {pkg.icon}
                          <h3 className="text-lg font-semibold">{pkg.name}</h3>
                        </div>
                        {pkg.badge && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            {pkg.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {pkg.description}
                      </p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="z-[10000] h-full w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">
                      Incluso no pacote:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="text-primary">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
