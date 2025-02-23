'use client'

import React, { useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Typography from '@/components/typography'
import { Button } from '@/components/button'
import { ArrowRight } from 'lucide-react'

interface Slide {
  id: number
  title: string
  highlight?: string
  description: string
  ctaText: string
  ctaLink: string
  image: string
  altText: string
}

interface CarouselProps {
  slides: Slide[]
  autoPlayInterval?: number
}

const Carousel = ({ slides, autoPlayInterval = 5000 }: CarouselProps) => {
  const t = useTranslations()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 20
    },
    [
      Autoplay({
        delay: autoPlayInterval,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement
      })
    ]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      // Reset autoplay timer when manually navigating
      const autoplay = emblaApi.plugins().autoplay
      if (autoplay.isPlaying()) {
        autoplay.reset()
      }
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      // Reset autoplay timer when manually navigating
      const autoplay = emblaApi.plugins().autoplay
      if (autoplay.isPlaying()) {
        autoplay.reset()
      }
    }
  }, [emblaApi])

  // Cleanup autoplay on unmount
  useEffect(() => {
    return () => {
      if (emblaApi) {
        const autoplay = emblaApi.plugins().autoplay
        autoplay.stop()
      }
    }
  }, [emblaApi])

  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-lg px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex h-full w-full flex-[0_0_100%] items-center justify-center"
            >
              <div
                className="flex h-full w-full max-w-[1540px] items-start justify-start rounded-3xl bg-cover bg-center p-5 sm:p-10 md:p-16 lg:p-20 xl:p-[70px_174px]"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="relative">
                  <div className="flex max-w-[500px] flex-col lg:block">
                    {slide.title && (
                      <Typography variant="h1" className="z-1000000">
                        {t(slide.title)}
                      </Typography>
                    )}
                    {slide.highlight && (
                      <span className="left-[46%] top-[38%] z-[1] mt-4 w-full max-w-[70%] transform rounded-[20px] bg-[#9b297d] px-4 py-4 text-center text-2xl font-extrabold leading-[125%] tracking-[-1.48px] text-white lg:absolute lg:mt-0 lg:w-[400px] lg:max-w-[100%] lg:-rotate-6 lg:text-start lg:text-[57px]">
                        {slide.highlight}
                      </span>
                    )}
                  </div>
                  {slide.description && (
                    <Typography
                      variant="body2"
                      className="mt-6 max-w-[380px] text-base font-medium leading-[130%] text-[#363c41]"
                    >
                      {t(slide.description)}
                    </Typography>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <Button
                      label={t(slide.ctaText)}
                      Icon={() => (
                        <ArrowRight
                          width="20px"
                          height="20px"
                          color="#363C41"
                        />
                      )}
                      iconPosition="right"
                      variant="secondary"
                      className="mt-16 sm:mt-[70px]"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-black bg-white p-2 text-black transition-colors hover:border-[#9B297D] hover:bg-[#9B297D] hover:text-white"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <span>&larr;</span>
      </button>
      <button
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-black bg-white p-2 text-black transition-colors hover:border-[#9B297D] hover:bg-[#9B297D] hover:text-white"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <span>&rarr;</span>
      </button>
    </div>
  )
}

export default Carousel
