'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Locale, routing, usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
  onClose?: () => void
}

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
  onClose
}: Props) {
  const router = useRouter()

  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale }
    )

    // Close the dropdown after selection
    if (onClose) {
      onClose()
    }
  }

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={onSelectChange}
      onOpenChange={(open) => !open && onClose?.()}
    >
      <SelectTrigger
        className="h-8 w-[80px] border-none bg-background shadow-sm focus:ring-0 focus:ring-offset-0"
        aria-label={label}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="z-[99]">
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
