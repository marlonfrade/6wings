'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import AirportSelect from '@/components/search/airportSelect'
import { DateRangePicker } from '@/components/search/DateRangePicker'
import { Airport } from '@/types/airport'

const travelOptions = [
  { label: 'Ida e volta', value: 'roundTrip' },
  { label: 'Somente ida', value: 'oneWay' }
] as const

export default function AirTravel() {
  const router = useRouter()
  const [tripType, setTripType] = useState<'roundTrip' | 'oneWay'>('roundTrip')
  const [dateRange, setDateRange] = useState<DateRange>()
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(null)
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null)

  const handleTripTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTripType = event.target.value as 'roundTrip' | 'oneWay'
    setTripType(selectedTripType)
    if (selectedTripType === 'oneWay') {
      setDateRange(dateRange?.from ? { from: dateRange.from } : undefined)
    }
  }

  const handleAirportChange =
    (setter: (airport: Airport | null) => void) =>
    (airport: Airport | null) => {
      setter(airport)
    }

  const handleSearch = async () => {
    if (!departureAirport || !arrivalAirport || !dateRange?.from) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    const toastId = toast.loading('Criando cotação...')

    try {
      const quotationData = {
        saida: departureAirport.id.toString(),
        chegada: arrivalAirport.id.toString(),
        data_saida: dateRange.from.toISOString().split('T')[0],
        data_retorno:
          tripType === 'roundTrip' && dateRange.to
            ? dateRange.to.toISOString().split('T')[0]
            : null,
        ida_e_volta: tripType === 'roundTrip' ? 'S' : 'N'
      }

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quotationData)
      })

      if (!response.ok) {
        throw new Error('Failed to create quotation')
      }

      toast.success('Cotação criada com sucesso!', { id: toastId })
      router.push('/quotation/thank-you')
    } catch (error) {
      console.error('Error creating quotation:', error)
      toast.error('Erro ao criar cotação', { id: toastId })
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-0">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-[#363C41] lg:mb-4">
        Encontre <span className="text-[#9B297D]">voos baratos</span> para
        qualquer lugar
      </h1>
      <div className="relative flex w-full max-w-5xl flex-col items-center rounded-2xl border border-[#E2E2E2] p-20">
        <select
          value={tripType}
          onChange={handleTripTypeChange}
          className="font-montserrat absolute left-6 top-6 border-b border-[#363C41] bg-transparent px-2 text-base"
        >
          {travelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="mb-6 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <AirportSelect
            label="De"
            value={departureAirport}
            onChange={handleAirportChange(setDepartureAirport)}
            placeholder="Cidade ou aeroporto de origem"
          />
          <AirportSelect
            label="Para"
            value={arrivalAirport}
            onChange={handleAirportChange(setArrivalAirport)}
            placeholder="Cidade ou aeroporto de destino"
          />
          <DateRangePicker
            tripType={tripType}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>

        <button
          onClick={handleSearch}
          className="absolute bottom-[-20px] left-1/2 flex -translate-x-1/2 transform cursor-pointer items-center justify-center rounded-full border-none bg-[#9B297D] px-5 py-2.5 text-base font-semibold text-white"
        >
          Explore
          <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-white">
            <Search />
          </span>
        </button>
      </div>
    </div>
  )
}
