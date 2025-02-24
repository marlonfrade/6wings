'use client'

import { useState } from 'react'
import { Search, Plane, Building, Car } from 'lucide-react'
import { DateRangePicker } from '@/components/travel/dateRangePicker'
import React from 'react'
import { DateRange } from 'react-day-picker'

interface PackageType {
  label: string
  value: 'complete' | 'flight-hotel' | 'hotel-car'
  icons: React.ReactNode[]
}

const packageTypes: PackageType[] = [
  {
    label: 'Completo (Voo + Hotel + Carro)',
    value: 'complete',
    icons: [
      <Plane key="plane" className="h-6 w-6 text-[#9B297D]" />,
      <Building key="building" className="h-6 w-6 text-[#9B297D]" />,
      <Car key="car" className="h-6 w-6 text-[#9B297D]" />
    ]
  },
  {
    label: 'Voo + Hotel',
    value: 'flight-hotel',
    icons: [
      <Plane key="plane" className="h-6 w-6 text-[#9B297D]" />,
      <Building key="building" className="h-6 w-6 text-[#9B297D]" />
    ]
  },
  {
    label: 'Hotel + Carro',
    value: 'hotel-car',
    icons: [
      <Building key="building" className="h-6 w-6 text-[#9B297D]" />,
      <Car key="car" className="h-6 w-6 text-[#9B297D]" />
    ]
  }
]

const TravelPackages = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [packageType, setPackageType] =
    useState<PackageType['value']>('complete')
  const [origin, setOrigin] = useState<string>('')
  const [destination, setDestination] = useState<string>('')

  const handleSearch = () => {
    // Validate required fields
    if (!origin || !destination || !dateRange) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    // Handle search logic here
    console.log({
      packageType,
      origin,
      destination,
      dateRange
    })
  }

  const selectedPackage = packageTypes.find((pkg) => pkg.value === packageType)

  return (
    <div className="flex w-full flex-col items-center justify-center p-0">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-[#363C41] lg:mb-4">
        Monte seu <span className="text-[#9B297D]">pacote de viagem</span>{' '}
        personalizado
      </h1>

      <div className="relative flex w-full max-w-5xl flex-col items-center rounded-2xl border border-[#E2E2E2] p-20">
        <select
          value={packageType}
          onChange={(e) =>
            setPackageType(e.target.value as PackageType['value'])
          }
          className="absolute left-6 top-6 border-b border-[#363C41] bg-transparent px-2 font-montserrat text-base"
        >
          {packageTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <div className="mb-6 flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Cidade de origem"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#9B297D] focus:outline-none"
            />
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Cidade de destino"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#9B297D] focus:outline-none"
            />
          </div>

          <div className="w-full md:w-1/3">
            <DateRangePicker
              selected={dateRange}
              onChange={(range) => setDateRange(range)}
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-6 flex items-center justify-center space-x-4">
          {selectedPackage?.icons}
        </div>

        <button
          onClick={handleSearch}
          className="absolute bottom-[-20px] left-1/2 flex -translate-x-1/2 transform cursor-pointer items-center justify-center rounded-full border-none bg-[#9B297D] px-5 py-2.5 text-base font-semibold text-white"
        >
          Montar Pacote
          <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-white">
            <Search />
          </span>
        </button>
      </div>
    </div>
  )
}

export default TravelPackages
