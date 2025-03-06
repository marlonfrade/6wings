'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/authProvider'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { USER_ROLES } from '@/lib/constants'
import LoginForm from './form'
import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const t = useTranslations()
  useEffect(() => {
    if (!loading && user?.tipo) {
      switch (user.tipo) {
        case USER_ROLES.PARCEIRO:
          router.push('/partners')
          break
        case USER_ROLES.USER:
          router.push('/user')
          break
        case USER_ROLES.ADMIN:
          router.push('/admin')
          break
        default:
          router.push('/')
      }
    }
  }, [user, loading, router])

  const handleBack = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-around">
      <Image
        src="/images/logos/6wings-light.png"
        alt="Six Wings"
        width={100}
        height={100}
        loading="lazy"
        className="mt-8"
      />
      <LoginForm />
      <button
        className="ml-24 flex cursor-pointer items-center gap-2.5 self-start text-sm font-light text-[#363C41] transition-colors hover:text-primary"
        onClick={handleBack}
      >
        <ArrowLeft size={16} />
        {t('auth.login.back')}
      </button>
    </div>
  )
}
