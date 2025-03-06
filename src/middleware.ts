import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import type { NextRequest } from 'next/server'

// Middleware de internacionalização
const intlMiddleware = createMiddleware(routing)

// Middleware combinado
export default async function middleware(request: NextRequest) {
  // Aplicar o middleware de internacionalização
  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt-BR|en)/:path*']
}
