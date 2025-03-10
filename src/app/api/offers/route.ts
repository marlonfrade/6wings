import { NextResponse } from 'next/server'
import axios from 'axios'

// Interface para ofertas
interface Offer {
  parceiro_id: number
  id: number
  produto_id: number
  porcentagem_valor: number
  data_inicio: string
  data_termino: string
  data_cadastro: string
}

// Interface para produto
interface Product {
  id: number
  titulo: string
  descricao: string
  categoria_id: number
  sub_categoria_id: number
  valor: string
  parceiro_id: number
  data_cadastro: string
  excluido: string
  imagens: Array<{
    id: number
    image_base64: string
  }>
}

// Interface para oferta com detalhes do produto
interface OfferWithProduct extends Offer {
  produto?: Product
}

export async function GET(): Promise<NextResponse> {
  try {
    const apiUrl = process.env['NEXT_PUBLIC_API_URL']
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'URL da API não configurada' },
        { status: 500 }
      )
    }

    // Buscar todas as ofertas
    const offersResponse = await axios.get(`${apiUrl}/fetchAllOffers`)
    const offers: Offer[] = offersResponse.data

    // Para cada oferta, buscar informações do produto
    const offersWithProducts: OfferWithProduct[] = await Promise.all(
      offers.map(async (offer) => {
        try {
          // Buscar detalhes do produto
          const productResponse = await axios.get(
            `${apiUrl}/fetchProductById?id=${offer.produto_id}`
          )

          // Verificar se a resposta contém dados do produto
          // A resposta é um array com um objeto que contém o produto
          if (
            productResponse.data &&
            Array.isArray(productResponse.data) &&
            productResponse.data.length > 0
          ) {
            const productData = productResponse.data[0]

            if (productData && productData.produto) {
              return {
                ...offer,
                produto: productData.produto
              }
            }
          } else if (productResponse.data && productResponse.data.produto) {
            return {
              ...offer,
              produto: productResponse.data.produto
            }
          } else if (
            productResponse.data &&
            typeof productResponse.data === 'object'
          ) {
            if (
              'id' in productResponse.data &&
              'titulo' in productResponse.data
            ) {
              return {
                ...offer,
                produto: productResponse.data
              }
            }
          }

          return offer
        } catch (error) {
          console.error(`Erro ao buscar produto ${offer.produto_id}:`, error)
          return offer
        }
      })
    )

    return NextResponse.json(offersWithProducts, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar ofertas:', error)
    return NextResponse.json(
      { error: 'Erro Interno do Servidor' },
      { status: 500 }
    )
  }
}
