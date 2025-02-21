'use client'

import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { AssistantModal } from '@/components/assistant-ui/assistant-modal'
import { Navbar } from '@/components/navbar'

export default function Home() {
  const runtime = useChatRuntime({
    api: '/api/chat'
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <main>
        <Navbar />
        <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
          <AssistantModal />
        </div>
      </main>
    </AssistantRuntimeProvider>
  )
}
