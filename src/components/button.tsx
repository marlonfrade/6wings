'use client'

import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type IconType = React.ElementType

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  hoverLabel?: string
  Icon?: IconType
  iconPosition?: 'left' | 'right'
  variant?: 'primary' | 'secondary' | 'outline' | 'dark'
  state?: 'normal' | 'hover'
  centered?: boolean
  className?: string
}

export const Button = ({
  label,
  hoverLabel,
  Icon,
  iconPosition = 'left',
  variant = 'primary',
  state = 'normal',
  centered = false,
  className,
  type = 'button',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'flex items-center gap-5 px-[22px] py-[15px] rounded-[24px] text-[15px] font-normal transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-white hover:bg-dark-gray [&_svg]:stroke-white',
    secondary:
      'border border-dark-gray text-dark-gray hover:border-primary hover:text-primary [&_svg]:stroke-dark-gray hover:[&_svg]:stroke-primary',
    outline:
      'bg-transparent border border-dark-gray text-dark-gray hover:border-primary hover:text-primary [&_svg]:stroke-dark-gray hover:[&_svg]:stroke-primary',
    dark: 'bg-transparent border border-white text-white hover:border-primary-light hover:text-primary-light [&_svg]:stroke-white hover:[&_svg]:stroke-primary-light'
  }

  const iconStyles = 'w-3 h-3'
  const iconPositionStyles = {
    left: 'mr-2',
    right: 'ml-2 order-last'
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        centered && 'justify-center',
        !centered && 'justify-between',
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {Icon && (
        <Icon className={cn(iconStyles, iconPositionStyles[iconPosition])} />
      )}
      <span
        className={cn(
          centered && 'flex-1 text-center',
          'transition-all duration-300'
        )}
      >
        {state === 'hover' && hoverLabel ? hoverLabel : label}
      </span>
    </button>
  )
}
