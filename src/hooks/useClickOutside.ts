import { useEffect, useRef, RefObject } from 'react'

/**
 * Event handler type for mouse and touch events
 */
type Handler = (event: MouseEvent | TouchEvent) => void

/**
 * A custom React hook that detects clicks outside of a specified element.
 *
 * @template T - The HTML element type that the ref will be attached to (defaults to HTMLElement)
 * @param handler - Callback function to be called when a click outside is detected
 * @param mouseEvent - The mouse event to listen for ('mousedown' or 'mouseup', defaults to 'mousedown')
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
 * @remarks
 * - The hook sets up event listeners for both mouse and touch events
 * - Cleanup is handled automatically when the component unmounts
 * - The handler won't be called when clicking inside the referenced element or its children
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current

      // Do nothing if clicking ref's element or descendent elements
      if (!element || element.contains(event.target as Node)) {
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
  }, [handler, mouseEvent])

  return ref
}
