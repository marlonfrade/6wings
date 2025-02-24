import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { Search, MapPin } from 'lucide-react'

export interface Location {
  id: string
  name: string
  country: string
  type: 'city' | 'airport' | 'region'
}

interface LocationInputProps {
  label: string
  placeholder?: string
  value: Location | null
  onChange: (location: Location | null) => void
  required?: boolean
  error?: string
  className?: string
}

export const LocationInput = ({
  label,
  placeholder = 'Enter a location',
  value,
  onChange,
  required = false,
  error,
  className
}: LocationInputProps) => {
  const [inputValue, setInputValue] = useState(value ? value.name : '')
  const [suggestions, setSuggestions] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const debouncedValue = useDebounce(inputValue, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLUListElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  useEffect(() => {
    const fetchLocations = async () => {
      if (debouncedValue.length < 2) {
        setSuggestions([])
        return
      }

      try {
        setIsLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch(
          `/api/locations/search?q=${encodeURIComponent(debouncedValue)}`
        )
        const data = await response.json()
        setSuggestions(data)
      } catch (error) {
        console.error('Failed to fetch locations:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [debouncedValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (!e.target.value) {
      onChange(null)
    }
  }

  const handleSelectLocation = useCallback(
    (location: Location) => {
      setInputValue(location.name)
      setSuggestions([])
      onChange(location)
      setIsFocused(false)
    },
    [onChange]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSuggestions([])
      setIsFocused(false)
      setSelectedIndex(-1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelectLocation(suggestions[selectedIndex])
    }
  }

  const renderSuggestions = useMemo(
    () => (
      <ul
        ref={suggestionsRef}
        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
        role="listbox"
        aria-label={`${label} suggestions`}
      >
        {suggestions.map((location, index) => (
          <li
            key={location.id}
            role="option"
            aria-selected={index === selectedIndex}
            className={`relative cursor-pointer select-none py-2 pl-3 pr-9 ${
              index === selectedIndex ? 'bg-blue-50' : 'hover:bg-blue-50'
            }`}
            onClick={() => handleSelectLocation(location)}
          >
            <div className="flex items-center">
              <span className="truncate font-normal">{location.name}</span>
              <span className="ml-2 truncate text-gray-500">
                {location.country}
              </span>
            </div>
            <span className="text-sm text-gray-400">{location.type}</span>
          </li>
        ))}
      </ul>
    ),
    [suggestions, selectedIndex, label, handleSelectLocation]
  )

  return (
    <div className={`relative ${className || ''}`}>
      <label
        htmlFor={`location-input-${label}`}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>

        <input
          id={`location-input-${label}`}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`block w-full rounded-md border py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} `}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />

        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="h-5 w-5 animate-spin text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p id={`${label}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

      {isFocused && suggestions.length > 0 && renderSuggestions}
    </div>
  )
}
