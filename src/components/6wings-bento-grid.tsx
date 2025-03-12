'use client'

import { Gem, Share2Icon, Navigation, Globe as GlobeIcon } from 'lucide-react'

import { AnimatedBeamDemo } from '@/components/ui/magicui/animated-beam-demo'
import { AnimatedListDemo } from '@/components/ui/magicui/animated-listed-demo'
import { BentoCard, BentoGrid } from '@/components/ui/magicui/bento-grid'
import { Marquee } from '@/components/ui/magicui/marquee'
import { Globe } from '@/components/ui/magicui/globe'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

const files = [
  {
    name: 'card-1.background-card-1.title',
    body: 'card-1.background-card-1.description'
  },
  {
    name: 'card-1.background-card-2.title',
    body: 'card-1.background-card-2.description'
  },
  {
    name: 'card-1.background-card-3.title',
    body: 'card-1.background-card-3.description'
  },
  {
    name: 'card-1.background-card-4.title',
    body: 'card-1.background-card-4.description'
  },
  {
    name: 'card-1.background-card-5.title',
    body: 'card-1.background-card-5.description'
  }
]

export function SixWingsBentoGrid() {
  const t = useTranslations('homepage.bento-grid')

  const features = [
    {
      Icon: Navigation,
      name: 'card-1.title',
      description: 'card-1.description',
      href: '#',
      cta: 'card-1.cta',
      className: 'col-span-3 lg:col-span-2',
      background: (
        <Marquee
          pauseOnHover
          className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_2%,#000_100%)]"
        >
          {files.map((f, idx) => {
            return (
              <figure
                key={idx}
                className={cn(
                  'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
                  'border-gray-950/[.1] bg-primary/[.01] hover:bg-primary/[.05]',
                  'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
                  'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium text-primary dark:text-white">
                      {t(f.name)}
                    </figcaption>
                  </div>
                </div>
                <blockquote className="mt-2 text-xs">
                  {t.rich(f.body, {
                    highlight: (chunks) => (
                      <span className="text-primary">{chunks}</span>
                    )
                  })}
                </blockquote>
              </figure>
            )
          })}
        </Marquee>
      )
    },
    {
      Icon: Gem,
      name: 'card-2.title',
      description: 'card-2.description',
      href: '#',
      cta: 'card-2.cta',
      className: 'col-span-3 lg:col-span-1',
      background: (
        <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
      )
    },
    {
      Icon: Share2Icon,
      name: 'card-3.title',
      description: 'card-3.description',
      href: '#',
      cta: 'card-3.cta',
      className: 'col-span-3 lg:col-span-2',
      background: (
        <AnimatedBeamDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_1%,#000_100%)] group-hover:scale-105" />
      )
    },
    {
      Icon: GlobeIcon,
      name: 'card-4.title',
      description: 'card-4.description',
      className: 'col-span-3 lg:col-span-1',
      href: '#',
      cta: 'card-4.cta',
      background: (
        <div className="absolute inset-0 overflow-hidden">
          <Globe className="transition-all duration-500 ease-out group-hover:scale-105" />
        </div>
      )
    }
  ]

  return (
    <BentoGrid className="max-w-screen-xl lg:my-20 lg:mb-40">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}
