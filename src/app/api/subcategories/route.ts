import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import axios from 'axios'

// Definição do tipo de erro da API
interface ApiError {
  response?: {
    status: number
    data: unknown
  }
  message: string
}

// Função para tratamento de erros
function handleError(error: ApiError): NextResponse {
  console.error('Erro na API:', error)

  if (error.response) {
    return NextResponse.json(
      { error: error.response.data || 'Erro no servidor' },
      { status: error.response.status || 500 }
    )
  }

  return NextResponse.json(
    { error: error.message || 'Erro interno do servidor' },
    { status: 500 }
  )
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')

  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']

    if (!categoryId) {
      return NextResponse.json(
        { error: 'ID da categoria é obrigatório' },
        { status: 400 }
      )
    }

    const endpoint = `${apiUrl}/fetchSubCategories?id=${categoryId}`
    const response = await axios.get(endpoint)

    return NextResponse.json(response.data)
  } catch (error) {
    return handleError(error as ApiError)
  }
}
