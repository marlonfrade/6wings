'use client'

import { type FC, forwardRef } from 'react'
import { AssistantModalPrimitive } from '@assistant-ui/react'

import { Thread } from '@/components/assistant-ui/thread'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const AssistantModal: FC = () => {
  return (
    <AssistantModalPrimitive.Root>
      <AssistantModalPrimitive.Anchor className='fixed bottom-4 right-4'>
        <AssistantModalPrimitive.Trigger asChild>
          <AssistantModalButton />
        </AssistantModalPrimitive.Trigger>
      </AssistantModalPrimitive.Anchor>
      <AssistantModalPrimitive.Content
        sideOffset={16}
        className='bg-popover text-popover-foreground z-50 h-[500px] w-[400px] overflow-clip rounded-xl border p-0 shadow-md outline-none [&>.aui-thread-root]:bg-inherit data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out data-[state=open]:zoom-in data-[state=open]:slide-in-from-bottom-0 data-[state=closed]:slide-out-to-bottom-0'
        style={{
          position: 'fixed',
          bottom: '60px',
          right: '16px',
          transform: 'none'
        }}
      >
        <Thread />
      </AssistantModalPrimitive.Content>
    </AssistantModalPrimitive.Root>
  )
}

type AssistantModalButtonProps = { 'data-state'?: 'open' | 'closed' }

const AssistantModalButton = forwardRef<
  HTMLButtonElement,
  AssistantModalButtonProps
>(({ 'data-state': state, ...rest }, ref) => {
  const tooltip = state === 'open' ? 'Fechar Assistente' : 'Abrir Assistente'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='default'
            size='icon'
            className='fixed bottom-4 right-4 m-0 inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-primary bg-white bg-none p-0 text-sm font-medium normal-case leading-5 shadow transition-transform hover:scale-105 hover:bg-gray-100 hover:text-gray-900 active:scale-95 disabled:pointer-events-none disabled:opacity-50'
            {...rest}
            ref={ref}
            style={{ zIndex: 1000 }}
          >
            <Image
              src='/images/logos/6wings-logo.png'
              alt='Ícone do Chatbot'
              width={30}
              height={30}
            />
            <span className='sr-only'>{tooltip}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='left'>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

AssistantModalButton.displayName = 'AssistantModalButton'
