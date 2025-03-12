import { routing } from '@/i18n/routing'
import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import LocaleSwitcherSelect from '@/components/localeSwitcherSelect'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLocaleSelector = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0"
        onClick={toggleLocaleSelector}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2">
          <LocaleSwitcherSelect
            defaultValue={locale}
            label="Select a locale"
            onClose={() => setIsOpen(false)}
          >
            {routing.locales.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </LocaleSwitcherSelect>
        </div>
      )}
    </div>
  )
}
