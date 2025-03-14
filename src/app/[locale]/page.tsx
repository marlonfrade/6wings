'use client'

import { Suspense, useState } from 'react'
import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { useTranslations } from 'next-intl'

import { Navbar } from '@/components/navbar'
import Carousel from '@/components/carousel'
import Backdrop from '@/components/backdrop'
import { TravelNavigation } from '@/components/travel/travelNavigation'
import { ProductsShowcase } from '@/components/products-showcase'
import { BannerBancoAfro } from '@/components/banner/bannerBancoAfro'
import { BentoOffers } from '@/components/offers/bentoOffers'
import { VelocityScroll } from '@/components/ui/magicui/scroll-based-velocity'
import { AssistantSection } from '@/components/assistant-ui/assistant-section'
import { AssistantModal } from '@/components/assistant-ui/assistant-modal'
import { QuickPromotionsCarousel } from '@/components/offers/quickPromotionsCarousel'
import { SixWingsBentoGrid } from '@/components/6wings-bento-grid'
import Footer from '@/components/footer'

import slides from '@/data/slides'

export default function Home() {
  const t = useTranslations('homepage')
  const runtime = useChatRuntime({
    api: '/api/chat'
  })

  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [initialQuestion, setInitialQuestion] = useState('')

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Suspense fallback={<Backdrop />}>
        <main>
          <Navbar />
          <div className="relative w-full overflow-x-hidden">
            <div className="transition-all duration-300">
              <div className="mt-20 flex flex-col items-center justify-center px-4 sm:mt-6 sm:px-6 md:mt-40 md:px-8">
                <Carousel slides={slides} />
                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <TravelNavigation initialCategory="flights" />
                </Suspense>

                {/* Seção "O que nós oferecemos?" */}
                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <ProductsShowcase />
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <BannerBancoAfro />
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <BentoOffers />
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <div className="relative w-full overflow-hidden py-24">
                    <VelocityScroll
                      defaultVelocity={3}
                      numRows={2}
                      className="bg-gradient-to-r from-background bg-clip-text text-primary/10"
                    >
                      {t('marquee.text-1')} • {t('marquee.text-2')} •{' '}
                      {t('marquee.text-3')} •
                    </VelocityScroll>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                  </div>
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <QuickPromotionsCarousel />
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <SixWingsBentoGrid />
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  }
                >
                  <AssistantSection
                    isAssistantOpen={isAssistantOpen}
                    setIsAssistantOpen={setIsAssistantOpen}
                    initialQuestion={initialQuestion}
                    setInitialQuestion={setInitialQuestion}
                  />
                </Suspense>
              </div>
              <div className="z-[10000000000000000]">
                <AssistantModal />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </Suspense>
    </AssistantRuntimeProvider>
  )
}
