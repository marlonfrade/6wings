'use client'

import { useState } from 'react'
import { DateRangePicker } from '@/components/travel/dateRangePicker'
import { DateRange as DayPickerRange } from 'react-day-picker'

type AccommodationType = 'hotel' | 'pousada' | 'resort' | 'apartamento'

interface SearchAccommodationState {
  accommodationType: AccommodationType
  destination: string
  dateRange: DayPickerRange | undefined
}

const SearchAccommodation = () => {
  const [searchState, setSearchState] = useState<SearchAccommodationState>({
    accommodationType: 'hotel',
    destination: '',
    dateRange: undefined
  })

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState((prev) => ({ ...prev, destination: e.target.value }))
  }

  const handleAccommodationTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchState((prev) => ({
      ...prev,
      accommodationType: e.target.value as AccommodationType
    }))
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-0">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-[#363C41] lg:mb-4">
        Encontre <span className="text-[#9B297D]">hospedagens</span> em todo o
        mundo
      </h1>

      <div className="relative flex w-full max-w-5xl flex-col items-center rounded-2xl border border-[#E2E2E2] p-6 md:p-20">
        {/* Accommodation Type Select */}
        <select
          value={searchState.accommodationType}
          onChange={handleAccommodationTypeChange}
          className="absolute left-6 top-6 border-b border-[#363C41] bg-transparent px-2 py-1 font-montserrat text-base focus:border-[#9B297D] focus:outline-none"
        >
          <option value="hotel">Hotel</option>
          <option value="pousada">Pousada</option>
          <option value="resort">Resort</option>
          <option value="apartamento">Apartamento</option>
        </select>

        <div className="mb-6 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          {/* Destination Input */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={searchState.destination}
              onChange={handleDestinationChange}
              placeholder="Para onde você vai?"
              className="w-full rounded-lg border border-gray-300 p-3 transition-colors duration-200 focus:border-[#9B297D] focus:outline-none"
            />
          </div>

          {/* Date Range Picker */}
          <div className="w-full md:w-2/3">
            <DateRangePicker
              selected={searchState.dateRange}
              onChange={(range) =>
                setSearchState((prev) => ({ ...prev, dateRange: range }))
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          className="mt-4 rounded-lg bg-[#9B297D] px-8 py-3 text-white transition-opacity hover:opacity-90 focus:outline-none"
          onClick={() => {
            // Handle search logic here
            console.log('Search state:', searchState)
          }}
        >
          Buscar Hospedagens
        </button>
      </div>
    </div>
  )
}

export default SearchAccommodation
