'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import LocationSelect from '@/components/travel/locationSelect'
import { DateRangePicker } from '@/components/travel/dateRangePicker'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface PassengerCount {
  adults: number
  children: number
  infants: number
}

interface Location {
  estado: {
    id: number
    estado: string
    uf: string
  } | null
  cidade: {
    id: number
    cidade: string
    estado: string
    estado_id: string
  } | null
}

export default function SearchCruises() {
  const t = useTranslations('homepage.travel.search.cruises')
  const router = useRouter()
  const [location, setLocation] = useState<Location>({
    estado: null,
    cidade: null
  })
  const [dateRange, setDateRange] = useState<DateRange>()
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0
  })

  const handlePassengerChange = (type: keyof PassengerCount, value: number) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, value)
    }))
  }

  const handleSearch = async () => {
    if (!location.estado || !location.cidade || !dateRange?.from) {
      toast.error(t('search-error-required'))
      return
    }

    const toastId = toast.loading(t('search-loading'))

    try {
      const searchParams = new URLSearchParams({
        location: location.cidade.id.toString(),
        startDate: dateRange.from.toISOString(),
        ...(dateRange.to && { endDate: dateRange.to.toISOString() }),
        passengers: JSON.stringify(passengers)
      })

      const response = await fetch('/api/cruises/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location,
          dateRange,
          passengers
        })
      })

      if (!response.ok) {
        throw new Error(t('search-error'))
      }

      toast.success(t('search-success'), { id: toastId })
      router.push(`/travel/cruises/search?${searchParams.toString()}`)
    } catch (error) {
      console.error(t('search-error'), error)
      toast.error(t('search-error'), { id: toastId })
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-0">
      <h2 className="mb-6 text-center font-prompt text-3xl font-black text-[#363C41] lg:mb-4">
        {t.rich('title', {
          highlight: (chunks) => <span className="text-primary">{chunks}</span>
        })}
      </h2>

      <div className="relative flex w-full max-w-5xl flex-col items-center rounded-2xl border border-[#E2E2E2] px-20 py-[80px]">
        <div className="absolute left-[10%] top-4 flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-4">
                  {Object.entries(passengers).map(([type, count]) => (
                    <div key={type} className="flex items-center gap-2">
                      <span className="text-sm font-medium capitalize text-muted-foreground">
                        {type}
                      </span>
                      <button
                        onClick={() =>
                          handlePassengerChange(
                            type as keyof PassengerCount,
                            count - 1
                          )
                        }
                        className="rounded border px-2 py-1 text-sm hover:bg-accent"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">{count}</span>
                      <button
                        onClick={() =>
                          handlePassengerChange(
                            type as keyof PassengerCount,
                            count + 1
                          )
                        }
                        className="rounded border px-2 py-1 text-sm hover:bg-accent"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-montserrat text-sm text-white">
                  {t('select-passengers')}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="mb-6 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <LocationSelect value={location} onChange={setLocation} />
          <DateRangePicker
            selected={dateRange}
            onChange={setDateRange}
            className="w-full md:max-w-[300px]"
          />
        </div>

        <button
          onClick={handleSearch}
          className="absolute bottom-[-20px] left-1/2 flex min-w-[138px] -translate-x-1/2 transform cursor-pointer items-center justify-center gap-10 rounded-full border-none bg-[#9B297D] px-[24px] py-[16px] font-montserrat text-base font-medium text-white"
        >
          {t('search-button')}
          <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-white">
            <Search />
          </span>
        </button>
      </div>
    </div>
  )
}
