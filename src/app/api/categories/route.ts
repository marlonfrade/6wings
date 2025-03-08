import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'
import { PRODUCT_CATEGORIES } from '@/lib/constants'

// Interface para a categoria retornada pela API
interface CategoryResponse {
  id: number
  nome: string
  data_cadastro: string
}

export async function GET(): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    const endpoint = `${apiUrl}/fetchAllCategories`
    const response = await axios.get(endpoint)

    // Mapeamento entre nomes em português e as constantes
    const categoryMapping: Record<string, keyof typeof PRODUCT_CATEGORIES> = {
      Produtos: 'PRODUTOS',
      Serviços: 'SERVICOS',
      Experiências: 'EXPERIENCIAS',
      Doações: 'DOACOES'
    }

    // Filtrar apenas as categorias válidas
    const filteredCategories = response.data.filter(
      (category: CategoryResponse) =>
        Object.keys(categoryMapping).includes(category.nome)
    )

    // Definir a ordem desejada das categorias
    const categoryOrder = ['Produtos', 'Serviços', 'Experiências', 'Doações']

    // Ordenar as categorias conforme a ordem definida
    const sortedCategories = [...filteredCategories].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.nome)
      const indexB = categoryOrder.indexOf(b.nome)
      return indexA - indexB
    })

    return NextResponse.json(sortedCategories, { status: 200 })
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.response?.data },
        { status: error.response?.status }
      )
    }
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
