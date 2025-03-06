import { UserRole } from '@/lib/constants'
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    tipo: UserRole
    nome: string
    email: string
    telefone?: string
    cpf?: string
    dados_bancarios?: string | null
    token: string
    admin_id?: number | null
    data_cadastro?: string
    '6w_parceiro_negocio_id'?: number | null
    categoria_padrao?: string | null
    subcategoria_padrao?: string | null
    profile?: string
  }

  interface Session {
    user: {
      id: string
      tipo: UserRole
      nome: string
      email: string
      token: string
    }
    expires: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    tipo: UserRole
    nome: string
    email: string
    token: string
  }
}
