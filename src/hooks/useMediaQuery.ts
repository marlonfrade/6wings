import { useState, useEffect } from 'react'

/**
 * Custom hook that returns whether a media query matches the current viewport
 * @param query - The media query to check (e.g. '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with the current match state
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    // Default to false on server-side
    return false
  })

  useEffect(() => {
    // Return early if window is not defined (server-side)
    if (typeof window === 'undefined') {
      return
    }

    // Create media query list
    const mediaQuery = window.matchMedia(query)

    // Update matches state when media query changes
    const updateMatches = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Set initial matches
    setMatches(mediaQuery.matches)

    // Add event listener
    mediaQuery.addEventListener('change', updateMatches)

    // Cleanup: remove event listener
    return () => {
      mediaQuery.removeEventListener('change', updateMatches)
    }
  }, [query]) // Re-run effect if query changes

  return matches
}
