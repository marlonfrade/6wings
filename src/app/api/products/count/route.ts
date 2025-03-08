import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

// Helper function for error handling
const handleError = (
  error: AxiosError | Error,
  operation: string
): NextResponse => {
  if (axios.isAxiosError(error) && error.response) {
    return NextResponse.json(
      {
        ...error.response.data,
        operation: `Error during ${operation}`
      },
      {
        status: error.response.status
      }
    )
  }
  return NextResponse.json(
    {
      error: 'Internal Server Error',
      message: error.message,
      operation: `Error during ${operation}`
    },
    { status: 500 }
  )
}

// Interface para produtos
interface Product {
  id: string | number
  titulo: string
  descricao: string
  categoria_id: string | number
  sub_categoria_id: string | number
  valor: string
  parceiro_id: string | number
  data_cadastro: string
  excluido: string
  pontos: number
  // outros campos do produto...
}

// Interface para categorias
interface Category {
  id: string
  nome: string
}

// Interface para subcategorias
interface Subcategory {
  id: string
  nome: string
  categoria_id: string
}

// Interface para o resultado da contagem
interface CategoryCount {
  id: string
  name: string
  subcategories: {
    id: string
    name: string
    count: number
  }[]
}

export async function GET(): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      )
    }

    // Buscar todas as categorias
    const categoriesResponse = await axios.get(`${apiUrl}/fetchAllCategories`)
    const categories: Category[] = categoriesResponse.data

    // Buscar todas as subcategorias
    const subcategoriesPromises = categories.map((category) =>
      axios.get(`${apiUrl}/fetchSubCategories?id=${category.id}`)
    )
    const subcategoriesResponses = await Promise.all(subcategoriesPromises)

    // Mapear subcategorias por categoria
    const subcategoriesByCategory: Record<string, Subcategory[]> = {}
    categories.forEach((category, index) => {
      subcategoriesByCategory[category.id] = subcategoriesResponses[index].data
    })

    // Buscar todos os produtos - agora recebemos diretamente o array de produtos
    const productsResponse = await axios.get(`${apiUrl}/fetchAllProducts`)

    // Garantir que products seja sempre um array válido
    let products: Product[] = []

    if (Array.isArray(productsResponse.data)) {
      products = productsResponse.data
    } else if (
      productsResponse.data &&
      typeof productsResponse.data === 'object'
    ) {
      // Se for um objeto único ou um objeto com uma propriedade que contém o array
      // Tenta encontrar um array em alguma propriedade do objeto
      const possibleArrays = Object.values(productsResponse.data).filter(
        Array.isArray
      )
      if (possibleArrays.length > 0) {
        // Usa o primeiro array encontrado
        products = possibleArrays[0] as Product[]
      } else {
        // Se não encontrar arrays, trata o objeto como um único produto
        products = [productsResponse.data]
      }
    }

    // Verificar se o array não está vazio
    if (products.length === 0) {
      return NextResponse.json(
        {
          error: 'No products found',
          message: 'The API returned no products or an invalid format'
        },
        { status: 404 }
      )
    }

    // Inicializar o resultado
    const result: CategoryCount[] = categories.map((category) => ({
      id: String(category.id),
      name: category.nome,
      subcategories:
        subcategoriesByCategory[category.id]?.map((subcategory) => ({
          id: String(subcategory.id),
          name: subcategory.nome,
          count: 0
        })) || []
    }))

    // Contar produtos por subcategoria
    products.forEach((product) => {
      const categoryId = String(product.categoria_id)
      const subcategoryId = String(product.sub_categoria_id)

      const categoryIndex = result.findIndex((cat) => cat.id === categoryId)
      if (categoryIndex !== -1) {
        const subcategoryIndex = result[categoryIndex].subcategories.findIndex(
          (subcat) => subcat.id === subcategoryId
        )
        if (subcategoryIndex !== -1) {
          result[categoryIndex].subcategories[subcategoryIndex].count++
        }
      }
    })

    return NextResponse.json(
      {
        categories: result,
        status: 'success'
      },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error as Error, 'counting products by subcategory')
  }
}

// Nova função para processar diretamente um array de produtos
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      )
    }

    // Obter o array de produtos do corpo da requisição
    const requestData = await request.json()

    // Verificar se requestData é válido
    if (!requestData) {
      return NextResponse.json(
        { error: 'Invalid request data', message: 'No data provided' },
        { status: 400 }
      )
    }

    // Garantir que products seja sempre um array válido
    let products: Product[] = []

    if (Array.isArray(requestData)) {
      products = requestData
    } else if (typeof requestData === 'object') {
      products = [requestData]
    } else {
      return NextResponse.json(
        {
          error: 'Invalid data format',
          message: 'Expected an array of products or a single product object'
        },
        { status: 400 }
      )
    }

    // Verificar se o array não está vazio
    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Empty products array', message: 'No products provided' },
        { status: 400 }
      )
    }

    // Buscar todas as categorias
    const categoriesResponse = await axios.get(`${apiUrl}/fetchAllCategories`)
    const categories: Category[] = categoriesResponse.data

    // Buscar todas as subcategorias
    const subcategoriesPromises = categories.map((category) =>
      axios.get(`${apiUrl}/fetchSubCategories?id=${category.id}`)
    )
    const subcategoriesResponses = await Promise.all(subcategoriesPromises)

    // Mapear subcategorias por categoria
    const subcategoriesByCategory: Record<string, Subcategory[]> = {}
    categories.forEach((category, index) => {
      subcategoriesByCategory[category.id] = subcategoriesResponses[index].data
    })

    // Inicializar o resultado
    const result: CategoryCount[] = categories.map((category) => ({
      id: String(category.id),
      name: category.nome,
      subcategories:
        subcategoriesByCategory[category.id]?.map((subcategory) => ({
          id: String(subcategory.id),
          name: subcategory.nome,
          count: 0
        })) || []
    }))

    // Contar produtos por subcategoria
    products.forEach((product) => {
      const categoryId = String(product.categoria_id)
      const subcategoryId = String(product.sub_categoria_id)

      const categoryIndex = result.findIndex((cat) => cat.id === categoryId)
      if (categoryIndex !== -1) {
        const subcategoryIndex = result[categoryIndex].subcategories.findIndex(
          (subcat) => subcat.id === subcategoryId
        )
        if (subcategoryIndex !== -1) {
          result[categoryIndex].subcategories[subcategoryIndex].count++
        }
      }
    })

    return NextResponse.json(
      {
        categories: result,
        status: 'success'
      },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error as Error, 'processing products array')
  }
}
