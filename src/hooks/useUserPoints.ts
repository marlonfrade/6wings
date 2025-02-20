import { useState, useEffect } from 'react'

interface UserPointsResponse {
  pontos_acumulados: number
  message?: string
}

interface UseUserPointsReturn {
  /** The current number of points for the user. Null if not yet loaded */
  userPoints: number | null
  /** Whether the points are currently being fetched */
  isLoading: boolean
  /** Any error that occurred during fetching. Null if no error */
  error: string | null
  /** Function to manually trigger a refresh of the points */
  refetchPoints: () => Promise<void>
}

/**
 * Hook to fetch and manage user points
 *
 * @example
 * ```tsx
 * const { userPoints, isLoading, error, refetchPoints } = useUserPoints();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 *
 * return <div>You have {userPoints} points</div>;
 * ```
 */
export function useUserPoints(): UseUserPointsReturn {
  const [userPoints, setUserPoints] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches the user's points from the API
   * Sets loading state while fetching and handles any errors
   */
  const fetchUserPoints = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/user/points')
      const data: UserPointsResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch points')
      }

      setUserPoints(data.pontos_acumulados || 0)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching user points:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch points on initial mount
  useEffect(() => {
    fetchUserPoints()
  }, [])

  return { userPoints, isLoading, error, refetchPoints: fetchUserPoints }
}
