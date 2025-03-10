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
    name: 'navigation.home',
    path: '/',
    type: 'link'
  },
  {
    name: 'navigation.shopping',
    path: '/offers',
    type: 'link'
  },
  {
    name: 'navigation.partners',
    path: '/partners-advertise',
    type: 'link'
  },
  {
    name: 'navigation.points',
    path: '/points',
    type: 'link'
  },
  {
    name: 'navigation.about.title',
    path: '/about',
    type: 'link'
  }
]

const Footer = () => {
  const t = useTranslations()

  const getLocaleText = (key: string | undefined): string => {
    if (!key) return ''
    try {
      return t(key)
    } catch (error) {
      console.error('Error fetching locale text:', error)
      return key
    }
  }

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-background to-primary/5 pt-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-wave absolute bottom-0 h-[500px] w-full">
          <svg
            className="h-full w-full"
            viewBox="0 0 1800 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-primary/5"
            />
            <path
              d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-primary/5"
            />
          </svg>
        </div>
        <div className="animate-wave absolute bottom-0 left-[95.8%] h-[500px] w-full -translate-x-1/2">
          <svg
            className="h-full w-full"
            viewBox="0 0 1800 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-primary/5"
            />
            <path
              d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-primary/5"
            />
          </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Subscription */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Fique Conectado
            </h2>
            <p className="mb-6 text-muted-foreground">
              Inscreva-se em nossa newsletter para receber atualizações e
              ofertas exclusivas.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Digite seu email"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="text-primary-foreground absolute right-1 top-1 h-8 w-8 rounded-full bg-primary transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" color="white" />
                <span className="sr-only">Inscrever-se</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Links Rápidos</h3>
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
            <h3 className="mb-4 text-lg font-semibold">Contato</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>6Wings Brasil</p>
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
            <h3 className="mb-4 text-lg font-semibold">Redes Sociais</h3>
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
                    <p>Siga-nos no Facebook</p>
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
                    <p>Siga-nos no Twitter</p>
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
                    <p>Siga-nos no Instagram</p>
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
                    <p>Conecte-se conosco no LinkedIn</p>
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
            Desenvolvido por{' '}
            <Link
              href="https://www.monkeybranch.dev"
              className="transition-colors hover:text-primary"
            >
              Monkeybranch
            </Link>{' '}
            © 2024 6Wings. Todos os direitos reservados.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-primary"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-primary"
            >
              Termos de Serviço
            </Link>
            <Link
              href="/cookie-settings"
              className="transition-colors hover:text-primary"
            >
              Configurações de Cookies
            </Link>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-wave {
          animation: wave 15s linear infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer
