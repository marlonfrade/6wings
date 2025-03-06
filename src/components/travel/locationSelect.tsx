'use client'

import * as React from 'react'
import { Check, MapPin, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

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

interface State {
  id: number
  estado: string
  uf: string
}

interface City {
  id: number
  cidade: string
  estado: string
  estado_id: string
}

interface LocationSelectProps {
  value: { estado: State | null; cidade: City | null }
  onChange: (location: { estado: State | null; cidade: City | null }) => void
  placeholder?: string
}

export default function LocationSelect({
  value,
  onChange,
  placeholder
}: LocationSelectProps) {
  const t = useTranslations('homepage.travel.search.accommodation')
  const [stateOpen, setStateOpen] = React.useState(false)
  const [cityOpen, setCityOpen] = React.useState(false)

  // Fetch states
  const {
    data: states = [],
    isLoading: isLoadingStates,
    error: statesError
  } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/locations/states')
        if (!response.ok) {
          throw new Error('Failed to fetch states')
        }
        const data = await response.json()
        return data
      } catch (error) {
        console.error('Error fetching states:', error)
        throw error
      }
    },
    enabled: stateOpen,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  // Fetch cities by state
  const {
    data: cities = [],
    isLoading: isLoadingCities,
    error: citiesError
  } = useQuery({
    queryKey: ['cities', value.estado?.id],
    queryFn: async () => {
      if (!value.estado) return []
      try {
        const response = await fetch(`/api/locations/cities/${value.estado.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch cities')
        }
        const data = await response.json()
        return data
      } catch (error) {
        console.error('Error fetching cities:', error)
        throw error
      }
    },
    enabled: !!value.estado && cityOpen,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  const handleStateSelect = (state: State) => {
    onChange({ estado: state, cidade: null })
    setStateOpen(false)
  }

  const handleCitySelect = (city: City) => {
    onChange({ estado: value.estado, cidade: city })
    setCityOpen(false)
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Popover
        open={stateOpen}
        onOpenChange={(newOpen) => {
          setStateOpen(newOpen)
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={stateOpen}
            className="h-[53px] w-full min-w-[250px] justify-between border border-primary bg-transparent shadow-none transition-all duration-300 hover:bg-accent/50"
          >
            <div className="flex w-full flex-col items-start gap-1 text-left">
              <span className="text-xs font-medium text-muted-foreground">
                {t('select-state')}
              </span>
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  {value.estado ? (
                    <span className="font-medium">
                      {value.estado.estado} ({value.estado.uf})
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {placeholder || t('select-state')}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[400px] p-0 shadow-lg"
          align="start"
          sideOffset={8}
        >
          <Command shouldFilter={true} className="rounded-lg">
            <div className="flex items-center border-b px-3 py-4">
              <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
              <CommandInput
                placeholder={t('search-state')}
                className="border-0 outline-none focus:ring-0"
              />
            </div>
            <CommandList className="max-h-[300px] overflow-auto p-2">
              {isLoadingStates && (
                <div className="flex items-center justify-center gap-2 p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t('loading-states')}</span>
                </div>
              )}

              {statesError && (
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  {t('error-loading-states')}
                </CommandEmpty>
              )}

              {!isLoadingStates && !statesError && states.length === 0 && (
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  {t('no-states-found')}
                </CommandEmpty>
              )}

              {states.length > 0 && (
                <CommandGroup>
                  {states.map((state: State) => (
                    <CommandItem
                      key={state.id}
                      value={state.estado}
                      onSelect={() => handleStateSelect(state)}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-3 text-sm hover:bg-accent"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="font-medium">
                          {state.estado} ({state.uf})
                        </span>
                      </div>
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          value.estado?.id === state.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover
        open={cityOpen}
        onOpenChange={(newOpen) => {
          setCityOpen(newOpen)
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={cityOpen}
            disabled={!value.estado}
            className="h-[53px] w-full min-w-[250px] justify-between border border-primary bg-transparent shadow-none transition-all duration-300 hover:bg-accent/50 disabled:opacity-50"
          >
            <div className="flex w-full flex-col items-start gap-1 text-left">
              <span className="text-xs font-medium text-muted-foreground">
                {t('select-city')}
              </span>
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  {value.cidade ? (
                    <span className="font-medium">{value.cidade.cidade}</span>
                  ) : (
                    <span className="text-muted-foreground">
                      {value.estado
                        ? placeholder || t('select-city')
                        : t('select-state')}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[400px] p-0 shadow-lg"
          align="start"
          sideOffset={8}
        >
          <Command shouldFilter={false} className="rounded-lg">
            <div className="flex items-center border-b px-3 py-4">
              <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
              <CommandInput
                placeholder={t('search-city')}
                className="border-0 outline-none focus:ring-0"
              />
            </div>
            <CommandList className="max-h-[300px] overflow-auto p-2">
              {isLoadingCities && (
                <div className="flex items-center justify-center gap-2 p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t('loading-cities')}</span>
                </div>
              )}

              {citiesError && (
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  {t('error-loading-cities')}
                </CommandEmpty>
              )}

              {!isLoadingCities && !citiesError && cities.length === 0 && (
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  {t('no-cities-found')}
                </CommandEmpty>
              )}

              {cities.length > 0 && (
                <CommandGroup>
                  {cities.map((city: City) => (
                    <CommandItem
                      key={city.id}
                      value={city.cidade}
                      onSelect={() => handleCitySelect(city)}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-3 text-sm hover:bg-accent"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="font-medium">{city.cidade}</span>
                      </div>
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          value.cidade?.id === city.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
