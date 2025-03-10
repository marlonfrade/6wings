'use client'

import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/typography'

const QuickPromotionsSkeleton = () => {
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
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="relative left-[-1rem]">
          <div className="ml-8 flex space-x-4 overflow-hidden 2xl:ml-[max(8rem,calc(50vw-700px+1rem))]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="pl-4 md:max-w-[452px]">
                <div className="flex h-full flex-col space-y-4">
                  <Skeleton className="aspect-[4/3] h-[280px] w-full rounded-xl" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="mt-2 flex items-center space-x-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                  <div className="absolute right-6 top-4">
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                  <div className="mt-auto flex items-center">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="ml-2 h-6 w-6 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickPromotionsSkeleton
