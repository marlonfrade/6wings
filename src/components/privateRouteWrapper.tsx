'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/authProvider'
import Backdrop from './backdrop'

interface PrivateRouteWrapperProps {
  children: React.ReactNode
  requiredRole?: string
}

export default function PrivateRouteWrapper({
  children,
  requiredRole
}: PrivateRouteWrapperProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/user/sign-in')
    }
  }, [user, loading, router])

  if (loading) {
    return <Backdrop />
  }

  if (!user) {
    return null
  }

  if (requiredRole && user.tipo !== requiredRole) {
    return <div>Unauthorized</div>
  }

  return <>{children}</>
}
