'use client'

import { useState, type ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  avatar?: string
  title: string
  message: string
  timestamp: string
  link?: string
  read: boolean
}

interface NotificationMenuProps {
  notifications?: Notification[]
  onMarkAsRead?: (id: string) => void
  onViewAll?: () => void
}

export const NotificationMenu = ({
  notifications = [],
  onMarkAsRead,
  onViewAll
}: NotificationMenuProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative z-10 block rounded-md p-2 focus:outline-none">
          <svg
            className="h-6 w-6 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          'w-80 rounded-lg border border-gray-200 bg-white p-0 shadow-lg'
        )}
        align="end"
      >
        <div className="max-h-[400px] overflow-y-auto">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Notificações
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.link || '#'}
                  className="flex items-center gap-4 p-4 transition hover:bg-gray-50"
                  onClick={() => {
                    if (onMarkAsRead) onMarkAsRead(notification.id)
                  }}
                >
                  {notification.avatar ? (
                    <Image
                      src={notification.avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                      <svg
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {notification.timestamp}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                Nenhuma notificação no momento
              </div>
            )}
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="border-t border-gray-200 p-2">
            <button
              onClick={onViewAll}
              className="block w-full rounded-md bg-gray-800 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Ver todas notificações
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
