import { useRef, RefObject } from 'react'
import { useEffect, useState } from 'react'

/**
 * Configuration options for the Intersection Observer
 * @interface UseIntersectionOptions
 */
interface UseIntersectionOptions {
  /** Threshold value between 0 and 1 indicating the percentage of the element that needs to be visible */
  threshold?: number
  /** The element that is used as the viewport for checking visibility of the target */
  root?: Element | null
  /** Margin around the root element */
  rootMargin?: string
}

/**
 * Return type for the useIntersection hook
 * @interface UseIntersectionReturn
 */
interface UseIntersectionReturn {
  /** Ref object to attach to the target element */
  ref: RefObject<HTMLElement | null>
  /** The intersection observer entry containing information about the intersection */
  entry: IntersectionObserverEntry | null
  /** Boolean indicating whether the element is currently intersecting with the viewport */
  isIntersecting: boolean
}

/**
 * A hook that uses the Intersection Observer API to detect when an element enters or leaves the viewport
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { ref, isIntersecting } = useIntersection({
 *     threshold: 0.5,
 *     rootMargin: '10px'
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       {isIntersecting ? 'Element is visible' : 'Element is hidden'}
 *     </div>
 *   );
 * };
 * ```
 *
 * @param options - Configuration options for the Intersection Observer
 * @param options.threshold - A number between 0 and 1 indicating the percentage of the element that needs to be visible (default: 1)
 * @param options.root - The element that is used as the viewport (default: null, which means the browser viewport)
 * @param options.rootMargin - Margin around the root element (default: '0px')
 * @returns An object containing the ref to attach to the target element, the intersection entry, and whether the element is intersecting
 */
export const useIntersection = (
  options: UseIntersectionOptions = {}
): UseIntersectionReturn => {
  const { threshold = 1, root = null, rootMargin = '0px' } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin])

  return {
    ref: elementRef,
    entry,
    isIntersecting: entry?.isIntersecting ?? false
  }
}
