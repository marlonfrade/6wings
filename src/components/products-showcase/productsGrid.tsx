'use client'

import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem
} from '@/components/ui/motion-primitives/carousel'
import { cn } from '@/lib/utils'
import { Heart, PlusIcon, ShoppingCart, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer
} from '@/components/ui/motion-primitives/morphing-dialog'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { useCurrencyRate } from '@/hooks/useCurrencyRate'
import { calculatePoints, formatPoints } from '@/lib/formatters'

export interface ProductImage {
  id: number
  image_base64: string
}

export interface Product {
  produto: {
    nome_categoria: string
    nome_subcategoria: string
    id: number
    titulo: string
    descricao: string
    categoria_id: number
    sub_categoria_id: number
    valor: string
    parceiro_id: number
    data_cadastro: string
    excluido: string
    imagens: ProductImage[]
  }
}

interface ProductsGridProps {
  products: Product[]
  className?: string
}

export const ProductsGrid = ({ products, className }: ProductsGridProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const { addToCart, cart } = useCart()
  const { rate, isLoading: isLoadingRate } = useCurrencyRate()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Se não houver produtos, não renderiza nada
  if (!products || products.length === 0) {
    return null
  }

  // Função para agrupar produtos em conjuntos de 3 (ou 1 para mobile)
  const groupProducts = (products: Product[], size: number) => {
    const groups = []
    for (let i = 0; i < products.length; i += size) {
      groups.push(products.slice(i, i + size))
    }
    return groups
  }

  const isInCart = (productId: number) => {
    return cart.some((item) => String(item.id) === String(productId))
  }

  const handleAddToCart = (product: Product) => {
    const priceInBRL = parseFloat(product.produto.valor)
    const pointsValue = rate ? calculatePoints(priceInBRL, rate) : priceInBRL

    addToCart({
      id: product.produto.id,
      title: product.produto.titulo,
      description: product.produto.descricao,
      price: priceInBRL,
      quantity: 1,
      image:
        product.produto.imagens && product.produto.imagens.length > 0
          ? product.produto.imagens[0].image_base64
          : '',
      pontos: pointsValue
    })
  }

  const groupSize = isMobile ? 1 : 3
  const productGroups = groupProducts(products, groupSize)

  // Função para calcular e formatar o valor em pontos
  const getPointsValue = (valueInBRL: string) => {
    const priceInBRL = parseFloat(valueInBRL)
    if (isLoadingRate) {
      return (
        <span className="flex items-center gap-1">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Calculando...</span>
        </span>
      )
    }

    const pointsValue = rate ? calculatePoints(priceInBRL, rate) : priceInBRL
    return <span>{formatPoints(pointsValue)}</span>
  }

  return (
    <div className={cn('w-full', className)}>
      <Carousel className="w-full">
        <CarouselContent className="ml-0 sm:ml-4 lg:ml-8">
          {productGroups.map((group, groupIndex) => (
            <CarouselItem key={groupIndex} className="w-full pl-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {group.map((product) => (
                  <MorphingDialog
                    key={product.produto.id}
                    transition={{
                      type: 'spring',
                      bounce: 0.05,
                      duration: 0.25
                    }}
                  >
                    <MorphingDialogTrigger
                      style={{
                        borderRadius: '12px'
                      }}
                      className="flex flex-col overflow-hidden"
                    >
                      <div className="relative aspect-square">
                        {product.produto.imagens &&
                        product.produto.imagens.length > 0 ? (
                          <MorphingDialogImage
                            src={`data:image/jpeg;base64,${product.produto.imagens[0].image_base64}`}
                            alt={product.produto.titulo}
                            className="h-full max-h-[350px] w-full rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                            <span className="text-zinc-400">Sem imagem</span>
                          </div>
                        )}
                        <button className="group absolute right-2 top-2 rounded-full border border-secondary bg-white/80 p-2 hover:border-primary hover:bg-white">
                          <Heart className="h-5 w-5 text-secondary group-hover:text-primary" />
                        </button>
                      </div>
                      <div className="flex flex-grow flex-col p-4">
                        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                          <span>{product.produto.nome_categoria}</span>
                          <span>•</span>
                          <span>{product.produto.nome_subcategoria}</span>
                        </div>
                        <MorphingDialogTitle className="mb-2 line-clamp-1 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                          {product.produto.titulo}
                        </MorphingDialogTitle>
                        <MorphingDialogSubtitle className="mb-4 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {product.produto.descricao}
                        </MorphingDialogSubtitle>
                        <div className="mt-auto flex items-end justify-between">
                          <div className="mb-3 text-xl font-bold text-primary">
                            {getPointsValue(product.produto.valor)}
                          </div>
                          <button
                            type="button"
                            className="relative ml-1 flex h-8 w-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
                            aria-label="Adicionar ao carrinho"
                          >
                            <PlusIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </MorphingDialogTrigger>
                    <MorphingDialogContainer>
                      <MorphingDialogContent
                        style={{
                          borderRadius: '24px'
                        }}
                        className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 sm:w-[550px]"
                      >
                        {product.produto.imagens &&
                        product.produto.imagens.length > 0 ? (
                          <MorphingDialogImage
                            src={`data:image/jpeg;base64,${product.produto.imagens[0].image_base64}`}
                            alt={product.produto.titulo}
                            className="h-64 w-full object-cover sm:h-[350px]"
                          />
                        ) : (
                          <div className="flex h-64 w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800 sm:h-80">
                            <span className="text-zinc-400">Sem imagem</span>
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                            <span>{product.produto.nome_categoria}</span>
                            <span>•</span>
                            <span>{product.produto.nome_subcategoria}</span>
                          </div>
                          <MorphingDialogTitle className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                            {product.produto.titulo}
                          </MorphingDialogTitle>
                          <MorphingDialogSubtitle className="text-lg font-bold text-primary dark:text-primary">
                            {getPointsValue(product.produto.valor)}
                          </MorphingDialogSubtitle>
                          <MorphingDialogDescription
                            disableLayoutAnimation
                            variants={{
                              initial: { opacity: 0, scale: 0.8, y: 20 },
                              animate: { opacity: 1, scale: 1, y: 0 },
                              exit: { opacity: 0, scale: 0.8, y: 20 }
                            }}
                          >
                            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                              {product.produto.descricao.length > 200
                                ? `${product.produto.descricao.substring(0, 200)}...`
                                : product.produto.descricao}
                            </p>
                            <div className="mt-6">
                              <Button
                                onClick={() => handleAddToCart(product)}
                                disabled={isInCart(product.produto.id)}
                                className={`w-full ${isInCart(product.produto.id) ? 'bg-primary text-white' : 'bg-transparent text-secondary'} rounded-full border border-secondary py-[24px] text-base font-medium hover:border-primary hover:bg-transparent hover:text-primary`}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                {isInCart(product.produto.id)
                                  ? 'Adicionado ao Carrinho'
                                  : 'Adicionar ao Carrinho'}
                              </Button>
                            </div>
                          </MorphingDialogDescription>
                        </div>
                        <MorphingDialogClose className="text-white hover:text-gray-300" />
                      </MorphingDialogContent>
                    </MorphingDialogContainer>
                  </MorphingDialog>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation
          className="absolute -top-12 left-auto w-full justify-end gap-2"
          classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
          alwaysShow
        />
      </Carousel>
    </div>
  )
}

export default ProductsGrid
