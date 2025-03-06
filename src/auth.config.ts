import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { UserRole } from '@/lib/constants'

// Estender o tipo de usuário do NextAuth para incluir nossos campos personalizados
declare module 'next-auth' {
  interface User {
    nome: string
    tipo: UserRole
    token: string
    tokenExpiration?: number
    refreshToken?: string
    refreshTokenExpiration?: number
  }
}

// Estender o tipo de sessão do NextAuth para incluir nossos campos personalizados
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      nome?: string
      tipo?: UserRole
      email?: string
      token?: string
      tokenExpiration?: number
      refreshToken?: string
      refreshTokenExpiration?: number
    }
  }
}

// Estender o tipo Account para incluir campos adicionais
declare module 'next-auth' {
  interface Account {
    refresh_token_expires_in?: number
    refresh_token_expires_at?: number
  }
}

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        senha: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        const apiUrl = process.env['NEXT_PUBLIC_API_URL']
        if (!apiUrl) {
          throw new Error('API URL não configurada')
        }

        const res = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })

        const user = await res.json()

        if (res.ok && user) {
          // Validar o token para obter informações de expiração
          const validateRes = await fetch(`${apiUrl}/validate`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            }
          })

          let tokenExpiration
          let tokenIat
          if (validateRes.ok) {
            const tokenData = await validateRes.json()
            if (tokenData.data && tokenData.data.exp) {
              tokenExpiration = tokenData.data.exp
              tokenIat = tokenData.data.iat
            }
          }

          return {
            id: String(user.id),
            nome: user.nome,
            tipo: user.tipo as UserRole,
            email: user.email,
            token: user.token,
            tokenExpiration,
            tokenIat,
            refreshToken: user.refreshToken
          }
        }
        throw new Error('Credenciais inválidas')
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Quando o usuário faz login
      if (user) {
        token.id = user.id
        token.nome = user.nome
        token.tipo = user.tipo
        token.token = user.token
        if (user.tokenExpiration) {
          token.tokenExpiration = user.tokenExpiration
        }
        if (user.refreshToken) {
          token.refreshToken = user.refreshToken
        }
      }

      // Quando um provedor OAuth é usado
      if (account) {
        // Armazenar tokens de acesso e atualização
        token.accessToken = account.access_token

        // Calcular e armazenar a expiração do token de acesso
        if (account.expires_at) {
          token.tokenExpiration = account.expires_at
        }

        // Armazenar o token de atualização
        if (account.refresh_token) {
          token.refreshToken = account.refresh_token
        }

        // Calcular e armazenar a expiração do token de atualização, se disponível
        if (account.refresh_token_expires_in) {
          const refreshTokenExpiresAt =
            Math.floor(Date.now() / 1000) +
            Number(account.refresh_token_expires_in)
          token.refreshTokenExpiration = refreshTokenExpiresAt
        }
      }

      // Verificar se o token está prestes a expirar e precisa ser atualizado
      if (token.tokenExpiration && token.refreshToken) {
        const now = Math.floor(Date.now() / 1000)
        const expiresIn = Number(token.tokenExpiration) - now

        // Se o token expira em menos de 5 minutos e temos um token de atualização
        if (expiresIn < 300) {
          try {
            const apiUrl = process.env['NEXT_PUBLIC_API_URL']
            if (apiUrl) {
              // Chamar a API para atualizar o token
              const response = await fetch(`${apiUrl}/refresh-token`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  refreshToken: token.refreshToken
                })
              })

              if (response.ok) {
                const refreshedTokens = await response.json()

                if (refreshedTokens.token) {
                  // Atualizar o token no objeto token
                  token.token = refreshedTokens.token

                  // Validar o novo token para obter informações de expiração
                  const validateRes = await fetch(`${apiUrl}/validate`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${refreshedTokens.token}`
                    }
                  })

                  if (validateRes.ok) {
                    const tokenData = await validateRes.json()
                    if (tokenData.data && tokenData.data.exp) {
                      token.tokenExpiration = tokenData.data.exp
                    }
                  }

                  // Atualizar o token de atualização, se fornecido
                  if (refreshedTokens.refreshToken) {
                    token.refreshToken = refreshedTokens.refreshToken
                  }
                }
              }
            }
          } catch (error) {
            console.error('Erro ao atualizar o token:', error)
          }
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: String(token.id),
          nome: String(token.nome),
          tipo: token.tipo as UserRole,
          token: String(token.token)
        }

        if (token.tokenExpiration) {
          session.user.tokenExpiration = Number(token.tokenExpiration)
        }

        if (token.refreshToken) {
          session.user.refreshToken = String(token.refreshToken)
        }

        if (token.refreshTokenExpiration) {
          session.user.refreshTokenExpiration = Number(
            token.refreshTokenExpiration
          )
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  debug: true
} satisfies NextAuthConfig
