import { useState } from 'react'
import { LocationInput, Location } from '@/components/travel/locationInput'
import { DateRangePicker } from '@/components/travel/dateRangePicker'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface SearchBusesProps {
  onSearch?: (searchParams: BusSearchParams) => void
  className?: string
}

interface BusSearchParams {
  origin: string
  destination: string
  departureDate: Date
  returnDate?: Date
  passengers: number
}

export default function SearchBuses({ onSearch, className }: SearchBusesProps) {
  const [origin, setOrigin] = useState<Location | null>(null)
  const [destination, setDestination] = useState<Location | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  })
  const [passengers, setPassengers] = useState<string>('1')

  const handleSearch = () => {
    if (!origin || !destination || !dateRange.from) return

    const searchParams: BusSearchParams = {
      origin: origin.name,
      destination: destination.name,
      departureDate: dateRange.from,
      returnDate: dateRange.to,
      passengers: parseInt(passengers)
    }

    onSearch?.(searchParams)
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range || { from: undefined, to: undefined })
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LocationInput
            label="From"
            placeholder="Enter departure city"
            value={origin}
            onChange={setOrigin}
          />
          <LocationInput
            label="To"
            placeholder="Enter destination city"
            value={destination}
            onChange={setDestination}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DateRangePicker
            selected={dateRange}
            onChange={handleDateRangeChange}
            className="w-full"
          />

          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger>
              <SelectValue placeholder="Number of passengers" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleSearch}
          disabled={!origin || !destination || !dateRange.from}
        >
          Search Buses
        </Button>
      </div>
    </Card>
  )
}
