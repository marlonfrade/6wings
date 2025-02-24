import { useState } from 'react'
import { LocationInput, Location } from '@/components/travel/locationInput'
import { DateRangePicker } from '../dateRangePicker'
import { DateRange } from 'react-day-picker'
import { useRouter } from 'next/navigation'

interface PassengerCount {
  adults: number
  children: number
  infants: number
}

export default function SearchCruises() {
  const router = useRouter()

  const [departurePort, setDeparturePort] = useState<Location | null>(null)
  const [destinations, setDestinations] = useState<Location[]>([])
  const [dateRange, setDateRange] = useState<DateRange>()
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0
  })

  const handlePassengerChange = (type: keyof PassengerCount, value: number) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, value) // Ensure value doesn't go below 0
    }))
  }

  const handleSearch = async () => {
    try {
      if (!departurePort || !dateRange) {
        throw new Error('Please fill in all required fields')
      }

      const params = new URLSearchParams()

      params.set('departurePort', departurePort.name)
      params.set('destinations', destinations.map((d) => d.name).join(','))
      if (dateRange.from) params.set('startDate', dateRange.from.toISOString())
      if (dateRange.to) params.set('endDate', dateRange.to.toISOString())
      params.set('passengers', JSON.stringify(passengers))

      router.push(`/cruises/search-results?${params.toString()}`)
    } catch (error) {
      console.error('Search error:', error)
      // Handle error state here
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Find Your Perfect Cruise</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Departure Port
          </label>
          <LocationInput
            label="Departure Port"
            value={departurePort}
            onChange={(location: Location | null) => setDeparturePort(location)}
            placeholder="Select departure port"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Destinations</label>
          <LocationInput
            label="Destinations"
            value={destinations[0] || null}
            onChange={(location: Location | null) => {
              if (location) setDestinations([...destinations, location])
            }}
            placeholder="Add destinations (optional)"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Travel Dates</label>
          <DateRangePicker
            selected={dateRange}
            onChange={(range: DateRange | undefined) => setDateRange(range)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Passengers</label>
          <div className="flex space-x-4">
            {Object.entries(passengers).map(([type, count]) => (
              <div key={type} className="flex items-center space-x-2">
                <span className="capitalize">{type}</span>
                <button
                  onClick={() =>
                    handlePassengerChange(
                      type as keyof PassengerCount,
                      count - 1
                    )
                  }
                  className="rounded border px-2 py-1"
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  onClick={() =>
                    handlePassengerChange(
                      type as keyof PassengerCount,
                      count + 1
                    )
                  }
                  className="rounded border px-2 py-1"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full rounded-lg bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Search Cruises
        </button>
      </div>
    </div>
  )
}
