import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    const apiUrl = process.env.API_URL
    const { data } = await axios.get(`${apiUrl}/fetchAllStates`, {
      params: {
        query: query || ''
      }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar estados:', error)
    const axiosError = error as AxiosError
    return NextResponse.json(
      { error: 'Falha ao buscar estados' },
      { status: axiosError?.response?.status || 500 }
    )
  }
}
