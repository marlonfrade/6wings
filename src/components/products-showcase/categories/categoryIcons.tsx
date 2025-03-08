'use client'

import { ReactNode } from 'react'
import { DonationIcon } from '@/components/products-showcase/categories/icons/donationIcon'
import { ProductIcon } from '@/components/products-showcase/categories/icons/productIcon'
import { ServiceIcon } from '@/components/products-showcase/categories/icons/serviceIcon'
import { ExperienceIcon } from '@/components/products-showcase/categories/icons/experienceIcon'

/**
 * Retorna o ícone correspondente à categoria
 * @param categoryName Nome da categoria
 * @returns Componente de ícone
 */
export function getCategoryIcon(
  active: boolean,
  categoryName: string
): ReactNode {
  switch (categoryName.toLowerCase()) {
    case 'produtos':
      return <ProductIcon active={active} />
    case 'serviços':
      return <ServiceIcon active={active} />
    case 'experiências':
      return <ExperienceIcon active={active} />
    case 'doações':
      return <DonationIcon active={active} />
    default:
      return <ProductIcon active={active} />
  }
}
