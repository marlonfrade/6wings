'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getSubCategories } from '@/services/subcategoryService'
import ProductsGrid, { Product } from './productsGrid'
import { Badge } from '@/components/ui/badge'

interface SubCategory {
  id: number
  nome: string
  categoria_id: number
  data_cadastro: string
  descricao?: string
}

interface SubCategoriesTabsProps {
  categoryId?: number
  onSubCategorySelect?: (data: { id: number; subcategory: SubCategory }) => void
  initialSubCategory?: SubCategory
  contentComponent?: React.ReactNode
  subCategories?: SubCategory[]
}

interface MenuSkeletonProps {
  count?: number
}

interface ProductsSkeletonProps {
  count?: number
}

// Interface para a resposta da API de contagem de produtos
interface ProductCountResponse {
  categories: {
    id: number | string
    name: string
    subcategories: {
      id: number | string
      name: string
      count: number
    }[]
  }[]
  status: string
}

// Função para buscar subcategorias baseadas na categoria selecionada
const fetchSubCategories = async (
  categoryId?: number
): Promise<SubCategory[]> => {
  if (!categoryId) return []

  // Substitua esta URL pela sua API real
  const response = await getSubCategories(categoryId.toString())

  if (!response) {
    throw new Error('Falha ao buscar subcategorias')
  }

  // Mapear os dados retornados para o formato esperado
  return response.map((item) => ({
    id: item.id,
    nome: item.nome,
    categoria_id: Number(item.categoria_id),
    data_cadastro: item.data_cadastro || new Date().toISOString(),
    ...(item.descricao && { descricao: item.descricao })
  }))
}

const fetchProducts = async (subCategoryId: number): Promise<Product[]> => {
  if (!subCategoryId) return []

  const response = await fetch(`/api/products?subCategoryId=${subCategoryId}`)

  if (!response.ok) {
    throw new Error('Falha ao buscar produtos')
  }

  return response.json()
}

// Função para buscar contagem de produtos por subcategoria
const fetchProductCounts = async (
  categoryId?: number
): Promise<{ [key: number]: number }> => {
  if (!categoryId) return {}

  // Usar a nova API de contagem de produtos
  const response = await fetch(`/api/products/count`)

  if (!response.ok) {
    throw new Error('Falha ao buscar contagem de produtos')
  }

  const data: ProductCountResponse = await response.json()

  // Encontrar a categoria correspondente
  const category = data.categories.find((cat) => Number(cat.id) === categoryId)

  if (!category) return {}

  // Mapear as subcategorias para o formato esperado
  const counts: { [key: number]: number } = {}
  category.subcategories.forEach((subcat) => {
    counts[Number(subcat.id)] = subcat.count
  })

  return counts
}

const MenuSkeleton: React.FC<MenuSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="mt-8 flex w-full flex-col space-y-1">
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex h-12 w-[250px] animate-pulse items-center justify-between pr-4"
          >
            <div className="h-4 w-20 rounded bg-gray-200"></div>
            <div className="h-7 w-10 rounded bg-gray-200"></div>
          </div>
        ))}
    </div>
  )
}

const ProductsSkeleton: React.FC<ProductsSkeletonProps> = ({ count = 6 }) => {
  // Determinar a classe de colunas com base no parâmetro
  const getColumnsClass = () => {
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className="w-full flex-1">
      <div className="relative w-full">
        {/* Simulação dos botões de navegação do carousel */}
        <div className="absolute -top-12 left-auto flex w-full justify-end gap-2">
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
        </div>

        {/* Conteúdo do carousel */}
        <div className="ml-0 sm:ml-4 lg:ml-8">
          <div className="w-full pl-4">
            <div className={`grid gap-4 ${getColumnsClass()}`}>
              {Array(count)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
                  >
                    {/* Imagem do produto */}
                    <div className="relative aspect-square animate-pulse bg-zinc-100 dark:bg-zinc-800">
                      {/* Botão de favorito */}
                      <div className="absolute right-2 top-2 h-9 w-9 rounded-full bg-white/80 dark:bg-black/80"></div>
                    </div>

                    {/* Informações do produto */}
                    <div className="flex flex-grow flex-col p-4">
                      {/* Categoria e subcategoria */}
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"></div>
                        <div className="h-3 w-1 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"></div>
                        <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"></div>
                      </div>

                      {/* Título */}
                      <div className="mb-2 h-5 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"></div>

                      {/* Descrição */}
                      <div className="mb-1 h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"></div>
                      <div className="mb-4 h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"></div>

                      {/* Preço e botão */}
                      <div className="mt-auto flex items-end justify-between">
                        <div className="h-6 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"></div>
                        <div className="h-8 w-8 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SubCategoriesTabs({
  categoryId,
  onSubCategorySelect,
  initialSubCategory,
  contentComponent
}: SubCategoriesTabsProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [colorMap, setColorMap] = useState<Record<number, string>>({})
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | undefined
  >(initialSubCategory?.id)

  // Resetar o selectedSubCategoryId quando o categoryId mudar
  useEffect(() => {
    setSelectedSubCategoryId(undefined)
  }, [categoryId])

  // Buscar subcategorias usando TanStack Query
  const { data: subCategories = [], isLoading: isLoadingSubCategories } =
    useQuery({
      queryKey: ['subcategories', categoryId],
      queryFn: () => fetchSubCategories(categoryId),
      enabled: !!categoryId,
      staleTime: 5 * 60 * 1000 // 5 minutos
    })

  // Buscar contagem de produtos usando TanStack Query
  const { data: productCounts = {}, isLoading: isLoadingProductCounts } =
    useQuery({
      queryKey: ['productCounts', categoryId],
      queryFn: () => fetchProductCounts(categoryId),
      enabled: !!categoryId,
      staleTime: 5 * 60 * 1000 // 5 minutos
    })

  // Buscar produtos da subcategoria selecionada
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<
    Product[]
  >({
    queryKey: ['products', selectedSubCategoryId, categoryId],
    queryFn: () => fetchProducts(selectedSubCategoryId as number),
    enabled: !!selectedSubCategoryId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    placeholderData: (previousData) => previousData // Substitui keepPreviousData
  })

  // Define color palette matching the UI using useMemo
  const colors = useMemo(
    () => ({
      primary: '#9B297D', // Purple
      secondary: '#3F51B5', // Blue
      accent1: '#8BC34A', // Green
      accent2: '#FFD700', // Yellow
      accent3: '#FF9B9B' // Pink
    }),
    []
  )

  // Efeito para inicializar as cores das subcategorias
  useEffect(() => {
    if (subCategories.length > 0) {
      // Usar a função de atualização do estado para evitar dependência circular
      setColorMap((prevColorMap) => {
        // Verificar se já temos cores para todas as subcategorias
        const needsUpdate = subCategories.some((item) => !prevColorMap[item.id])

        if (needsUpdate) {
          const newColorMap = { ...prevColorMap }
          subCategories.forEach((item) => {
            if (!newColorMap[item.id]) {
              const colorKeys = Object.keys(colors)
              const randomIndex = Math.floor(Math.random() * colorKeys.length)
              newColorMap[item.id] =
                colors[colorKeys[randomIndex] as keyof typeof colors]
            }
          })
          return newColorMap
        }

        return prevColorMap
      })
    }
  }, [subCategories, colors]) // Removido colorMap das dependências

  // Efeito separado para verificar o tamanho da tela
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Atualizar a subcategoria selecionada quando as subcategorias forem carregadas
  useEffect(() => {
    if (subCategories.length > 0 && !selectedSubCategoryId) {
      // Se temos initialSubCategory e ela existe nas subcategorias carregadas
      if (
        initialSubCategory &&
        subCategories.some((item) => item.id === initialSubCategory.id)
      ) {
        setSelectedSubCategoryId(initialSubCategory.id)
      } else {
        // Caso contrário, selecione a primeira subcategoria
        setSelectedSubCategoryId(subCategories[0].id)
      }
    }
  }, [subCategories, initialSubCategory, selectedSubCategoryId, categoryId])

  const handleTabChange = useCallback(
    (value: string) => {
      const id = parseInt(value.replace('tab-', ''), 10)
      setSelectedSubCategoryId(id)

      const selectedSubCategory = subCategories.find((item) => item.id === id)

      if (selectedSubCategory && onSubCategorySelect) {
        onSubCategorySelect({
          id,
          subcategory: selectedSubCategory
        })
      }
    },
    [onSubCategorySelect, subCategories]
  )

  const getColorForCount = (id: number): string => {
    return colorMap[id] || colors.primary
  }

  const isLoading = isLoadingSubCategories || isLoadingProductCounts

  // Determinar o valor padrão da tab
  const defaultTabValue = useMemo(() => {
    if (
      initialSubCategory &&
      subCategories.some((item) => item.id === initialSubCategory.id)
    ) {
      return `tab-${initialSubCategory.id}`
    }
    return subCategories.length > 0 ? `tab-${subCategories[0].id}` : 'tab-0'
  }, [initialSubCategory, subCategories])

  if (isLoading) {
    return (
      <div className="flex w-full flex-col lg:flex-row lg:gap-8">
        <div className="lg:w-48">
          <MenuSkeleton />
        </div>
        <ProductsSkeleton count={3} />
      </div>
    )
  }

  if (subCategories.length === 0) {
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">
          Nenhuma subcategoria encontrada
        </p>
      </div>
    )
  }

  return (
    <Tabs
      defaultValue={defaultTabValue}
      orientation={isMobile ? 'horizontal' : 'vertical'}
      className="flex w-full flex-col md:flex-row lg:mt-[48px]"
      onValueChange={handleTabChange}
    >
      <TabsList
        className={`${
          isMobile
            ? 'scrollbar-hide w-full flex-row justify-start overflow-x-auto border-b'
            : 'gap h-full flex-col rounded-none border-l bg-transparent p-0 md:w-64'
        }`}
      >
        {subCategories.map((item) => (
          <TabsTrigger
            key={item.id}
            value={`tab-${item.id}`}
            className={`relative py-[15px] pl-6 data-[state=active]:after:bg-primary ${
              isMobile ? 'min-w-[100px] flex-shrink-0' : 'w-full'
            } justify-start rounded-none transition-all duration-300 ease-in-out after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            <span className="flex w-full items-center justify-between gap-8">
              <span className="max-w-[150px] truncate font-montserrat text-base font-medium">
                {item.nome}
              </span>
              {productCounts[item.id] !== undefined && (
                <Badge
                  variant="default"
                  className="animate-fadeIn text-md ml-2 py-1 text-white transition-all duration-300"
                  style={{
                    backgroundColor: getColorForCount(item.id)
                  }}
                >
                  {productCounts[item.id]}
                </Badge>
              )}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="grow text-start">
        {subCategories.map((item) => (
          <TabsContent
            key={item.id}
            value={`tab-${item.id}`}
            className="data-[state=active]:animate-fadeInSlide m-0 p-0"
          >
            {contentComponent ? (
              contentComponent
            ) : isLoadingProducts ? (
              <ProductsSkeleton />
            ) : (
              <ProductsGrid products={products} />
            )}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
