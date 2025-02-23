'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types/product'
import { useTranslations } from 'next-intl'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

interface RecentSearch {
  query: string
  timestamp: number
}

interface SearchResponse {
  produtos: Product[]
  total: number
}

async function searchProducts(query: string): Promise<SearchResponse> {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export const SearchButton = () => {
  const t = useTranslations('search')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { query: 'Smartphones', timestamp: Date.now() },
    { query: 'Laptops', timestamp: Date.now() - 1000 },
    { query: 'Headphones', timestamp: Date.now() - 2000 }
  ])
  const modalRef = useRef<HTMLDivElement | null>(null)

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: () => searchProducts(searchQuery),
    enabled: searchQuery.length > 2,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  const handleSearch = (query: string) => {
    if (query && !recentSearches.some((search) => search.query === query)) {
      setRecentSearches((prev) => [
        { query, timestamp: Date.now() },
        ...prev.slice(0, 4)
      ])
    }
    setSearchQuery(query)
  }

  const renderProduct = (product: Product) => (
    <div
      key={product.id}
      className="grid cursor-pointer grid-cols-10 overflow-hidden rounded-xl border border-[#E7EDFB] transition-all hover:border-[#9B297D] hover:shadow-lg"
    >
      <div className="col-span-3 bg-gray-100 p-2">
        <div className="relative h-full w-full">
          <Image
            src={product.imagens[0]?.image_base64 || '/placeholder-image.jpg'}
            alt={product.titulo}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="col-span-7 flex flex-col justify-between p-3">
        <h4 className="line-clamp-2 text-base font-medium text-black transition-colors group-hover:text-[#9B297D]">
          {product.titulo}
        </h4>
        <div className="mt-2 flex items-center justify-between text-sm text-[#9A999B]">
          <p className="flex items-center gap-1">
            <span>R$ {product.valor}</span>
          </p>
          <p className="flex items-center gap-1">
            <span>⭐ 4.5</span>
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      <form className="relative mx-auto w-max">
        <input
          type="search"
          className={`relative z-10 h-10 w-10 cursor-pointer rounded-full bg-transparent pl-12 outline-none ${montserrat.className}`}
          onClick={() => setIsModalOpen(true)}
          readOnly
        />
        <Search className="absolute inset-y-0 my-auto h-8 w-12 border-transparent stroke-[#363C41] px-3.5" />
      </form>

      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed left-0 top-0 z-50 h-full min-h-screen w-full bg-black/50"
        >
          <div className="absolute left-1/2 top-8 w-full max-w-3xl -translate-x-1/2 transform">
            <div className="mx-4 rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-2 rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label={t('closeSearch')}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative mt-8">
                <input
                  className={`w-full rounded-xl border-2 border-[#363C41] px-12 py-4 text-lg outline-none focus:border-[#9B297D] ${montserrat.className}`}
                  placeholder={t('placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSearch(searchQuery)
                    }
                  }}
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-gray-400" />
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold text-[#5D5D5F]">
                  {t('recentSearches')}
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {recentSearches.map((search, index) => (
                    <li
                      key={index}
                      className="cursor-pointer rounded-lg px-2 py-2 text-sm hover:bg-[#9B297D]/10"
                      onClick={() => handleSearch(search.query)}
                    >
                      {search.query}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold text-[#5D5D5F]">
                  {searchQuery ? t('searchResults') : t('featuredProducts')}
                </p>
                {isLoading ? (
                  <div className="mt-4 text-center">{t('loading')}</div>
                ) : (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {searchResults?.produtos.map(renderProduct)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
