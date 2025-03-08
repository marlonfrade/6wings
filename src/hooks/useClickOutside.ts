import { useEffect, useRef, RefObject } from 'react'

/**
 * Event handler type for mouse and touch events
 */
type Handler = (event: MouseEvent | TouchEvent) => void

/**
 * Options for the useClickOutside hook
 */
export interface UseClickOutsideOptions {
  /**
   * The mouse event to listen for ('mousedown' or 'mouseup')
   * @default 'mousedown'
   */
  mouseEvent?: 'mousedown' | 'mouseup'

  /**
   * Whether to enable the click outside detection
   * @default true
   */
  enabled?: boolean

  /**
   * Selector for elements that should be ignored when clicked
   * Clicks on these elements won't trigger the handler even if they're outside the ref
   */
  ignoreElements?: string
}

/**
 * A custom React hook that detects clicks outside of a specified element.
 *
 * @template T - The HTML element type that the ref will be attached to (defaults to HTMLElement)
 * @param handler - Callback function to be called when a click outside is detected
 * @param options - Configuration options for the hook
 * @returns RefObject that should be attached to the element you want to detect clicks outside of
 *
 * @example
 * ```tsx
 * const Modal = ({ onClose }) => {
 *   const modalRef = useClickOutside<HTMLDivElement>(() => {
 *     onClose();
 *   });
 *
 *   return (
 *     <div ref={modalRef} className="modal">
 *       Modal content
 *     </div>
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // With options
 * const modalRef = useClickOutside<HTMLDivElement>(() => {
 *   onClose();
 * }, {
 *   mouseEvent: 'mouseup',
 *   enabled: isOpen,
 *   ignoreElements: '.ignore-click, .dialog-trigger'
 * });
 * ```
 *
 * @remarks
 * - The hook sets up event listeners for both mouse and touch events
 * - Cleanup is handled automatically when the component unmounts
 * - The handler won't be called when clicking inside the referenced element or its children
 * - You can disable the hook temporarily with the enabled option
 * - You can ignore specific elements with the ignoreElements option
 */
export default function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  options?: UseClickOutsideOptions | 'mousedown' | 'mouseup'
): RefObject<T | null> {
  const ref = useRef<T>(null)

  // Handle backwards compatibility with the old API
  const normalizedOptions: UseClickOutsideOptions =
    typeof options === 'string'
      ? { mouseEvent: options }
      : { mouseEvent: 'mousedown', enabled: true, ...options }

  const {
    mouseEvent = 'mousedown',
    enabled = true,
    ignoreElements
  } = normalizedOptions

  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current

      // Do nothing if clicking ref's element or descendent elements
      if (!element || element.contains(event.target as Node)) {
        return
      }

      // Check if the click was on an ignored element
      if (ignoreElements && (event.target as Element).closest(ignoreElements)) {
        return
      }

      handler(event)
    }

    document.addEventListener(mouseEvent, listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener(mouseEvent, listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler, mouseEvent, enabled, ignoreElements])

  return ref
}
