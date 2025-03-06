'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/providers/authProvider'
import { CartProvider } from '@/providers/cartProvider'
import { DrawerProvider } from '@/providers/drawerProvider'
import { ToastProvider } from '@/providers/toastProvider'
import { QueryProvider } from '@/providers/queryProvider'
import { ChatProvider } from '@/providers/chatProvider'
import { NextIntlProvider } from '@/providers/nextIntlProvider'
import { SessionProvider } from '@/providers/sessionProvider'
import { AbstractIntlMessages } from 'next-intl'

import { type Locale } from '@/i18n/routing'

interface ProvidersProps {
  children: ReactNode
  messages: AbstractIntlMessages
  locale: string
}

export function Providers({ children, messages, locale }: ProvidersProps) {
  return (
    <NextIntlProvider messages={messages} locale={locale as Locale}>
      <SessionProvider>
        <QueryProvider>
          <ChatProvider>
            <AuthProvider>
              <CartProvider>
                <DrawerProvider>
                  <ToastProvider />
                  {children}
                </DrawerProvider>
              </CartProvider>
            </AuthProvider>
          </ChatProvider>
        </QueryProvider>
      </SessionProvider>
    </NextIntlProvider>
  )
}
