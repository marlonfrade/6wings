import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'pt-BR'],

  // Used when no locale matches
  defaultLocale: 'pt-BR',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      'pt-BR': '/caminhos'
    }
  }
})

export type Locale = (typeof routing.locales)[number]

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
