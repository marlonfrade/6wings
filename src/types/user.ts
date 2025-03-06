import { UserRole } from '@/lib/constants'

/**
 * Represents a user in the system
 */
export interface User {
  id: number
  tipo: UserRole
  nome: string
  email: string
  senha: string
  telefone: string
  cpf: string
  dados_bancarios: string | null
  token: string
  tokenExpiration?: number
  refreshToken?: string
  refreshTokenExpiration?: number
  admin_id: number | null
  data_cadastro: string
  '6w_parceiro_negocio_id': number | null
  categoria_padrao: string | null
  subcategoria_padrao: string | null
  profile?: string
}
