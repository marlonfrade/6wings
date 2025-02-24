'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { DateRangePicker } from '@/components/travel/dateRangePicker'
import type { CarType, DateRange } from '@/types/travel'

const CAR_TYPES: CarType[] = [
  { label: 'Econômico', value: 'economic' },
  { label: 'Intermediário', value: 'intermediate' },
  { label: 'SUV', value: 'suv' },
  { label: 'Luxo', value: 'luxury' }
] as const

interface SearchFormData {
  pickupLocation: string
  dropoffLocation: string
  pickupDate: DateRange | undefined
  returnDate: Date | null
  carType: string
}

const SearchCarRentals = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: undefined,
    returnDate: null,
    carType: 'economic'
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search params:', formData)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-0">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-[#363C41] lg:mb-4">
        Alugue <span className="text-[#9B297D]">carros</span> em qualquer lugar
        do mundo
      </h1>

      <div className="relative flex w-full max-w-5xl flex-col items-center rounded-2xl border border-[#E2E2E2] p-20">
        <select
          name="carType"
          value={formData.carType}
          onChange={handleInputChange}
          className="absolute left-6 top-6 border-b border-[#363C41] bg-transparent px-2 font-montserrat text-base"
        >
          {CAR_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <div className="mb-6 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              placeholder="Local de retirada"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#9B297D] focus:outline-none"
            />
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleInputChange}
              placeholder="Local de devolução"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#9B297D] focus:outline-none"
            />
          </div>

          <div className="w-full md:w-1/3">
            <DateRangePicker
              selected={formData.pickupDate}
              onChange={(range) =>
                setFormData((prev) => ({ ...prev, pickupDate: range }))
              }
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="absolute bottom-[-20px] left-1/2 flex -translate-x-1/2 transform cursor-pointer items-center justify-center rounded-full border-none bg-[#9B297D] px-5 py-2.5 text-base font-semibold text-white"
        >
          Buscar
          <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-white">
            <Search />
          </span>
        </button>
      </div>
    </div>
  )
}

export default SearchCarRentals
