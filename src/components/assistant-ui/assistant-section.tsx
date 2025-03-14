'use client'

import React from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'

import { AIInputWithLoading } from '@/components/ui/ai-input-with-loading'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

export function AssistantSection({
  setIsAssistantOpen,
  setInitialQuestion
}: {
  isAssistantOpen: boolean
  setIsAssistantOpen: (isOpen: boolean) => void
  initialQuestion: string
  setInitialQuestion: (question: string) => void
}) {
  const t = useTranslations('homepage.assistant-section')
  const handleSubmit = (value: string) => {
    if (value.trim()) {
      setInitialQuestion(value)
      setIsAssistantOpen(true)
    }
  }

  return (
    <div className="relative w-full max-w-screen-lg rounded-[20px] bg-secondary pb-0 pt-10">
      {/* SVG Divider */}
      <div className="line-height-0 absolute left-0 top-0 w-full rotate-180 transform overflow-hidden">
        <svg
          className="relative block h-[70px] w-[calc(100%+1.3px)] rounded-b-[20px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M749.97 0L599.91 70 450.03 0 0 0 0 180 1200 120 1200 0 680.97 0z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="rounded-t-[20px] bg-secondary px-4 pt-10 lg:px-0 lg:pt-0">
        <div className="mx-auto flex max-w-4xl flex-col items-center lg:flex-row">
          {/* Text Section */}
          <div className="mb-8 max-h-[164px] max-w-full px-4 text-center lg:mb-0 lg:max-w-[50%] lg:text-left">
            <h2
              className={
                'mb-4 font-prompt text-[48px] font-black leading-[120%] tracking-[-0.02em] text-white'
              }
            >
              {t('title')}
            </h2>
          </div>

          {/* Chat Section */}
          <div className="w-full px-4 py-8 lg:py-20">
            {/* Chat Bubble */}
            <div className="mb-8 w-full rounded-lg bg-[#FFFAEE] p-4 shadow-md lg:absolute lg:-top-8 lg:right-2 lg:mb-0 lg:max-w-[40%]">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD700]">
                    <Image
                      src="/images/logos/6wings-logo.png"
                      alt="6Wings Logo"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
                <p
                  className={cn('text-sm text-gray-700', montserrat.className)}
                >
                  {t('description')}
                </p>
              </div>
            </div>

            {/* Input Section with AI Loading Animation */}
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-white px-4 py-2">
              <div className="w-full">
                <AIInputWithLoading
                  id="ai-input-with-loading"
                  placeholder={t('chat-input.placeholder')}
                  onSubmit={handleSubmit}
                  className="w-full"
                  minHeight={53}
                  maxHeight={120}
                />
              </div>
              <Button
                variant="default"
                className="w-full rounded-[14px] bg-primary text-white hover:bg-primary/90"
                onClick={() => {
                  const input = document.getElementById(
                    'ai-input-with-loading'
                  ) as HTMLInputElement
                  if (input && input.value.trim()) {
                    handleSubmit(input.value)
                  } else {
                    input?.focus()
                  }
                }}
              >
                {t('chat-input.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
