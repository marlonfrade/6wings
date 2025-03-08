'use client'

import { Suspense } from 'react'
import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { AssistantModal } from '@/components/assistant-ui/assistant-modal'
import { Navbar } from '@/components/navbar'
import Carousel from '@/components/carousel'
import Backdrop from '@/components/backdrop'
import { TravelNavigation } from '@/components/travel/travelNavigation'
import { ProductsShowcase } from '@/components/products-showcase'
import slides from '@/data/slides'

export default function Home() {
  const runtime = useChatRuntime({
    api: '/api/chat'
  })

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

                <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
                  <AssistantModal />
                </div>
              </div>
            </div>
          </div>
        </main>
      </Suspense>
    </AssistantRuntimeProvider>
  )
}
