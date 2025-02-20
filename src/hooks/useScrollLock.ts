import { useCallback, useEffect, useState } from 'react'

/**
 * Custom hook to manage scroll locking functionality
 * @returns [boolean, (value: boolean | ((prevState: boolean) => boolean)) => void]
 * Tuple containing current scroll lock state and setter function
 */
export const useScrollLock = (): [
  boolean,
  (value: boolean | ((prevState: boolean) => boolean)) => void
] => {
  const [locked, setLocked] = useState<boolean>(false)

  // Helper to add/remove scroll lock class
  const toggleScrollLock = useCallback((shouldLock: boolean) => {
    document.body.style.overflow = shouldLock ? 'hidden' : ''
    document.body.style.paddingRight = shouldLock
      ? `${window.innerWidth - document.documentElement.clientWidth}px`
      : ''
  }, [])

  // Effect to handle scroll lock changes
  useEffect(() => {
    toggleScrollLock(locked)

    // Cleanup function to remove scroll lock when component unmounts
    return () => {
      toggleScrollLock(false)
    }
  }, [locked, toggleScrollLock])

  return [locked, setLocked]
}
