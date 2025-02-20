import { useEffect, useState } from 'react'

/**
 * Hook that returns a debounced value that only updates after the specified delay
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns A tuple containing the debounced value and a function to immediately update it
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number = 500
): [T, () => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up the timeout to update the debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  // Function to immediately update the debounced value
  const forceUpdate = () => {
    setDebouncedValue(value)
  }

  return [debouncedValue, forceUpdate]
}
