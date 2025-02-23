import { useContext } from 'react'
import { CartContext } from '../providers/cartProvider'

/**
 * Custom hook to access the shopping cart context throughout the application.
 *
 * This hook provides access to cart-related state and functions from the CartContext.
 * It must be used within a CartProvider component in the component tree.
 *
 * @throws {Error} If the hook is used outside of a CartProvider
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { items, addItem, removeItem } = useCart();
 *
 *   return (
 *     <button onClick={() => addItem(product)}>
 *       Add to Cart ({items.length} items)
 *     </button>
 *   );
 * }
 * ```
 *
 * @returns {CartContextType} The cart context value containing cart state and methods
 */
export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export default useCart
