import { useState, useCallback } from 'react'

interface UseClipboardOptions {
  /**
   * Timeout duration in milliseconds for resetting the copied state
   * @default 2000
   */
  timeout?: number
}

interface UseClipboardReturn {
  /**
   * Current copied state
   */
  copied: boolean

  /**
   * Function to copy text to clipboard
   */
  copy: (text: string) => Promise<void>

  /**
   * Function to reset copied state
   */
  reset: () => void
}

/**
 * Hook for copying text to clipboard with timeout feedback
 * @param options Configuration options
 * @returns Object containing copied state and copy function
 */
export function useClipboard(
  options: UseClipboardOptions = {}
): UseClipboardReturn {
  const { timeout = 2000 } = options
  const [copied, setCopied] = useState(false)

  const reset = useCallback(() => {
    setCopied(false)
  }, [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)

        // Reset copied state after timeout
        setTimeout(() => {
          reset()
        }, timeout)
      } catch (error) {
        console.error('Failed to copy text to clipboard:', error)
      }
    },
    [timeout, reset]
  )

  return {
    copied,
    copy,
    reset
  }
}
