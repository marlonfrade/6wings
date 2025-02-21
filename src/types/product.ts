export interface ProductImage {
  id: number
  image_base64: string
}

export interface Product {
  id: number
  titulo: string
  descricao: string
  categoria_id: number
  sub_categoria_id: number
  valor: string
  parceiro_id: number
  data_cadastro: string
  excluido: string
  imagens: ProductImage[]
}

export interface ProductResponse {
  produto: Product
}
