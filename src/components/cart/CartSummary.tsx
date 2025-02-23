import { CartSummaryProps } from '@/types/cart'
import { memo } from 'react'
import { useFormatter, useTranslations, useLocale } from 'next-intl'

export const CartSummary = memo(function CartSummary({
  subtotal,
  cashbackPoints
}: CartSummaryProps) {
  const t = useTranslations('CartSummary')
  const format = useFormatter()
  const locale = useLocale()

  // Get currency based on locale
  const currency = locale === 'pt-BR' ? 'BRL' : 'USD'

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>{t('subtotal')}</p>
        <p>
          {format.number(subtotal, {
            style: 'currency',
            currency
          })}
        </p>
      </div>
      <p className="mt-0.5 text-xs text-gray-500">{t('shippingNote')}</p>
      <div className="mt-6 flex justify-between text-base font-semibold text-green-600">
        <p>{t('pointsRequired')}</p>
        <p>
          {format.number(cashbackPoints)} {t('points')}
        </p>
      </div>
    </div>
  )
})

CartSummary.displayName = 'CartSummary'
