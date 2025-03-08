export interface Category {
  id: string
  nome: string
  descricao?: string
  imagem?: string
}

/**
 * Busca todas as categorias disponíveis
 * @returns Promise com array de categorias
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      throw new Error('Falha ao buscar categorias')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}
