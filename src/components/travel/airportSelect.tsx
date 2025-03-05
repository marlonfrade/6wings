'use client'

import * as React from 'react'
import { Check, Loader2, PlaneTakeoff, PlaneLanding } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useQuery } from '@tanstack/react-query'
import { AirportResponse } from '@/types/airport'

// Custom CommandLoading component since it's not exported from command.tsx
const CommandLoading = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-6 text-center text-sm">{children}</div>
}

interface AirportSelectProps {
  value: AirportResponse | null
  onChange: (airport: AirportResponse | null) => void
  placeholder?: string
  type?: 'departure' | 'arrival'
}

export default function AirportSelect({
  value,
  onChange,
  placeholder = 'Select airport...',
  type = 'departure'
}: AirportSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [isInitialSearch, setIsInitialSearch] = React.useState(true)

  // Debounce search input with React's useMemo
  const debouncedSearch = React.useMemo(() => {
    const setSearchWithDelay = (value: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      searchTimeoutRef.current = setTimeout(() => {
        setDebouncedQuery(value)
      }, 300)
    }
    return setSearchWithDelay
  }, [])

  const [debouncedQuery, setDebouncedQuery] = React.useState('')
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  const {
    data: airports = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['airports', debouncedQuery, isInitialSearch],
    queryFn: async () => {
      // Allow empty query to fetch all airports or queries with at least 2 characters
      if (debouncedQuery.length > 0 && debouncedQuery.length < 2) return []

      try {
        // Use both query and q parameters to ensure compatibility
        const queryParam = debouncedQuery
          ? `query=${encodeURIComponent(debouncedQuery)}&q=${encodeURIComponent(debouncedQuery)}`
          : ''

        // Add limit parameter for initial search
        const limitParam = isInitialSearch ? 'limit=10' : ''

        // Combine parameters
        const params = [queryParam, limitParam].filter(Boolean).join('&')

        const response = await fetch(
          `/api/airports${params ? `?${params}` : ''}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch airports: ${response.status}`)
        }

        const data = await response.json()

        // Log the received data for debugging
        console.log('Received airport data:', data)

        // Handle both array format and the format you provided in your example
        if (Array.isArray(data)) {
          return data
        } else if (data && typeof data === 'object') {
          return Object.values(data)
        }

        return []
      } catch (error) {
        console.error('Error fetching airports:', error)
        throw error
      }
    },
    enabled: open,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })

  // Log airports data for debugging
  React.useEffect(() => {
    console.log('Current airports data:', airports)
  }, [airports])

  // Group airports by city
  const groupedAirports = React.useMemo(() => {
    if (!airports || !Array.isArray(airports) || airports.length === 0) {
      console.log('No airports to group or invalid format')
      return []
    }

    const groups: Record<string, AirportResponse[]> = {}

    airports.forEach((airport) => {
      if (!airport || typeof airport !== 'object' || !airport.cidade) {
        console.warn('Invalid airport object:', airport)
        return
      }

      const city = airport.cidade
      if (!groups[city]) {
        groups[city] = []
      }
      groups[city].push(airport)
    })

    return Object.entries(groups).map(([city, airports]) => ({
      city,
      airports
    }))
  }, [airports])

  // Trigger a fetch when the popover opens
  React.useEffect(() => {
    if (open) {
      // Force a refetch when the popover opens
      setDebouncedQuery(debouncedQuery)
    }
  }, [open, debouncedQuery])

  // Reset initial search flag when query changes
  React.useEffect(() => {
    if (debouncedQuery) {
      setIsInitialSearch(false)
    } else {
      setIsInitialSearch(true)
    }
  }, [debouncedQuery])

  return (
    <Popover
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[53px] w-full max-w-[223px] justify-between border border-secondary transition-all duration-300 hover:border-primary hover:bg-primary/10"
          aria-label="Select airport"
        >
          {isLoading && value ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : value ? (
            `${value.code || value.cidade.substring(0, 15)}`
          ) : (
            placeholder
          )}
          {type === 'departure' ? (
            <PlaneTakeoff className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <PlaneLanding className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[223px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search airport or city..."
            value={query}
            onValueChange={(value) => {
              setQuery(value)
              debouncedSearch(value)
            }}
            className="h-9"
          />
          <CommandList>
            {isLoading ? (
              <CommandLoading>
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Loading airports...</span>
                </div>
              </CommandLoading>
            ) : error ? (
              <CommandEmpty>
                Error loading airports. Please try again.
              </CommandEmpty>
            ) : debouncedQuery.length > 0 && debouncedQuery.length < 2 ? (
              <CommandEmpty>Type at least 2 characters to search</CommandEmpty>
            ) : airports.length === 0 ? (
              <CommandEmpty>No airports found.</CommandEmpty>
            ) : groupedAirports.length === 0 ? (
              // Fallback if grouping fails - display flat list
              <CommandGroup>
                {airports.map((airport: AirportResponse) => (
                  <CommandItem
                    key={airport.id}
                    value={airport.code}
                    onSelect={() => {
                      onChange(airport)
                      setOpen(false)
                      setQuery('')
                    }}
                  >
                    {airport.cidade} - {airport.name} ({airport.code})
                    <Check
                      className={cn(
                        'ml-auto',
                        value?.code === airport.code
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              groupedAirports.map((cityGroup) => (
                <CommandGroup key={cityGroup.city} heading={cityGroup.city}>
                  {cityGroup.airports.map(
                    (airport) => (
                      console.log(airport),
                      (
                        <CommandItem
                          key={airport.id}
                          value={airport.code}
                          onSelect={() => {
                            onChange(airport)
                            setOpen(false)
                            setQuery('')
                          }}
                        >
                          {airport.name} ({airport.code})
                          <Check
                            className={cn(
                              'ml-auto',
                              value?.code === airport.code
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      )
                    )
                  )}
                </CommandGroup>
              ))
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
