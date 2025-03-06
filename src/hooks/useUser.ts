'use client'

import { useSession } from 'next-auth/react'

interface UserResponse {
  id: string
  nome: string
  email: string
  avatar_url?: string
  created_at: string
  message?: string
}

interface UseUserReturn {
  /** The current user data. Null if not yet loaded */
  user: UserResponse | null
  /** Whether the user data is currently being fetched */
  isLoading: boolean
  /** Any error that occurred during fetching. Null if no error */
  error: string | null
  /** Function to manually trigger a refresh of the user data */
  refetchUser: () => Promise<void>
}

/**
 * Hook to fetch and manage user information using NextAuth
 *
 * @example
 * ```tsx
 * const { user, isLoading, error, refetchUser } = useUser();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 *
 * return (
 *   <div>
 *     <h1>Welcome, {user.nome}!</h1>
 *     <img src={user.avatar_url} alt="User avatar" />
 *   </div>
 * );
 * ```
 */
export function useUser(): UseUserReturn {
  const { data: session, status, update } = useSession()
  console.log(session)

  // Mapeia os dados da sessão para o formato UserResponse
  const mapSessionToUser = (): UserResponse | null => {
    if (!session?.user) return null

    return {
      id: (session.user.id as string) || '',
      nome: session.user.nome || '',
      email: session.user.email || '',
      avatar_url: undefined,
      created_at: new Date().toISOString() // Usando a data atual como fallback
    }
  }

  /**
   * Atualiza os dados da sessão do usuário
   */
  const refetchUser = async (): Promise<void> => {
    try {
      await update()
    } catch (err) {
      console.error('Erro ao atualizar dados do usuário:', err)
    }
  }

  return {
    user: mapSessionToUser(),
    isLoading: status === 'loading',
    error: status === 'unauthenticated' ? 'Usuário não autenticado' : null,
    refetchUser
  }
}
