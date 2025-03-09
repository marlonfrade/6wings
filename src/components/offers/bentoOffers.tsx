'use client'

import Image from 'next/image'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { BentoGrid } from '@/components/ui/magicui/bento-grid'
import Typography from '@/components/typography'
import { Button } from '@/components/button'
import ads from '@/data/ads'
import { cn } from '@/lib/utils'

export const BentoOffers = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-[1400px] p-2">
      <BentoGrid className="auto-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Primeiro Card - Oferta Surpresa */}
        <div
          className="group relative col-span-1 overflow-hidden rounded-2xl bg-[#F8F9FA] p-6 transition-all duration-300 hover:shadow-lg md:col-span-2 lg:col-span-2 lg:p-12"
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex flex-col items-center">
            <Typography
              variant="advert-1"
              className="mb-8 max-w-md text-center"
            >
              {ads[0].title}
            </Typography>
            <div className="relative h-[200px] w-full">
              <Image
                src={ads[0].image}
                alt={ads[0].title}
                fill
                className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform transition-all duration-300 ease-in-out">
                <Button
                  variant="primary"
                  label={ads[0].ctaText}
                  Icon={() => <ArrowRightIcon />}
                  iconPosition="right"
                  className={cn(
                    'transition-all duration-300',
                    hoveredCard === 1 ? 'scale-110' : ''
                  )}
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-transparent transition-all duration-500 group-hover:from-transparent group-hover:to-black/5" />
        </div>

        {/* Segundo Card - 45% OFF */}
        <div
          className="group relative col-span-1 overflow-hidden rounded-2xl bg-[#F8F9FA] p-6 transition-all duration-300 hover:shadow-lg md:col-span-2 lg:col-span-2 lg:p-12"
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex h-full flex-row">
            <div className="mb-2 flex w-full flex-col items-start justify-start">
              <Typography
                variant="advert-2"
                className="max-w-md text-[40px] font-bold transition-transform duration-300 group-hover:translate-y-[-5px]"
              >
                {ads[1].title}
              </Typography>
              <Typography
                variant="advert-subtitle-1"
                className="mt-2 max-w-[50%] leading-[-0.05em] transition-transform duration-300 group-hover:translate-y-[-5px]"
              >
                {ads[1].description}
              </Typography>
            </div>
            <div className="relative flex h-full w-full flex-col items-end justify-between">
              <div className="transition-all duration-300 ease-in-out">
                <Button
                  variant="primary"
                  label={ads[1].ctaText}
                  className={cn(
                    'mb-4 w-fit transition-all duration-300',
                    hoveredCard === 2 ? 'scale-110' : ''
                  )}
                  Icon={() => <ArrowRightIcon />}
                  iconPosition="right"
                />
              </div>
              <div className="absolute bottom-[5%] right-[5%] h-[200px] w-full min-w-[300px] overflow-hidden rounded-lg">
                <Image
                  src={ads[1].image}
                  alt={ads[1].title}
                  fill
                  className="rounded-lg object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-transparent transition-all duration-500 group-hover:from-transparent group-hover:to-black/5" />
        </div>

        {/* Terceiro Card - Férias de Julho */}
        <div
          className="group relative col-span-1 overflow-hidden rounded-2xl bg-[#F8F9FA] p-6 transition-all duration-300 hover:shadow-lg md:col-span-1 lg:col-span-2 lg:p-12"
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <Typography
            variant="advert-3"
            className="z-10 mb-2 max-w-[60%] transition-transform duration-300 group-hover:translate-y-[-5px]"
          >
            {ads[2].title}
          </Typography>
          <div className="absolute right-[10%] top-[37%] h-full max-h-[220px] w-[55%] overflow-hidden">
            <Image
              src={ads[2].image}
              alt={ads[2].title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
          <div className="z-10 ml-6 mt-[100px] w-fit transition-all duration-300 ease-in-out">
            <Button
              variant="primary"
              label={ads[2].ctaText}
              className={cn(
                'transition-all duration-300',
                hoveredCard === 3 ? 'scale-110' : ''
              )}
              Icon={() => <ArrowRightIcon />}
              iconPosition="right"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-transparent transition-all duration-500 group-hover:from-transparent group-hover:to-black/5" />
        </div>

        {/* Quarto Card - 30% OFF Voos */}
        <div
          className="group relative col-span-1 overflow-hidden rounded-2xl bg-[#F8F9FA] p-6 transition-all duration-300 hover:shadow-lg md:col-span-1 lg:col-span-2 lg:p-12"
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative z-10 ml-auto flex max-w-[60%] flex-col items-end justify-around text-right">
            <Typography
              variant="advert-4"
              className="transition-transform duration-300 group-hover:translate-y-[-5px]"
            >
              {ads[3].title}
            </Typography>
            <Typography
              variant="advert-subtitle-2"
              className="mt-6 max-w-[50%] transition-transform duration-300 group-hover:translate-y-[-5px]"
            >
              {ads[3].description}
            </Typography>
            <div className="mt-6 transition-all duration-300 ease-in-out">
              <Button
                variant="primary"
                label={ads[3].ctaText}
                className={cn(
                  'transition-all duration-300',
                  hoveredCard === 4 ? 'scale-110' : ''
                )}
                Icon={() => <ArrowRightIcon />}
                iconPosition="right"
              />
            </div>
          </div>
          <Typography
            variant="advert-subtitle-3"
            className="relative z-10 mt-14 text-start"
          >
            Campanha válida de 01 a 30/04/2024. Consulte o regulamento. Sujeito
            a disponibilidade, taxas não inclusas. Imagens ilustrativas
          </Typography>
          <div className="absolute left-[3%] top-[29%] h-full max-h-[240px] w-full max-w-[450px] overflow-hidden">
            <Image
              src={ads[3].image}
              alt={ads[3].title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-transparent transition-all duration-500 group-hover:from-transparent group-hover:to-black/5" />
        </div>
      </BentoGrid>
    </div>
  )
}

export default BentoOffers
