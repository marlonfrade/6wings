'use client'

import {
  NextIntlClientProvider as Provider,
  AbstractIntlMessages
} from 'next-intl'
import { type Locale } from '@/i18n/routing'
import { ReactNode } from 'react'

interface NextIntlProviderProps {
  messages: AbstractIntlMessages
  locale: Locale
  children: ReactNode
}

export function NextIntlProvider({
  messages,
  locale,
  children
}: NextIntlProviderProps) {
  return (
    <Provider messages={messages} locale={locale}>
      {children}
    </Provider>
  )
}
