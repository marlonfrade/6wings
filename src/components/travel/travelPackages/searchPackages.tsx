'use client'

import { useState } from 'react'
import { Search, User } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import AirportSelect from '@/components/travel/airportSelect'
import { DateRangePicker } from '@/components/travel/dateRangePicker'
import { AirportResponse } from '@/types/airport'
import { TravelPackagesType } from './travelPackagesType'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const passengerOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' }
] as const

export default function SearchPackages() {
  const t = useTranslations('homepage.travel.search.travelPackages')
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange>()
  const [packageType, setPackageType] = useState<string>('all-inclusive')
  const [passengers, setPassengers] = useState('1')
  const [departureAirport, setDepartureAirport] =
    useState<AirportResponse | null>(null)
  const [arrivalAirport, setArrivalAirport] = useState<AirportResponse | null>(
    null
  )

  const handleAirportChange =
    (setter: (airport: AirportResponse | null) => void) =>
    (airport: AirportResponse | null) => {
      setter(airport)
    }

  const handleSearch = async () => {
    if (!departureAirport || !arrivalAirport || !dateRange?.from) {
      toast.error(t('search-error-required'))
      return
    }

    const toastId = toast.loading(t('search-loading'))

    try {
      const quotationData = {
        saida: departureAirport.id.toString(),
        chegada: arrivalAirport.id.toString(),
        data_saida: dateRange.from.toISOString().split('T')[0],
        data_retorno: dateRange.to?.toISOString().split('T')[0],
        tipo_pacote: packageType,
        passageiros: parseInt(passengers)
      }

      const response = await fetch('/api/packages/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quotationData)
      })

      if (!response.ok) {
        throw new Error(t('search-error'))
      }

      toast.success(t('search-success'), { id: toastId })
      router.push('/quotation/thank-you')
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

      <div className="relative flex w-full max-w-7xl flex-col items-center rounded-2xl border border-[#E2E2E2] px-20 py-[80px]">
        <div className="absolute left-[10%] top-4 flex items-center gap-4">
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

        <div className="mb-6 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <AirportSelect
            value={departureAirport}
            onChange={handleAirportChange(setDepartureAirport)}
            placeholder={t('placeholder-origin')}
            type="departure"
          />
          <AirportSelect
            value={arrivalAirport}
            onChange={handleAirportChange(setArrivalAirport)}
            placeholder={t('placeholder-destination')}
            type="arrival"
          />
          <DateRangePicker
            selected={dateRange}
            onChange={setDateRange}
            className="max-w-[300px]"
          />
        </div>

        <div className="mb-6 w-full">
          <TravelPackagesType
            onSelectPackage={setPackageType}
            selectedPackage={packageType}
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
