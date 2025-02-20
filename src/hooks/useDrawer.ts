'use client'

import { useDrawer as useDrawerContext } from '@/providers/drawerProvider'

/**
 * Interface defining the operations available for drawer management
 * @interface DrawerOperations
 */
export interface DrawerOperations {
  /** Current state of the drawer - true if open, false if closed */
  isDrawerOpen: boolean
  /** Function to open the drawer */
  openDrawer: () => void
  /** Function to close the drawer */
  closeDrawer: () => void
  /** Function to toggle the drawer's open/closed state */
  toggleDrawer: () => void
}

/**
 * A custom hook for managing drawer state and operations
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { isDrawerOpen, openDrawer, closeDrawer, toggleDrawer } = useDrawer();
 *
 *   return (
 *     <button onClick={toggleDrawer}>
 *       {isDrawerOpen ? 'Close Drawer' : 'Open Drawer'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @returns {DrawerOperations} An object containing the drawer state and control functions
 * @throws {Error} If used outside of a DrawerProvider context
 */
export const useDrawer = (): DrawerOperations => {
  const drawer = useDrawerContext()
  return drawer
}
