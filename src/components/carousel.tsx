'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Typography from '@/components/typography'
import { Button } from '@/components/button'
import { ArrowRight, Play, Pause } from 'lucide-react'

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

const Carousel = ({ slides, autoPlayInterval = 4000 }: CarouselProps) => {
  const t = useTranslations()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

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
        stopOnFocusIn: true,
        playOnInit: true,
        stopOnLastSnap: false,
        jump: false,
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

  const toggleAutoplay = useCallback(() => {
    if (!emblaApi) return

    const autoplay = emblaApi.plugins().autoplay
    const newPlayingState = !autoplay.isPlaying()

    if (newPlayingState === isPlaying) return

    if (newPlayingState) {
      autoplay.play()
    } else {
      autoplay.stop()
    }

    setIsPlaying(newPlayingState)
  }, [emblaApi, isPlaying])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    // Initial call to set selected index
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  // Modifique o useEffect do mouse enter/leave para evitar conflitos
  useEffect(() => {
    if (!emblaApi) return

    const autoplay = emblaApi.plugins().autoplay
    const rootNode = emblaApi.rootNode()

    const handleMouseEnter = () => {
      if (autoplay.isPlaying()) {
        autoplay.stop()
        setIsPlaying(false)
      }
    }

    const handleMouseLeave = () => {
      if (!autoplay.isPlaying() && isPlaying) {
        autoplay.play()
      }
    }

    rootNode.addEventListener('mouseenter', handleMouseEnter)
    rootNode.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      rootNode.removeEventListener('mouseenter', handleMouseEnter)
      rootNode.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [emblaApi, isPlaying])

  // Cleanup autoplay on unmount
  useEffect(() => {
    return () => {
      if (emblaApi) {
        const autoplay = emblaApi.plugins().autoplay
        autoplay.stop()
      }
    }
  }, [emblaApi])

  const PlayPauseButton = () => (
    <button
      className="absolute bottom-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:scale-105 hover:bg-white hover:shadow-lg"
      onClick={toggleAutoplay}
      aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
    >
      {isPlaying ? (
        <Pause className="h-5 w-5 text-primary" />
      ) : (
        <Play className="h-5 w-5 text-primary" />
      )}
    </button>
  )

  return (
    <div className="relative flex h-[680px] w-full items-center justify-center rounded-lg px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
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
                  <div className="flex max-w-[700px] flex-col lg:block">
                    {slide.title && (
                      <Typography variant="h1" className="text-white">
                        {t(slide.title)}
                      </Typography>
                    )}
                    {slide.highlight && (
                      <span className="font-prompt relative z-[1] mt-4 inline-flex w-fit transform items-center justify-center rounded-[20px] bg-primary px-6 py-4 text-2xl font-extrabold leading-[125%] tracking-[-1.48px] text-white lg:absolute lg:left-[60%] lg:top-[22%] lg:mt-0 lg:-rotate-6 lg:text-[65px]">
                        {t(slide.highlight)}
                      </span>
                    )}
                  </div>
                  {slide.description && (
                    <Typography
                      variant="body2"
                      className="mt-6 max-w-[380px] font-extrabold leading-[130%] text-white"
                    >
                      {t(slide.description)}.
                    </Typography>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <Button
                      label={t(slide.ctaText)}
                      Icon={() => (
                        <ArrowRight width="20px" height="20px" color="#ffff" />
                      )}
                      iconPosition="right"
                      variant="primary"
                      className="mt-16 border-white text-lg text-white sm:mt-[70px]"
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

      {/* Replace the old play/pause button with the new component */}
      <PlayPauseButton />

      {/* Add dots navigation below the carousel */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === selectedIndex
                ? 'w-6 bg-primary'
                : 'bg-white hover:bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
