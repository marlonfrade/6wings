import '@auth/core'

declare module '@auth/core' {
  interface User {
    id: string
    nome: string
    tipo: string
    token: string
    email?: string
    name?: string
  }

  interface Session {
    user: User
  }

  interface JWT {
    id: string
    nome: string
    tipo: string
    token: string
  }
}
