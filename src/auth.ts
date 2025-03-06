import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 }
})
