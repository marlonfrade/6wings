import { CartSummaryProps } from '@/types/cart'
import { memo } from 'react'

const CartSummary = memo(function CartSummary({
  subtotal,
  cashbackPoints
}: CartSummaryProps) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(subtotal)}
        </p>
      </div>
      <p className="mt-0.5 text-xs text-gray-500">
        Frete e impostos calculados na finalização da compra.
      </p>
      <div className="mt-6 flex justify-between text-base font-semibold text-green-600">
        <p>Total de pontos necessários</p>
        <p>{new Intl.NumberFormat('pt-BR').format(cashbackPoints)} pontos</p>
      </div>
    </div>
  )
})

CartSummary.displayName = 'CartSummary'

export default CartSummary
