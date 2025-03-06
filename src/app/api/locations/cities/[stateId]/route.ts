import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export async function GET(
  request: Request,
  { params }: { params: { stateId: string } }
) {
  try {
    const stateId = params.stateId
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
