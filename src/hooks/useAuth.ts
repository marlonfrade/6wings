import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { User } from '@/types/auth'

/**
 * Custom hook for handling authentication state and operations.
 *
 * @returns {Object} Authentication methods and state
 * @property {User | null} user - Current authenticated user or null if not authenticated
 * @property {boolean} loading - Loading state during authentication checks
 * @property {(email: string, password: string, redirect?: boolean) => Promise<any>} signIn - Function to authenticate user
 * @property {() => Promise<void>} signOut - Function to log out user
 * @property {() => Promise<boolean>} validateToken - Function to validate current auth token
 * @property {(tipo: string) => void} redirectBasedOnUserType - Function to redirect user based on their type
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  /**
   * Initialize authentication state on component mount
   * Checks for existing session and updates user state
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        const session = await response.json()

        if (session?.user) {
          setUser(session.user)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  /**
   * Validates the current authentication token
   *
   * @returns {Promise<boolean>} True if token is valid, false otherwise
   */
  const validateToken = async (): Promise<boolean> => {
    try {
      const sessionResponse = await fetch('/api/auth/session')
      const session = await sessionResponse.json()
      const token = session?.token

      if (!token) {
        return false
      }

      const tokenResponse = await fetch('/api/auth/token')
      const tokenData = await tokenResponse?.json()

      if (tokenData?.message === 'Token inválido') {
        signOut()
        return false
      }

      if (tokenData?.status === 200 && !user && session?.user) {
        setUser(session.user)
      }

      return tokenData?.status === 200
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  }

  /**
   * Authenticates user with email and password
   *
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {boolean} [redirect=false] - Whether to redirect after successful login
   * @returns {Promise<any>} Authentication response data
   * @throws {Error} If authentication fails
   */
  const signIn = async (email: string, password: string, redirect = false) => {
    const toastId = toast.loading('Autenticando...')

    try {
      const response = await fetch('/api/auth/user/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.error) {
        toast.error(data.error, { id: toastId })
        return Promise.reject(new Error(data.error))
      }

      if (data?.user) {
        setUser(data.user)
      }

      if (data.message === 'Login realizado com sucesso!') {
        toast.success('Login realizado com sucesso!', { id: toastId })

        if (redirect && data?.user) {
          redirectBasedOnUserType(data?.user?.tipo)
        }

        return Promise.resolve(data)
      } else {
        toast.error(data.error, { id: toastId })
        return Promise.reject(new Error(data.error))
      }
    } catch (error) {
      const err = error as Error
      console.error('Login error:', err)
      toast.error(err.message || 'Erro ao fazer login', { id: toastId })
      return Promise.reject(err)
    }
  }

  /**
   * Signs out the current user
   * Validates token, calls logout endpoint, and clears user state
   */
  const signOut = async () => {
    try {
      await validateToken()
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      toast.success('Logout realizado com sucesso')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Erro ao fazer logout')
    }
  }

  /**
   * Redirects user to appropriate page based on their type
   *
   * @param {string} tipo - User type ('PA' for Partner, 'US' for User, 'AD' for Admin)
   */
  const redirectBasedOnUserType = (tipo: string) => {
    switch (tipo) {
      case 'PA':
        router.push('/partners')
        break
      case 'US':
        router.push('/user')
        break
      case 'AD':
        router.push('/admin')
        break
      default:
        console.warn('Unknown user type:', tipo)
        toast.error('Tipo de usuário desconhecido')
        router.push('/')
    }
  }

  return {
    user,
    signIn,
    signOut,
    loading,
    validateToken,
    redirectBasedOnUserType
  }
}
