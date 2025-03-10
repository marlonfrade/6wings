import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

// Função auxiliar para tratamento de erros
const handleError = (
  error: AxiosError | Error,
  operation: string
): NextResponse => {
  if (axios.isAxiosError(error) && error.response) {
    return NextResponse.json(
      {
        ...error.response.data,
        operation: `Erro durante ${operation}`
      },
      {
        status: error.response.status
      }
    )
  }
  return NextResponse.json(
    {
      error: 'Erro Interno do Servidor',
      message: error.message,
      operation: `Erro durante ${operation}`
    },
    { status: 500 }
  )
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'URL da API não configurada' },
        { status: 500 }
      )
    }

    const productId = params.id

    // Buscar detalhes do produto
    const response = await axios.get(
      `${apiUrl}/fetchProductById?id=${productId}`
    )
    const data = response.data

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return handleError(error as Error, 'busca de produto por ID')
  }
}
