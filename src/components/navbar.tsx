'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

import { useAuth } from '@/providers/authProvider'
import { useCart } from '@/hooks/useCart'
import { useDrawer } from '@/providers/drawerProvider'
import useWindowScroll from '@/hooks/useWindowScroll'

import { Button } from '@/components/button'
import { UserMenu } from '@/components/user/userMenu'
import { NotificationMenu } from '@/components/notification/notificationMenu'
import { SearchButton } from '@/components/search/searchButton'
import {
  NavbarProps,
  Notification,
  NavigationItem,
  DropdownContentItem
} from './types'
import LocaleSwitcher from '@/components/localeSwitcher'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

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
    name: 'navigation.club.title',
    type: 'dropdown',
    content: [
      {
        title: 'navigation.club.basic.title',
        href: '/club/basic',
        description: 'navigation.club.basic.description'
      },
      {
        title: 'navigation.club.top.title',
        href: '/club/top',
        description: 'navigation.club.top.description'
      }
    ]
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
    type: 'dropdown',
    content: [
      {
        name: 'navigation.about.forYou.title',
        path: '/about/for-you',
        type: 'dropdown',
        content: [
          {
            name: 'navigation.about.forYou.financial',
            path: '/about/for-you/personal-financial-consulting',
            type: 'dropdown',
            content: []
          },
          {
            name: 'navigation.about.forYou.retirement',
            path: '/about/for-you/retirement-planning',
            type: 'dropdown',
            content: []
          }
        ]
      },
      {
        name: 'navigation.about.forBusiness.title',
        path: '/about/for-business',
        type: 'dropdown',
        content: [
          {
            name: 'navigation.about.forBusiness.cards',
            path: '/about/for-business/corporate-cards-management',
            type: 'dropdown',
            content: []
          },
          {
            name: 'navigation.about.forBusiness.loyalty',
            path: '/about/for-business/loyalty-programs',
            type: 'dropdown',
            content: []
          }
        ]
      },
      {
        name: 'navigation.about.forNGOs.title',
        path: '/about/for-ongs',
        type: 'dropdown',
        content: [
          {
            name: 'navigation.about.forNGOs.fundraising',
            path: '/about/for-ongs/fundraising',
            type: 'dropdown',
            content: []
          },
          {
            name: 'navigation.about.forNGOs.management',
            path: '/about/for-ongs/social-projects-management',
            type: 'dropdown',
            content: []
          }
        ]
      }
    ]
  }
]

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    hasNestedContent?: boolean
    title?: string
    href?: string
    description?: string
  }
>(
  (
    {
      className,
      title,
      children,
      hasNestedContent = false,
      description,
      ...props
    },
    ref
  ) => {
    if (hasNestedContent) {
      return (
        <li>
          <div
            className={cn(
              'block w-full select-none rounded-md p-3 text-left leading-none',
              'hover:bg-accent/50 hover:text-accent-foreground',
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <div className="mt-2 space-y-1">{children}</div>
          </div>
        </li>
      )
    }

    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              'block w-full select-none rounded-md p-3 leading-none no-underline',
              'hover:bg-accent/50 hover:text-accent-foreground',
              className
            )}
            href={props.href || '#'}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="mt-1 whitespace-pre-line text-sm leading-snug text-muted-foreground">
              {description || children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

const NestedContentItem = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & {
    title: string
    children: React.ReactNode
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'block w-full select-none space-y-1 rounded-md p-3',
        'hover:bg-accent/50',
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  )
})
NestedContentItem.displayName = 'NestedContentItem'

export function Navbar({ hasOffset = true }: NavbarProps) {
  const pathname = usePathname()
  const { isSticky } = useWindowScroll(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const { user } = useAuth()

  const router = useRouter()
  const { cart } = useCart()
  const { openDrawer } = useDrawer()

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)

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

  const getStringKey = (item: NavigationItem | DropdownContentItem) => {
    if (typeof item.name === 'string') return item.name
    if (item.name)
      return item.name[pathname.split('/')[1] as keyof typeof item.name]
    if (item.path) return item.path
    return Math.random().toString()
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fetchUserAvatar = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetch('/api/user')
      if (!response.ok) throw new Error('Failed to fetch user data')

      const data = await response.json()
      if (data.profile) {
        setAvatarUrl(`data:image/jpeg;base64,${data.profile}`)
      }
    } catch (error) {
      console.error('Error fetching user avatar:', error)
    }
  }, [user])

  const fetchNotifications = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetch('/api/notifications')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }, [user])

  useEffect(() => {
    fetchUserAvatar()
    fetchNotifications()
  }, [fetchUserAvatar, fetchNotifications])

  const handleCartClick = () => {
    openDrawer()
  }

  const handleNavigation = (path: string) => {
    // Get the current locale from the pathname
    const currentPath = pathname.split('/')[1]
    const locale = ['en', 'pt-BR'].includes(currentPath) ? currentPath : 'pt-BR'

    if (path === '/') {
      router.push(`/${locale}`)
    } else {
      // Ensure the path maintains the locale prefix
      const newPath = path.startsWith('/')
        ? `/${locale}${path}`
        : `/${locale}/${path}`
      router.push(newPath)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' })
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      )
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const handleViewAllNotifications = () => {
    router.push('/notifications')
  }

  const renderNestedContent = (
    content: (NavigationItem | DropdownContentItem)[]
  ) => {
    return content.map((subItem) => (
      <div
        key={
          typeof subItem.name === 'string'
            ? subItem.path || subItem.name
            : subItem.path || ''
        }
        className="py-1"
      >
        <Link
          href={subItem.path || '#'}
          className="block hover:text-accent-foreground"
        >
          {getLocaleText(subItem.name || subItem.title)}
        </Link>
        {'content' in subItem &&
          subItem.content &&
          subItem.content.length > 0 && (
            <div className="ml-4 mt-2">
              {renderNestedContent(subItem.content)}
            </div>
          )}
      </div>
    ))
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[99] w-full transform transition-all duration-300 ${
        isSticky
          ? 'translate-y-0 bg-white shadow-md'
          : hasOffset
            ? '-translate-y-0 bg-white'
            : 'translate-y-0 bg-white'
      }`}
    >
      <nav className="mx-auto flex max-w-[1900px] items-center justify-between px-4 py-2 md:py-4 lg:px-10 2xl:px-[200px]">
        <div className="cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/images/logos/6wings-light.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-[60px] w-[80px] rounded object-cover"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="hidden items-center lg:flex">
          <NavigationMenu className="relative">
            <NavigationMenuList>
              {NAVIGATION_ITEMS.map((item, index) => (
                <NavigationMenuItem key={`${item.name}-${index}`}>
                  {item.type === 'link' && item.path ? (
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/${pathname.split('/')[1]}${item.path}`}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          montserrat.className,
                          'text-xs font-medium uppercase tracking-wider',
                          pathname === item.path
                            ? 'text-[#9B297D]'
                            : 'text-[#363C41]'
                        )}
                      >
                        {getLocaleText(item.name)}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          montserrat.className,
                          'text-xs font-medium uppercase tracking-wider',
                          'text-[#363C41] hover:text-[#9B297D]'
                        )}
                      >
                        {getLocaleText(item.name)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {item.name === 'navigation.club.title' ? (
                          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/${pathname.split('/')[1]}/club`}
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                >
                                  <Image
                                    src="/images/logos/6wings-light.png"
                                    alt="Clube 6Wings"
                                    width={24}
                                    height={24}
                                    className="h-6 w-6"
                                  />
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    {getLocaleText(item.name)}
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    {t('navigation.club.basic.description')}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            {item.content?.map((contentItem, index) => (
                              <ListItem
                                key={`club-content-${index}`}
                                href={`/${pathname.split('/')[1]}${contentItem.href}`}
                                title={getLocaleText(contentItem.title)}
                                description={getLocaleText(
                                  contentItem.description
                                )}
                              />
                            ))}
                          </ul>
                        ) : (
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.content?.map((contentItem, index) => (
                              <li
                                key={`content-${getStringKey(contentItem)}-${index}`}
                              >
                                <div className="block w-full select-none space-y-1 rounded-md p-3 hover:bg-accent/50">
                                  <div className="text-sm font-medium leading-none">
                                    {contentItem.path ? (
                                      <Link
                                        href={`/${pathname.split('/')[1]}${contentItem.path}`}
                                        className="block hover:text-accent-foreground"
                                      >
                                        {getLocaleText(contentItem.name)}
                                      </Link>
                                    ) : (
                                      <span>
                                        {getLocaleText(contentItem.name)}
                                      </span>
                                    )}
                                  </div>
                                  {contentItem.content &&
                                    contentItem.content.length > 0 && (
                                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                        {renderNestedContent(
                                          contentItem.content
                                        )}
                                      </div>
                                    )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>

            <NavigationMenuViewport />
          </NavigationMenu>
        </div>

        {/* Adding the right-side components */}
        <div className="flex items-center space-x-4">
          <LocaleSwitcher />
          <div className="mr-4 hidden items-center justify-center space-x-2 lg:flex">
            {user ? (
              <>
                <div className="mr-4">
                  <NotificationMenu
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onViewAll={handleViewAllNotifications}
                  />
                </div>
                <div className="user-menu-container relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 rounded-full focus:outline-none"
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={`Avatar ${user?.nome || 'User'}`}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-300 text-lg font-semibold text-gray-600">
                          {(user?.nome || user?.email || 'U')[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                  </button>
                  <UserMenu
                    isOpen={isUserMenuOpen}
                    onClose={() => setIsUserMenuOpen(false)}
                  />
                </div>
              </>
            ) : (
              <>
                <Button
                  label={t('auth.login-button')}
                  variant="secondary"
                  onClick={() => handleNavigation('/login')}
                  hoverLabel={t('auth.login-button')}
                  state="normal"
                  className="w-auto"
                />
                <Button
                  label={t('auth.signup-button')}
                  Icon={() => <ArrowRight color="#363C41" />}
                  iconPosition="right"
                  variant="primary"
                  onClick={() => handleNavigation('/user/sign-up')}
                  hoverLabel={t('auth.signup-button')}
                  state="normal"
                  className="w-auto"
                />
              </>
            )}
          </div>

          <div
            className="relative mr-4 cursor-pointer"
            onClick={handleCartClick}
          >
            <Image
              src="/images/cart/cart-icon.png"
              alt="Shopping Cart"
              width={24}
              height={24}
            />
            {isClient && cartItemsCount > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#363C41] text-[10px] font-normal text-white">
                {cartItemsCount}
              </span>
            )}
          </div>
          <SearchButton />

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="relative z-20 block cursor-pointer p-2 lg:hidden"
          >
            <div
              aria-hidden="true"
              className={`m-auto h-0.5 w-6 rounded bg-gray-900 transition duration-300 dark:bg-gray-300 ${
                menuOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            ></div>
            <div
              aria-hidden="true"
              className={`m-auto mt-2 h-0.5 w-6 rounded bg-gray-900 transition duration-300 dark:bg-gray-300 ${
                menuOpen ? '-translate-y-1 -rotate-45' : ''
              }`}
            ></div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`${
          menuOpen ? 'absolute' : 'hidden'
        } left-[50%] top-24 z-50 mx-auto w-full max-w-sm translate-x-[-50%] items-center space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20`}
      >
        <div className="w-full">
          <SearchButton />
        </div>
        <ul className="flex w-full flex-col items-center space-y-6 text-base font-medium tracking-wide">
          {NAVIGATION_ITEMS.map((item: NavigationItem, index) => (
            <li key={`${getStringKey(item)}-${index}`}>
              <a
                href={item.path}
                className="block transition hover:text-[#9B297D] dark:hover:text-[#9B297D]"
                onClick={(e) => {
                  e.preventDefault()
                  if (item.path) {
                    handleNavigation(item.path)
                    toggleMenu()
                  }
                }}
              >
                {getLocaleText(item.name)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-0 mt-8 flex w-full flex-col items-center justify-center space-y-4 md:flex-row">
          {user ? (
            <>
              <div className="mr-4">
                <NotificationMenu
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onViewAll={handleViewAllNotifications}
                />
              </div>
              <div className="user-menu-container relative w-full">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
                >
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={`Avatar ${user?.nome || 'User'}`}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-300 text-sm font-semibold text-gray-600">
                        {(user?.nome || user?.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-700">{t('auth.myAccount')}</span>
                </button>
                <UserMenu
                  isOpen={isUserMenuOpen}
                  onClose={() => setIsUserMenuOpen(false)}
                />
              </div>
            </>
          ) : (
            <>
              <Button
                label={t('auth.login-button')}
                variant="secondary"
                onClick={() => {
                  handleNavigation('/login')
                  toggleMenu()
                }}
                centered
                className="mb-2 w-full"
                hoverLabel={t('auth.login-button')}
                Icon={() => null}
                iconPosition="right"
                state="normal"
              />
              <Button
                label={t('auth.signup-button')}
                variant="primary"
                onClick={() => {
                  handleNavigation('/user/sign-up')
                  toggleMenu()
                }}
                centered
                className="w-full"
                hoverLabel={t('auth.signup-button')}
                Icon={() => null}
                iconPosition="right"
                state="normal"
              />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
