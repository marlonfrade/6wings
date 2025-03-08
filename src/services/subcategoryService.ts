export interface SubCategory {
  id: number
  nome: string
  descricao?: string
  categoria_id: number
  data_cadastro: string
}

/**
 * Busca todas as subcategorias de uma categoria específica
 * @param categoryId ID da categoria
 * @returns Promise com array de subcategorias
 */
export async function getSubCategories(
  categoryId?: string
): Promise<SubCategory[]> {
  if (!categoryId) return []

  try {
    const response = await fetch(`/api/subcategories?categoryId=${categoryId}`)
    if (!response.ok) {
      throw new Error('Falha ao buscar subcategorias')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar subcategorias:', error)
    return []
  }
}

/**
 * Busca a contagem de produtos por subcategoria
 * @param categoryId ID da categoria
 * @returns Promise com objeto contendo contagem de produtos por subcategoria
 */
export async function getProductCountsBySubCategory(
  categoryId?: string
): Promise<{ [key: number]: number }> {
  if (!categoryId) return {}

  try {
    const response = await fetch(`/api/categories/${categoryId}/product-counts`)
    if (!response.ok) {
      throw new Error('Falha ao buscar contagem de produtos')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar contagem de produtos:', error)
    return {}
  }
}
