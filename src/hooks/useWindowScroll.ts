import { useState, useEffect, useCallback } from 'react'

interface ScrollState {
  windowScroll: number
  isSticky: boolean
}

/**
 * Custom hook to handle window scroll behavior with TypeScript support
 * @param threshold - The scroll threshold to determine sticky state (default: 0)
 * @returns Object containing current scroll position and sticky state
 */
const useWindowScroll = (threshold: number = 0): ScrollState => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    windowScroll: 0,
    isSticky: false
  })

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setScrollState({
      windowScroll: scrollY,
      isSticky: scrollY > threshold
    })
  }, [threshold])

  useEffect(() => {
    let rafId: number

    const debouncedHandleScroll = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      rafId = window.requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true })

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [handleScroll])

  return scrollState
}

export default useWindowScroll
