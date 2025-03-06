import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ stateId: string }> }
) {
  try {
    const { stateId } = await params
    const apiUrl = process.env.API_URL
    const { data } = await axios.get(`${apiUrl}/fetchCities`, {
      params: {
        id: stateId
      }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar cidades:', error)
    const axiosError = error as AxiosError
    return NextResponse.json(
      { error: 'Falha ao buscar cidades' },
      { status: axiosError?.response?.status || 500 }
    )
  }
}
