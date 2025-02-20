/**
 * Represents an individual item in the shopping cart
 */
export interface CartItem {
  id: string | number
  title: string
  description: string
  price: number
  quantity: number
  image: string
  pontos?: number
}

/**
 * Represents the summary of cart totals
 */
export interface CartSummary {
  subtotal: number
  cashbackPoints: number
}

/**
 * Props interface for CartItem component
 */
export interface CartItemProps {
  item: {
    id: string | number
    title: string
    description: string
    price: number
    image: string
    quantity: number
  }
}

/**
 * Props interface for CartSummary component
 */
export interface CartSummaryProps {
  subtotal: number
  cashbackPoints: number
}
