'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/providers/authProvider'

export function ClientUserAvatar() {
  const { user } = useAuth()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!user) return

      try {
        // Tenta buscar o avatar do usuário da API
        const response = await fetch('/api/user')
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do usuário')
        }

        const userData = await response.json()
        if (userData.profile) {
          setAvatarUrl(`data:image/jpeg;base64,${userData.profile}`)
        } else if (user.profile) {
          setAvatarUrl(`data:image/jpeg;base64,${user.profile}`)
        }
      } catch (error) {
        console.error('Erro ao buscar avatar:', error)
        // Usa o profile do usuário do contexto de autenticação como fallback
        if (user.profile) {
          setAvatarUrl(`data:image/jpeg;base64,${user.profile}`)
        }
      }
    }

    fetchUserAvatar()
  }, [user])

  if (!user) return null

  return (
    <div className="relative h-8 w-8 overflow-hidden rounded-full">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={`Avatar de ${user.nome || 'usuário'}`}
          fill
          className="object-cover"
          sizes="32px"
        />
      ) : (
        <div className="text-primary-foreground flex h-full w-full items-center justify-center bg-primary">
          {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
        </div>
      )}
    </div>
  )
}
