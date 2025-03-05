import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')?.toLowerCase()
    const id = searchParams.get('id')
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit') as string, 10)
      : undefined

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    // If ID is provided, fetch specific airport
    if (id) {
      const response = await axios.get(`${apiUrl}/fetchAirportById?id=${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return NextResponse.json(response.data, { status: 200 })
    }

    // If there's a query, fetch airports based on the query
    if (query) {
      const response = await axios.post(
        `${apiUrl}/fetchAirport`,
        {
          nome: query
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      // Apply limit if provided
      const data =
        limit && Array.isArray(response.data)
          ? response.data.slice(0, limit)
          : response.data

      return NextResponse.json(data, { status: 200 })
    }

    // Fetch all airports if no ID or query
    const response = await axios.get(`${apiUrl}/fetchAllAirports`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Apply limit if provided
    const data =
      limit && Array.isArray(response.data)
        ? response.data.slice(0, limit)
        : response.data

    return NextResponse.json(data, { status: 200 })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching airports:', error.message)
      return NextResponse.json(
        { error: 'Failed to fetch airports' },
        { status: error.response?.status || 500 }
      )
    } else if (error instanceof Error) {
      console.error('Error fetching airports:', error.message)
      return NextResponse.json(
        { error: 'Failed to fetch airports' },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    )
  }
}
