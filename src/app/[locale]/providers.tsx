'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/providers/authProvider'
import { CartProvider } from '@/providers/cartProvider'
import { DrawerProvider } from '@/providers/drawerProvider'
import { ToastProvider } from '@/providers/toastProvider'
import { QueryProvider } from '@/providers/queryProvider'
import { ChatProvider } from '@/providers/chatProvider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ChatProvider>
      <QueryProvider>
        <AuthProvider>
          <CartProvider>
            <DrawerProvider>
              <ToastProvider />
              {children}
            </DrawerProvider>
          </CartProvider>
        </AuthProvider>
      </QueryProvider>
    </ChatProvider>
  )
}
