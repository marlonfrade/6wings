'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import { User } from '@/types/user'
import { useSession, signIn, signOut } from 'next-auth/react'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (user: User) => void
  logout: () => void
  isTokenExpired: () => boolean
  tokenExpiresIn: () => number | null
  refreshToken: () => Promise<boolean>
  hasRefreshToken: () => boolean
  refreshTokenExpiresIn: () => number | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Tempo em segundos antes da expiração para tentar renovar o token
const TOKEN_REFRESH_THRESHOLD = 300 // 5 minutos

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session, status, update } = useSession()

  // Atualiza o estado do usuário com base na sessão do AuthJS
  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
      return
    }

    if (status === 'authenticated' && session?.user) {
      // Converte o usuário da sessão para o formato User
      const sessionUser = session.user as unknown as User
      setUser(sessionUser)
    } else {
      setUser(null)
    }

    setLoading(false)
  }, [session, status])

  // Verifica se o token está expirado
  const isTokenExpired = useCallback((): boolean => {
    if (!user?.tokenExpiration) return true

    const now = Math.floor(Date.now() / 1000) // Tempo atual em segundos (formato Unix timestamp)
    return now >= user.tokenExpiration
  }, [user?.tokenExpiration])

  // Retorna o tempo restante em segundos até a expiração do token
  const tokenExpiresIn = useCallback((): number | null => {
    if (!user?.tokenExpiration) return null

    const now = Math.floor(Date.now() / 1000) // Tempo atual em segundos
    const timeLeft = user.tokenExpiration - now

    return timeLeft > 0 ? timeLeft : 0
  }, [user?.tokenExpiration])

  // Verifica se o usuário possui um token de atualização
  const hasRefreshToken = useCallback((): boolean => {
    return !!user?.refreshToken
  }, [user?.refreshToken])

  // Retorna o tempo restante em segundos até a expiração do token de atualização
  const refreshTokenExpiresIn = useCallback((): number | null => {
    if (!user?.refreshTokenExpiration) return null

    const now = Math.floor(Date.now() / 1000) // Tempo atual em segundos
    const timeLeft = user.refreshTokenExpiration - now

    return timeLeft > 0 ? timeLeft : 0
  }, [user?.refreshTokenExpiration])

  // Função para renovar o token
  const refreshToken = useCallback(async (): Promise<boolean> => {
    if (!user?.token || !user?.refreshToken) return false

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) {
        throw new Error('API URL não configurada')
      }

      // Chamada para a API para renovar o token
      const res = await fetch(`${apiUrl}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: user.refreshToken
        })
      })

      if (res.ok) {
        const data = await res.json()

        if (data.token) {
          // Validar o novo token para obter informações de expiração
          const validateRes = await fetch(`${apiUrl}/validate`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.token}`
            }
          })

          let tokenExpiration

          if (validateRes.ok) {
            const tokenData = await validateRes.json()
            if (tokenData.data && tokenData.data.exp) {
              tokenExpiration = tokenData.data.exp
            }
          }

          // Atualizar a sessão com o novo token
          await update({
            ...session,
            user: {
              ...session?.user,
              token: data.token,
              tokenExpiration,
              refreshToken: data.refreshToken || user.refreshToken,
              refreshTokenExpiration:
                data.refreshTokenExpiration || user.refreshTokenExpiration
            }
          })

          return true
        }
      }

      return false
    } catch (error) {
      console.error('Erro ao renovar o token:', error)
      return false
    }
  }, [
    user?.token,
    user?.refreshToken,
    session,
    update,
    user?.refreshTokenExpiration
  ])

  // Verificar periodicamente se o token precisa ser renovado
  useEffect(() => {
    if (!user || !user.token || !user.tokenExpiration) return

    const checkTokenExpiration = async () => {
      const timeLeft = tokenExpiresIn()

      if (
        timeLeft !== null &&
        timeLeft > 0 &&
        timeLeft < TOKEN_REFRESH_THRESHOLD
      ) {
        console.log('Token próximo de expirar, tentando renovar...')
        await refreshToken()
      }
    }

    // Verificar a cada minuto
    const interval = setInterval(checkTokenExpiration, 60000)

    // Verificar imediatamente na inicialização
    checkTokenExpiration()

    return () => clearInterval(interval)
  }, [user, tokenExpiresIn, refreshToken])

  const login = async (userData: User) => {
    try {
      await signIn('credentials', {
        email: userData.email,
        senha: userData.senha,
        redirect: false
      })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  const logout = async () => {
    try {
      await signOut({ redirect: false })
      setUser(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isTokenExpired,
        tokenExpiresIn,
        refreshToken,
        hasRefreshToken,
        refreshTokenExpiresIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
