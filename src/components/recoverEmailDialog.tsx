import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { MailIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

// Schema de validação com Zod
const recoverPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'Formato de e-mail inválido' })
})

type RecoverPasswordFormValues = z.infer<typeof recoverPasswordSchema>

export default function RecoverPasswordDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const t = useTranslations()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RecoverPasswordFormValues>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: RecoverPasswordFormValues) => {
    setIsSubmitting(true)
    try {
      // Chamada à API de recuperação de senha
      const response = await fetch('/api/auth/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao processar solicitação')
      }

      setIsSuccess(true)
    } catch (error) {
      console.error('Erro na recuperação de senha:', error)
      toast.error(
        'Não foi possível processar sua solicitação. Tente novamente mais tarde.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Resetar o estado quando o diálogo for fechado
      reset()
      setIsSuccess(false)
    }
  }

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <button className="text-[#9B297D] underline hover:text-[#8A256B]">
          {t('auth.login.recoverPassword')}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <div className="mb-2 flex flex-col items-center justify-center gap-2">
              <DialogHeader className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#9B297D]"
                    aria-hidden="true"
                  >
                    <MailIcon
                      className="stroke-[#9B297D]"
                      size={24}
                      aria-hidden="true"
                    />
                  </div>
                  <DialogTitle className="text-center font-prompt text-xl font-bold text-secondary">
                    {t('auth.login.recoverPassword')}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-center">
                  {t('auth.login.recoverPasswordDescription')}
                </DialogDescription>
              </DialogHeader>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="*:not-first:mt-2">
                <div className="relative">
                  <Input
                    id="recover-email"
                    className={`peer min-h-[53px] w-full px-[24px] py-[16px] ps-9 ${
                      errors.email
                        ? 'border-destructive focus-visible:ring-destructive'
                        : ''
                    }`}
                    placeholder={t('auth.login.email')}
                    type="email"
                    aria-label="Email"
                    disabled={isSubmitting}
                    {...register('email')}
                  />
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <MailIcon
                      size={16}
                      className="text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <Label
                  htmlFor="recover-email"
                  className={`mt-2 block pl-4 text-[11px] ${
                    errors.email ? 'text-destructive' : 'text-[#363C41]'
                  }`}
                >
                  {errors.email
                    ? errors.email.message
                    : t('auth.login.email-error')}
                </Label>
              </div>
              <Button
                type="submit"
                className="flex min-h-[53px] w-full items-center justify-center rounded-full bg-primary px-8 py-2 font-bold text-white hover:bg-[#8A256B]"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t('auth.login.sending')
                  : t('auth.login.recoverPassword')}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-green-100"
              aria-hidden="true"
            >
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
            <DialogTitle className="text-center font-prompt text-xl font-bold text-secondary">
              {t('auth.login.emailSent')}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t('auth.login.emailSentDescription')}
            </DialogDescription>
            <Button
              type="button"
              className="mt-4 rounded-full bg-primary px-8 py-2 font-bold text-white hover:bg-[#8A256B]"
              onClick={() => handleDialogClose(false)}
            >
              {t('auth.login.close')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
