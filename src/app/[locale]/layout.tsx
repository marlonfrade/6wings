import type { Metadata } from 'next'
import { Providers } from '@/app/providers'
import CartDrawer from '@/components/cart/cartDrawer'
import CookieConsent from '@/components/cookies/cookieConsent'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { montserrat, prompt } from '@/config/fonts'

import './globals.css'

// Basic metadata configuration
export const metadata: Metadata = {
  title: '6Wings',
  description: 'Premium chicken wings and sides delivery service'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
}

// Generate static params for supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Params = Promise<{ locale: Locale }>

interface RootLayoutProps {
  children: React.ReactNode
  params: Params
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params
  // Validate locale before using it
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // This enables static rendering
  setRequestLocale(locale)

  // Get messages after locale validation
  let messages
  try {
    messages = await getMessages()
  } catch (error) {
    console.error('Error loading messages:', error)
    notFound()
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${prompt.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Providers messages={messages} locale={locale}>
          {children}
          <CartDrawer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
