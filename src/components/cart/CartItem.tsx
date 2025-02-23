import Image from 'next/image'
import { useCart } from '@/providers/cartProvider'
import { Trash2, Plus, Minus } from 'lucide-react'
import { CartItemProps } from '@/types/cart'

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(String(item.id), newQuantity)
    } else {
      handleRemoveItem()
    }
  }

  const handleRemoveItem = () => {
    removeFromCart(String(item.id))
  }

  return (
    <div className="mb-6 mt-8 flex items-center border-b pb-4">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={
            item?.image?.includes('base64')
              ? item.image
              : `data:image/jpeg;base64,${item.image}`
          }
          alt={item.title}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
        <p className="mt-1 text-xs text-gray-500">
          {item.description.length > 50
            ? `${item.description.substring(0, 50)}...`
            : item.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold">
            R$ {parseFloat(String(item.price)).toFixed(2)}
          </p>
          <div className="flex items-center">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span className="mx-2 w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleRemoveItem}
        className="ml-4 mt-12 rounded-full p-1 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
        aria-label="Remover item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}
