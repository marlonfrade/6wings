import type { Metadata } from 'next'
import { Montserrat, Prompt } from 'next/font/google'
import { Providers } from '@/app/providers'
import CartDrawer from '@/components/cart/cartDrawer'
import CookieConsent from '@/components/cookies/cookieConsent'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'

import './globals.css'

// Optimize font configurations
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-montserrat' // Add variable for CSS usage
})

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-prompt', // Add variable for CSS usage
  adjustFontFallback: true
})

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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const { locale } = await params

  // Validate locale before using it
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

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
