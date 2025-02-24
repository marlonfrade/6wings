import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DateRangePicker } from '../dateRangePicker'
import { LocationInput } from '@/components/travel/locationInput'
import { GuestsCounter } from '@/components/travel/guestsCounter'
import type { DateRange } from '@/types/travel'
import type { Location } from '@/components/travel/locationInput'

interface SearchAirbnbProps {
  className?: string
  initialValues?: {
    location?: Location
    dateRange?: DateRange
    guests?: {
      adults: number
      children: number
      infants: number
    }
  }
}

export default function SearchAirbnb({
  className = '',
  initialValues
}: SearchAirbnbProps) {
  const router = useRouter()

  // Initialize state with initial values if provided
  const [location, setLocation] = useState<Location | null>(
    initialValues?.location || null
  )
  const [dateRange, setDateRange] = useState<DateRange>(
    initialValues?.dateRange || {
      from: undefined,
      to: undefined
    }
  )
  const [guests, setGuests] = useState({
    adults: initialValues?.guests?.adults || 1,
    children: initialValues?.guests?.children || 0,
    infants: initialValues?.guests?.infants || 0
  })

  const handleSearch = useCallback(() => {
    if (!location) return

    // Create new URLSearchParams object
    const params = new URLSearchParams()

    // Add search parameters
    params.set('location', location.name)
    if (dateRange.from) params.set('checkIn', dateRange.from.toISOString())
    if (dateRange.to) params.set('checkOut', dateRange.to.toISOString())
    params.set('adults', guests.adults.toString())
    params.set('children', guests.children.toString())
    params.set('infants', guests.infants.toString())

    // Navigate to search page with parameters
    router.push(`/search?${params.toString()}`)
  }, [location, dateRange, guests, router])

  const isSearchDisabled = !location || !dateRange.from || !dateRange.to

  return (
    <div
      className={`flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md ${className}`}
    >
      <LocationInput
        label="Location"
        value={location}
        onChange={setLocation}
        placeholder="Where do you want to stay?"
        className="w-full"
      />

      <DateRangePicker
        selected={dateRange}
        onChange={(range) =>
          setDateRange(range || { from: undefined, to: undefined })
        }
        className="w-full"
      />

      <GuestsCounter guests={guests} onChange={setGuests} className="w-full" />

      <button
        onClick={handleSearch}
        disabled={isSearchDisabled}
        className="bg-airbnb-primary hover:bg-airbnb-primary-dark w-full rounded-lg px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-300"
        aria-label="Search for accommodations"
      >
        Search
      </button>
    </div>
  )
}
