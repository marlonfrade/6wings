import type { Metadata } from 'next'
import { Montserrat, Prompt } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import CartDrawer from '@/components/cart/cartDrawer'
import CookieConsent from '@/components/cookies/cookieConsent'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true
})

export const metadata: Metadata = {
  title: '6Wings',
  description:
    'A 6Wings é a sua plataforma de viagens e compras, oferecendo as melhores ofertas e promoções para você e sua empresa. Descubra passagens aéreas, hospedagens, aluguel de carros, pacotes de viagem e muito mais.',
  keywords: [
    'viagens',
    'compras',
    'passagens aéreas',
    'hospedagens',
    'aluguel de carros',
    'pacotes de viagem'
  ],
  authors: [{ name: '6Wings' }],
  viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.className} ${prompt.className} flex min-h-screen flex-col antialiased`}
      >
        <div className="flex-grow">
          <Providers>
            <CartDrawer />
            <CookieConsent />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
