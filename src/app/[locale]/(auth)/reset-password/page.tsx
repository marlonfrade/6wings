'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { toast } from 'sonner'

// Schema de validação com Zod
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .max(100, { message: 'A senha não pode ter mais de 100 caracteres' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    // Verificar se o token é válido
    const validateToken = async () => {
      if (!token) {
        setIsTokenValid(false)
        setIsLoading(false)
        return
      }

      try {
        // Chamada à API para validar o token
        const response = await fetch(
          `/api/auth/validate-reset-token?token=${token}`
        )
        const data = await response.json()

        setIsTokenValid(response.ok && data.valid)
      } catch (error) {
        console.error('Erro ao validar token:', error)
        setIsTokenValid(false)
      } finally {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [token])

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) return

    setIsSubmitting(true)
    try {
      // Chamada à API para redefinir a senha
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          password: data.password
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao redefinir senha')
      }

      setIsSuccess(true)
      toast.success('Senha redefinida com sucesso!')
    } catch (error) {
      console.error('Erro ao redefinir senha:', error)
      toast.error(
        'Não foi possível redefinir sua senha. Tente novamente mais tarde.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-secondary">Verificando...</p>
      </div>
    )
  }

  if (!isTokenValid) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-[#E5E5E5] bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-center font-prompt text-xl font-bold text-secondary">
              Link inválido ou expirado
            </h2>
            <p className="text-center text-[#363C41]">
              O link para redefinição de senha é inválido ou expirou. Por favor,
              solicite um novo link.
            </p>
            <Link href="/login">
              <Button className="mt-4 rounded-full bg-primary px-8 py-2 font-bold text-white hover:bg-[#8A256B]">
                Voltar para o login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-[#E5E5E5] bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-center font-prompt text-xl font-bold text-secondary">
              Senha redefinida com sucesso!
            </h2>
            <p className="text-center text-[#363C41]">
              Sua senha foi redefinida com sucesso. Agora você pode fazer login
              com sua nova senha.
            </p>
            <Link href="/login">
              <Button className="mt-4 rounded-full bg-primary px-8 py-2 font-bold text-white hover:bg-[#8A256B]">
                Ir para o login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <h2 className="mb-[24px] mt-8 font-prompt text-[32px] font-black text-secondary">
        Redefinir Senha
      </h2>

      <div className="w-full max-w-md rounded-3xl border border-[#E5E5E5] bg-white p-10 shadow-sm">
        <form
          className="flex h-full w-full flex-col items-center justify-between space-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex h-full w-full flex-col items-start justify-between space-y-4">
            <div className="w-full">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nova senha"
                className={`min-h-[53px] w-full px-[24px] py-[16px] ${
                  errors.password
                    ? 'border-destructive focus-visible:ring-destructive'
                    : ''
                }`}
                disabled={isSubmitting}
                {...register('password')}
              />
              <div className="relative">
                <Label
                  htmlFor="password"
                  className={`mt-2 block pl-4 text-[11px] ${
                    errors.password ? 'text-destructive' : 'text-[#363C41]'
                  }`}
                >
                  {errors.password
                    ? errors.password.message
                    : 'Digite sua nova senha'}
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute -top-[34px] right-3 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-500" />
                  ) : (
                    <Eye size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar senha"
                className={`min-h-[53px] w-full px-[24px] py-[16px] ${
                  errors.confirmPassword
                    ? 'border-destructive focus-visible:ring-destructive'
                    : ''
                }`}
                disabled={isSubmitting}
                {...register('confirmPassword')}
              />
              <div className="relative">
                <Label
                  htmlFor="confirmPassword"
                  className={`mt-2 block pl-4 text-[11px] ${
                    errors.confirmPassword
                      ? 'text-destructive'
                      : 'text-[#363C41]'
                  }`}
                >
                  {errors.confirmPassword
                    ? errors.confirmPassword.message
                    : 'Confirme sua nova senha'}
                </Label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute -top-[34px] right-3 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} className="text-gray-500" />
                  ) : (
                    <Eye size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="flex min-h-[53px] w-full items-center justify-between rounded-full bg-primary px-8 py-2 font-bold text-white hover:bg-[#8A256B]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processando...' : 'Redefinir Senha'}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-secondary">Carregando...</p>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}
