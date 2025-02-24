import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Users } from 'lucide-react'

interface GuestType {
  adults: number
  children: number
  infants: number
}

interface GuestCounterProps {
  onChange?: (guests: GuestType) => void
  maxGuests?: number
  guests?: GuestType
  className?: string
}

export function GuestsCounter({
  onChange,
  maxGuests = 10,
  guests: initialGuests,
  className
}: GuestCounterProps) {
  const [guests, setGuests] = useState<GuestType>(
    initialGuests || {
      adults: 1,
      children: 0,
      infants: 0
    }
  )

  const totalGuests = guests.adults + guests.children + guests.infants

  const updateGuests = (type: keyof GuestType, increment: boolean) => {
    const newGuests = { ...guests }

    if (increment && totalGuests < maxGuests) {
      newGuests[type] += 1
    } else if (!increment && newGuests[type] > 0) {
      // Ensure at least one adult remains
      if (type === 'adults' && newGuests.adults <= 1) return
      newGuests[type] -= 1
    }

    setGuests(newGuests)
    onChange?.(newGuests)
  }

  const CounterButton = ({
    type,
    label,
    description
  }: {
    type: keyof GuestType
    label: string
    description: string
  }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateGuests(type, false)}
          disabled={type === 'adults' ? guests[type] <= 1 : guests[type] <= 0}
          aria-label={`Decrease ${label}`}
        >
          -
        </Button>
        <span className="w-8 text-center">{guests[type]}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateGuests(type, true)}
          disabled={totalGuests >= maxGuests}
          aria-label={`Increase ${label}`}
        >
          +
        </Button>
      </div>
    </div>
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start gap-2 ${className || ''}`}
          aria-label="Select number of guests"
        >
          <Users className="h-4 w-4" />
          <span>
            {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <CounterButton
            type="adults"
            label="Adults"
            description="Ages 13 or above"
          />
          <CounterButton
            type="children"
            label="Children"
            description="Ages 2-12"
          />
          <CounterButton type="infants" label="Infants" description="Under 2" />
        </div>
      </PopoverContent>
    </Popover>
  )
}
