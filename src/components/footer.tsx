'use client'

import React from 'react'
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Send
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { NavigationItem } from './types'

// Using the same navigation items from navbar
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: 'quick-links.links.home',
    path: '/',
    type: 'link'
  },
  {
    name: 'quick-links.links.shopping',
    path: '/offers',
    type: 'link'
  },
  {
    name: 'quick-links.links.club',
    path: '/club',
    type: 'link'
  },
  {
    name: 'quick-links.links.partner',
    path: '/partners-advertise',
    type: 'link'
  },
  {
    name: 'quick-links.links.points',
    path: '/points',
    type: 'link'
  },
  {
    name: 'quick-links.links.about',
    path: '/about',
    type: 'link'
  },
  {
    name: 'quick-links.links.contact',
    path: '/contact',
    type: 'link'
  }
]

const Footer = () => {
  const t = useTranslations('footer')

  const getLocaleText = (key: string | undefined): string => {
    if (!key) return ''
    try {
      return t(key)
    } catch (error) {
      console.error('Error fetching locale text:', error)
      return key
    }
  }

  // Helper function to render rich text with links
  const renderRichText = (
    key: string,
    linkComponent: (chunks: React.ReactNode) => React.ReactNode
  ) => {
    try {
      return t.rich(key, {
        highlight: linkComponent
      })
    } catch (error) {
      console.error(`Error rendering rich text for key: ${key}`, error)
      return key
    }
  }

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-background to-primary/5 pt-40">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {/* First wave - slowest */}
        <div className="animate-wave-slow absolute bottom-0 h-[500px] w-[200%]">
          <svg
            className="h-full w-full"
            viewBox="0 0 2880 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 250C120 230 240 210 360 220C480 230 600 270 720 290C840 310 960 310 1080 290C1200 270 1320 230 1440 210C1560 190 1680 190 1800 210C1920 230 2040 270 2160 290C2280 310 2400 310 2520 290C2640 270 2760 230 2880 220V500H0V250Z"
              fill="currentColor"
              className="text-primary/5"
            />
          </svg>
        </div>

        {/* Second wave - medium speed */}
        <div className="animate-wave-medium absolute bottom-0 h-[500px] w-[200%]">
          <svg
            className="h-full w-full"
            viewBox="0 0 2880 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 270C120 250 240 230 360 240C480 250 600 290 720 300C840 310 960 290 1080 270C1200 250 1320 230 1440 240C1560 250 1680 290 1800 300C1920 310 2040 290 2160 270C2280 250 2400 230 2520 240C2640 250 2760 290 2880 300V500H0V270Z"
              fill="currentColor"
              className="text-primary/5"
            />
          </svg>
        </div>

        {/* Third wave - fastest */}
        <div className="animate-wave-fast absolute bottom-0 h-[500px] w-[200%]">
          <svg
            className="h-full w-full"
            viewBox="0 0 2880 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 290C120 280 240 270 360 280C480 290 600 320 720 330C840 340 960 330 1080 310C1200 290 1320 260 1440 250C1560 240 1680 250 1800 270C1920 290 2040 320 2160 330C2280 340 2400 330 2520 310C2640 290 2760 260 2880 250V500H0V290Z"
              fill="currentColor"
              className="text-primary/5"
            />
          </svg>
        </div>
      </div>

      <div className="container relative z-[10] mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="z-[10000000000000000] grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Subscription */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              {t('newsletter.title')}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {t('newsletter.sub-title')}
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder={t('newsletter.input.placeholder')}
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="text-primary-foreground absolute right-1 top-1 h-8 w-8 rounded-full bg-primary transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" color="white" />
                <span className="sr-only">{t('newsletter.input.button')}</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {t('quick-links.title')}
            </h3>
            <nav className="space-y-2 text-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.path || '#'}
                  className="block transition-colors hover:text-primary"
                >
                  {getLocaleText(item.name)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('contact.title')}</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>{t('contact.company')}</p>
              <p>Rio de Janeiro, RJ</p>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <p>21 3232 4564</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <p>falecom@6wings.com.br</p>
              </div>
            </address>
          </div>

          {/* Social Media */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">
              {t('social-media.title')}
            </h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-transparent"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social-media.facebook')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-transparent"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social-media.twitter')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-transparent"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social-media.instagram')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-transparent"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social-media.youtube')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              {/* <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Alternar modo escuro
              </Label> */}
            </div>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            {renderRichText('copyright', (chunks) => (
              <a
                href="https://www.monkeybranch.dev"
                className="transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ))}
          </p>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-primary"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-primary"
            >
              {t('terms')}
            </Link>
            <Link
              href="/cookie-settings"
              className="transition-colors hover:text-primary"
            >
              {t('cookies')}
            </Link>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes wave-medium {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes wave-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-wave-slow {
          animation: wave-slow 25s linear infinite;
        }
        .animate-wave-medium {
          animation: wave-medium 18s linear infinite;
        }
        .animate-wave-fast {
          animation: wave-fast 12s linear infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer
