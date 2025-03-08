'use client'

import { ReactNode, useState } from 'react'

export interface IconItem {
  id: string
  icon: ReactNode
  label: string
  fromColor?: string
  viaColor?: string
  toColor?: string
  iconComponent?: (active: boolean) => ReactNode
}

interface IconCardProps {
  icon: ReactNode
  label: string
  active?: boolean
  viaColor?: string
  animationKey: number
}

const IconCard = ({
  icon,
  label,
  active = false,
  viaColor = '#D584BB',
  animationKey
}: IconCardProps) => {
  return (
    <div className="group flex flex-col items-center justify-center gap-4 transition-all duration-300">
      <div
        key={animationKey}
        className="hover:shadow-glow flex h-[85px] w-[85px] items-center justify-center rounded-full bg-white p-4 shadow-md transition-all duration-300"
        style={{
          transition: 'box-shadow 0.5s ease',
          boxShadow: active ? `0 0 15px 2px ${viaColor}` : 'var(--tw-shadow)'
        }}
      >
        {icon}
      </div>
      <span className="text-center font-montserrat text-[14px] font-medium text-secondary transition-colors duration-300 group-hover:text-primary">
        {label}
      </span>
    </div>
  )
}

export const IconCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="h-[85px] w-[85px] animate-pulse rounded-full bg-gray-200"></div>
      <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
    </div>
  )
}

interface CategoriesTabsProps {
  items: IconItem[]
  onSelect?: (id: string | null) => void
  defaultSelected?: string
  className?: string
}

export function CategoriesTabs({
  items,
  onSelect,
  defaultSelected,
  className = ''
}: CategoriesTabsProps) {
  // Garantir que haja um ícone selecionado por padrão
  const [activeId, setActiveId] = useState<string>(
    defaultSelected || (items.length > 0 ? items[0].id : '')
  )

  // Contador para forçar o reset das animações
  const [animationCounter, setAnimationCounter] = useState(0)

  const handleClick = (id: string) => {
    // Se clicar em um ícone diferente do ativo
    if (id !== activeId) {
      // Incrementar o contador para resetar todas as animações
      setAnimationCounter((prev) => prev + 1)
      // Definir o novo ícone ativo
      setActiveId(id)

      if (onSelect) {
        onSelect(id)
      }
    }
  }

  return (
    <div
      className={`flex flex-wrap justify-center gap-6 md:gap-[112px] ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer transition-all duration-300"
          onClick={() => handleClick(item.id)}
        >
          <IconCard
            icon={
              item.iconComponent
                ? item.iconComponent(activeId === item.id)
                : item.icon
            }
            label={item.label}
            active={activeId === item.id}
            viaColor={item.viaColor}
            animationKey={animationCounter}
          />
        </div>
      ))}
    </div>
  )
}
