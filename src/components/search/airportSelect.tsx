'use client'

import { useState, useEffect, useRef } from 'react'
import { Airport } from '@/types/airport'

interface AirportResponse {
  id: number
  name: string
  code: string
  cidade: string
  estado?: string
  pais: string
}

interface AirportSelectProps {
  label?: string
  value: Airport | null
  onChange: (airport: Airport | null) => void
  placeholder?: string
}

export default function AirportSelect({
  label,
  value,
  onChange,
  placeholder
}: AirportSelectProps) {
  const [query, setQuery] = useState('')
  const [airports, setAirports] = useState<AirportResponse[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      setQuery(`${value.cidade} (${value.code})`)
    }
  }, [value])

  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/airports${query ? `?query=${query}` : ''}`
        )
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch airports')
        }
        const data = await response.json()
        setAirports(data)
      } catch (error) {
        console.error('Error fetching airports:', error)
        setAirports([])
      } finally {
        setLoading(false)
      }
    }

    if (query.trim() && !value) {
      const debounceTimer = setTimeout(fetchAirports, 500)
      return () => clearTimeout(debounceTimer)
    } else {
      setAirports([])
    }
  }, [query, value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setQuery(newValue)
    setIsOpen(true)

    if (value && newValue !== `${value.cidade} (${value.code})`) {
      onChange(null)
    }
  }

  const handleSelectAirport = (airport: AirportResponse) => {
    const formattedAirport: Airport = {
      id: airport.id,
      nome: airport.name,
      code: airport.code,
      cidade: airport.cidade,
      estado: airport.estado || '',
      pais: airport.pais
    }

    onChange(formattedAirport)
    const formattedQuery = `${airport.cidade} (${airport.code})`
    setQuery(formattedQuery)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    if (!value) {
      setIsOpen(true)
      setQuery('')
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false)
      if (value) {
        setQuery(`${value.cidade} (${value.code})`)
      } else {
        setQuery('')
      }
    }, 200)
  }

  const handleEditClick = () => {
    onChange(null)
    setQuery('')
    setIsOpen(true)
    inputRef.current?.focus()
  }

  return (
    <div className="relative h-full w-full">
      {label && (
        <span className="absolute -top-2 left-3 z-10 bg-white px-2 text-xs font-medium text-gray-700">
          {label}
        </span>
      )}
      <div className="relative flex w-full items-end justify-end">
        <input
          ref={inputRef}
          type="text"
          className="h-[53px] w-full rounded-lg border border-[#363C41] bg-transparent px-4 py-3 text-sm text-[#363C41] transition-all duration-200 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-50 disabled:text-gray-500"
          value={value ? `${value.cidade} (${value.code})` : query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          autoComplete="off"
          disabled={!!value}
        />
        {value && (
          <button
            type="button"
            onClick={handleEditClick}
            className="absolute right-3 text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            Editar
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-[240px] w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Carregando...</div>
          ) : airports.length > 0 ? (
            airports.map((airport) => (
              <div
                key={airport.id}
                className={`cursor-pointer p-3 transition-colors duration-150 hover:bg-gray-50 ${
                  value?.code === airport.code ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleSelectAirport(airport)}
              >
                <div className="font-medium text-[#363C41]">
                  {airport.cidade} ({airport.code})
                </div>
                <div className="text-sm text-gray-500">
                  {airport.name}
                  <br />
                  {airport.estado ? `${airport.estado} - ` : ''}
                  {airport.pais}
                </div>
              </div>
            ))
          ) : query.trim() ? (
            <div className="p-4 text-center text-gray-500">
              Nenhum aeroporto encontrado
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Digite para buscar aeroportos
            </div>
          )}
        </div>
      )}
    </div>
  )
}
