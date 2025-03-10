'use client'

import { FC } from 'react'
import Typography from '@/components/typography'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PromotionCardProps {
  produto: {
    id: string
    titulo: string
    descricao: string
    valor: number | string
    imagens: {
      image_base64: string
    }[]
  }
  porcentagem_valor: number
}

const PromotionCard: FC<PromotionCardProps> = ({
  produto,
  porcentagem_valor
}) => {
  // Convert valor to number if it's a string
  const valorAsNumber =
    typeof produto.valor === 'string'
      ? parseFloat(produto.valor)
      : produto.valor

  const discountedPrice =
    valorAsNumber - valorAsNumber * (porcentagem_valor / 100)

  return (
    <Link
      href={`/produto/${produto.id}`}
      className="group flex w-full flex-col justify-between"
    >
      <div>
        <div className="flex aspect-[3/2] overflow-clip rounded-xl">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
              <Image
                src={
                  `data:image/jpeg;base64,${produto.imagens[0].image_base64}` ||
                  'https://via.placeholder.com/400x300'
                }
                alt={produto.titulo}
                className="h-full w-full object-cover object-center"
                width={400}
                height={300}
              />
              {porcentagem_valor > 0 && (
                <div className="absolute right-4 top-4 rounded-md bg-primary px-2 py-1 font-bold text-white">
                  {porcentagem_valor}% OFF
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 line-clamp-2 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
        {produto.titulo}
      </div>
      <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-6 md:text-base">
        {produto.descricao}
      </div>
      <div className="mb-4 flex flex-col">
        {porcentagem_valor > 0 && (
          <span className="text-sm text-muted-foreground line-through">
            R$ {valorAsNumber.toFixed(2)}
          </span>
        )}
        <Typography variant="promotion-card-price" className="text-primary">
          R$ {discountedPrice.toFixed(2)}
        </Typography>
      </div>
      <div className="flex items-center text-sm">
        Ver produto{' '}
        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default PromotionCard
