import { useState, memo } from 'react'
import Typography from '@/components/typography'
import SearchFlight from '@/components/travel/flights/searchFlight'
import SearchAccomodation from '@/components/travel/accomodation/searchAccomodation'
import SearchCarRentals from '@/components/travel/carRentals/searchCarRentals'
import SearchPackages from '@/components/travel/travelPackages/searchPackages'
import SearchAirbnb from '@/components/travel/airbnb/searchAirbnb'
import SearchCruises from '@/components/travel/cruises/searchCruises'
import SearchBuses from '@/components/travel/buses/searchBuses'

interface Category {
  name: string
  component: React.ReactNode
}

interface TravelNavigationProps {
  initialCategory?: string
}

const categories: Category[] = [
  { name: 'Passagens Aéreas', component: <SearchFlight /> },
  { name: 'Hospedagem', component: <SearchAccomodation /> },
  { name: 'Aluguel de Carro', component: <SearchCarRentals /> },
  { name: 'Pacotes de Viagem', component: <SearchPackages /> },
  { name: 'Crédito Airbnb', component: <SearchAirbnb /> },
  { name: 'Cruzeiros', component: <SearchCruises /> },
  { name: 'Ônibus', component: <SearchBuses /> }
]

export const TravelNavigation = memo(
  ({ initialCategory }: TravelNavigationProps) => {
    const [activeTab, setActiveTab] = useState(
      initialCategory || categories[0].name
    )
    const [loading, setLoading] = useState(false)

    const handleTabClick = async (categoryName: string) => {
      if (categoryName === activeTab) return

      setLoading(true)
      setActiveTab(categoryName)
      // Simulate loading delay
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    return (
      <div className="mt-24">
        <nav className="mb-8 flex flex-wrap justify-center space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-14">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`cursor-pointer transition-colors duration-200 ${
                activeTab === category.name
                  ? 'text-primary'
                  : 'text-[#8E8E8E] hover:text-primary'
              }`}
              onClick={() => handleTabClick(category.name)}
            >
              <Typography variant="navigation">{category.name}</Typography>
            </button>
          ))}
        </nav>
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
            </div>
          ) : (
            categories.find((category) => category.name === activeTab)
              ?.component
          )}
        </div>
      </div>
    )
  }
)

// Add display name for better debugging
TravelNavigation.displayName = 'TravelNavigation'
