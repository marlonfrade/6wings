'use client'
import { useEffect, useState } from 'react'

/**
 * A hook that tracks and returns the current URL hash value.
 *
 * @returns {string} The current URL hash value (including the # symbol)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const hash = useHash();
 *
 *   return (
 *     <div>
 *       Current hash: {hash}
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Updates when the hash changes via direct manipulation or browser navigation
 * - Handles both 'hashchange' and 'popstate' events
 * - Safely handles server-side rendering with 'use client' directive
 */
export const useHash = (): string => {
  const [hash, setHash] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onHashChange = () => {
        setHash(window.location.hash)
      }

      setHash(window.location.hash)

      window.addEventListener('hashchange', onHashChange)
      window.addEventListener('popstate', onHashChange)

      return () => {
        window.removeEventListener('hashchange', onHashChange)
        window.removeEventListener('popstate', onHashChange)
      }
    }
  }, [])

  return hash
}
