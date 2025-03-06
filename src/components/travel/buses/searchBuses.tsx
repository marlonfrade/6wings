'use client'

import { useState } from 'react'
import { Search, User } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import LocationSelect from '@/components/travel/locationSelect'
import { DateRangePicker } from '@/components/travel/dateRangePicker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

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

const passengerOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' }
] as const

export default function SearchBuses() {
  const t = useTranslations('homepage.travel.search.buses')
  const router = useRouter()
  const [passengers, setPassengers] = useState('1')
  const [dateRange, setDateRange] = useState<DateRange>()
  const [origin, setOrigin] = useState<Location>({
    estado: null,
    cidade: null
  })
  const [destination, setDestination] = useState<Location>({
    estado: null,
    cidade: null
  })

  const handleSearch = async () => {
    if (
      !origin.estado ||
      !origin.cidade ||
      !destination.estado ||
      !destination.cidade ||
      !dateRange?.from
    ) {
      toast.error(t('search-error-required'))
      return
    }

    const toastId = toast.loading(t('search-loading'))

    try {
      const searchParams = new URLSearchParams({
        origin: origin.cidade.id.toString(),
        destination: destination.cidade.id.toString(),
        departureDate: dateRange.from.toISOString(),
        ...(dateRange.to && { returnDate: dateRange.to.toISOString() }),
        passengers
      })

      const response = await fetch('/api/buses/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin,
          destination,
          dateRange,
          passengers: parseInt(passengers)
        })
      })

      if (!response.ok) {
        throw new Error(t('search-error'))
      }

      toast.success(t('search-success'), { id: toastId })
      router.push(`/travel/buses/search?${searchParams.toString()}`)
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
                <div>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="border-b-1 flex w-auto items-center gap-2 rounded-none border-x-0 border-t-0 border-secondary bg-transparent p-0 font-montserrat text-sm font-medium shadow-none hover:bg-transparent focus:ring-0">
                      <User className="h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="min-w-[140px] border border-[#E2E2E2] p-1">
                      {passengerOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer rounded-sm font-montserrat text-sm hover:bg-[#9B297D]/10"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

        <div className="mb-6 flex w-full flex-col items-center justify-center space-y-6">
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-[#363C41]">
                {t('from-placeholder')}
              </h3>
              <LocationSelect
                value={origin}
                onChange={setOrigin}
                placeholder={t('from-placeholder')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-[#363C41]">
                {t('to-placeholder')}
              </h3>
              <LocationSelect
                value={destination}
                onChange={setDestination}
                placeholder={t('to-placeholder')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-[#363C41]">
                {t('date-title')}
              </h3>
              <DateRangePicker
                selected={dateRange}
                onChange={setDateRange}
                className="w-full"
              />
            </div>
          </div>
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
