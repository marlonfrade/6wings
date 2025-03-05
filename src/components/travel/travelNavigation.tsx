import { useState, memo } from 'react'
import Typography from '@/components/typography'
import SearchFlight from '@/components/travel/flights/searchFlight'
import SearchAccomodation from '@/components/travel/accommodation/searchAccommodation'
import SearchCarRentals from '@/components/travel/carRentals/searchCarRentals'
import SearchPackages from '@/components/travel/travelPackages/searchPackages'
import SearchAirbnb from '@/components/travel/airbnb/searchAirbnb'
import SearchCruises from '@/components/travel/cruises/searchCruises'
import SearchBuses from '@/components/travel/buses/searchBuses'
import { useTranslations } from 'next-intl'

interface Category {
  key: string
  component: React.ReactNode
}

interface TravelNavigationProps {
  initialCategory?: string
}

const TravelNavigation = memo(({ initialCategory }: TravelNavigationProps) => {
  const t = useTranslations('homepage.travel.navigation')

  const categories: Category[] = [
    { key: 'flights', component: <SearchFlight /> },
    { key: 'accommodation', component: <SearchAccomodation /> },
    { key: 'carRentals', component: <SearchCarRentals /> },
    { key: 'travelPackages', component: <SearchPackages /> },
    { key: 'airbnb', component: <SearchAirbnb /> },
    { key: 'cruises', component: <SearchCruises /> },
    { key: 'buses', component: <SearchBuses /> }
  ]

  const [activeTab, setActiveTab] = useState(
    initialCategory || categories[0].key
  )
  const [loading, setLoading] = useState(false)

  const handleTabClick = async (categoryKey: string) => {
    if (categoryKey === activeTab) return

    setLoading(true)
    setActiveTab(categoryKey)
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <div className="mt-24">
      <nav className="mb-8 flex flex-wrap justify-center space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-[40px]">
        {categories.map((category) => (
          <button
            key={category.key}
            className={`cursor-pointer transition-colors duration-200 ${
              activeTab === category.key
                ? 'text-primary'
                : 'text-[#8E8E8E] hover:text-primary'
            }`}
            onClick={() => handleTabClick(category.key)}
          >
            <Typography variant="navigation">{t(category.key)}</Typography>
          </button>
        ))}
      </nav>
      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
          </div>
        ) : (
          categories.find((category) => category.key === activeTab)?.component
        )}
      </div>
    </div>
  )
})

// Add display name for better debugging
TravelNavigation.displayName = 'TravelNavigation'

export { TravelNavigation }
