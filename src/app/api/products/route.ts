import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'
// import { getSession } from '@/lib/session'
// import { IronSession } from 'iron-session'

// type SessionData = {
//   user?: {
//     id: string
//     name?: string
//     email?: string
//   }
//   token?: string
// }

// type CustomSession = IronSession<SessionData>

interface ProductData {
  titulo: string
  descricao: string
  categoria_id: string
  sub_categoria_id: string
  valor: number
  imagens: string[]
  partner_id?: string
}

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

// Updated token validation function
// const validateTokenAndSession = async (): Promise<NextResponse> => {
//   try {
//     const session = (await getSession()) as CustomSession
//     const user = session?.user
//     const token = session?.token

//     if (!user || !token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     return NextResponse.json({ token, userId: user.id }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message || 'Session validation failed' },
//       { status: 401 }
//     )
//   }
// }

// Helper function to validate required fields and structure
const validateProductData = (
  body: Partial<ProductData>
): NextResponse | null => {
  const requiredFields = [
    'titulo',
    'descricao',
    'categoria_id',
    'sub_categoria_id',
    'valor',
    'imagens'
  ] as const

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      )
    }
  }

  if (!Array.isArray(body.imagens) || body.imagens.length === 0) {
    return NextResponse.json(
      { error: 'imagens must be a non-empty array' },
      { status: 400 }
    )
  }

  return null
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const subcategoryId = searchParams.get('subcategoryId')

    let endpoint = `${apiUrl}/fetchAllProducts`
    if (subcategoryId) {
      endpoint = `${apiUrl}/fetchProductsBySubCategory?id=${subcategoryId}`
    }

    const response = await axios.get(endpoint)
    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    return handleError(error as Error, 'fetching products')
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      )
    }

    // const sessionResponse = await validateTokenAndSession()
    //  if (!sessionResponse.ok) return sessionResponse

    // const sessionData = await sessionResponse.json()
    const body = await request.json()

    const dataValidationResult = validateProductData(body)
    if (dataValidationResult) return dataValidationResult

    const productData: ProductData = {
      ...body
      // partner_id: sessionData.userId
    }

    const response = await axios.post(`${apiUrl}/addNewProduct`, productData, {
      headers: {
        // Authorization: `Bearer ${sessionData.token}`
      }
    })

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    return handleError(error as Error, 'creating new product')
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // const sessionResponse = await validateTokenAndSession()
    // if (!sessionResponse.ok) return sessionResponse

    // const sessionData = await sessionResponse.json()
    const body = await request.json()

    const validationError = validateProductData(body)
    if (validationError) return validationError

    const productData: ProductData = {
      ...body
      // partner_id: body.partner_id || sessionData.userId
    }

    const response = await axios.put(
      `${apiUrl}/updateProduct?id=${id}`,
      productData,
      {
        headers: {
          // Authorization: `Bearer ${sessionData.token}`
        }
      }
    )

    return NextResponse.json(
      {
        status: 'success',
        message: 'Produto atualizado com sucesso',
        data: response.data
      },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error as Error, 'updating product')
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // const sessionResponse = await validateTokenAndSession()
    // if (!sessionResponse.ok) return sessionResponse

    // const sessionData = await sessionResponse.json()

    const response = await axios.delete(`${apiUrl}/deleteProduct?id=${id}`, {
      headers: {
        // Authorization: `Bearer ${sessionData.token}`
      }
    })

    return NextResponse.json(
      {
        status: 'success',
        message: 'Produto deletado com sucesso',
        data: response.data
      },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error as Error, 'deleting product')
  }
}
