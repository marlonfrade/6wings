'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import RecoverPasswordDialog from '@/components/recoverEmailDialog'

// Schema de validação com Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'Formato de e-mail inválido' }),
  password: z
    .string()
    .min(3, { message: 'A senha deve ter pelo menos 3 caracteres' })
    .max(100, { message: 'A senha não pode ter mais de 100 caracteres' })
})

// Tipo inferido do schema
type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    try {
      await signIn('credentials', {
        email: data.email,
        senha: data.password,
        redirect: false
      })
    } catch (error) {
      console.error('Erro no login:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <h2 className="mb-[24px] mt-8 font-prompt text-[32px] font-black text-secondary">
        {t('auth.login.title')}
      </h2>

      <div className="w-full max-w-md rounded-3xl border border-[#E5E5E5] bg-white p-10 shadow-sm">
        <form
          className="flex h-full w-full flex-col items-center justify-between space-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex h-full w-full flex-col items-start justify-between space-y-4">
            <div className="w-full">
              <Input
                id="email"
                type="email"
                placeholder={t('auth.login.email')}
                className={`min-h-[53px] w-full px-[24px] py-[16px] ${
                  errors.email
                    ? 'border-destructive focus-visible:ring-destructive'
                    : ''
                }`}
                disabled={isSubmitting}
                {...register('email')}
              />
              <Label
                htmlFor="email"
                className={`mt-2 block pl-4 text-[11px] ${
                  errors.email ? 'text-destructive' : 'text-[#363C41]'
                }`}
              >
                {errors.email
                  ? errors.email.message
                  : t('auth.login.email-error')}
              </Label>
            </div>

            <div className="w-full">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.login.password')}
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
                    : t('auth.login.password-error')}
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
          </div>

          <Button
            type="submit"
            className="flex min-h-[53px] w-full items-center justify-between rounded-full bg-primary px-8 py-2 font-bold text-white hover:bg-[#8A256B]"
            disabled={isSubmitting}
          >
            {t('auth.login.login')}
            <ArrowRight size={16} className="ml-2" />
          </Button>
          <p className="text-sm text-[#363C41]">
            {t('auth.login.forgotPassword')} <RecoverPasswordDialog />
          </p>
        </form>
      </div>

      <div className="mt-4 text-center">
        <p className="mt-2 flex gap-2 text-sm text-[#363C41]">
          {t('auth.login.signup')}
          <Link
            href="/user/sign-up"
            className="text-[#9B297D] underline hover:text-[#8A256B]"
          >
            {t('auth.login.signup-link')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
