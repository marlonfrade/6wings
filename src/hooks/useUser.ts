import { useState, useEffect } from 'react'

interface UserResponse {
  id: string
  nome: string
  email: string
  avatar_url?: string
  created_at: string
  message?: string
}

interface UseUserReturn {
  /** The current user data. Null if not yet loaded */
  user: UserResponse | null
  /** Whether the user data is currently being fetched */
  isLoading: boolean
  /** Any error that occurred during fetching. Null if no error */
  error: string | null
  /** Function to manually trigger a refresh of the user data */
  refetchUser: () => Promise<void>
}

/**
 * Hook to fetch and manage user information
 *
 * @example
 * ```tsx
 * const { user, isLoading, error, refetchUser } = useUser();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 *
 * return (
 *   <div>
 *     <h1>Welcome, {user.nome}!</h1>
 *     <img src={user.avatar_url} alt="User avatar" />
 *   </div>
 * );
 * ```
 */
export function useUser(): UseUserReturn {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches the user data from the API
   * Sets loading state while fetching and handles any errors
   */
  const fetchUser = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/user')
      const data: UserResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user data')
      }

      setUser(data)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching user data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch user data on initial mount
  useEffect(() => {
    fetchUser()
  }, [])

  return { user, isLoading, error, refetchUser: fetchUser }
}
