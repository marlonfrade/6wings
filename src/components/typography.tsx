'use client'

import { ReactNode } from 'react'

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'caption'
  | 'title'
  | 'navigation'
  | 'custom1'
  | 'chatbot-title'
  | 'chatbot-info'
  | 'quick-promotions'
  | 'promotion-card-price'
  | 'advert-1'
  | 'advert-2'
  | 'advert-3'
  | 'advert-4'
  | 'advert-subtitle-1'
  | 'advert-subtitle-2'
  | 'advert-subtitle-3'
  | 'product-category'
  | 'product-title'
  | 'product-title-card'

interface TypographyProps {
  variant: TypographyVariant
  children: ReactNode
  className?: string
  color?: string
}

const Typography = ({
  variant,
  children,
  className = '',
  color
}: TypographyProps) => {
  let tailwindClasses = ''

  switch (variant) {
    case 'h1':
      tailwindClasses = `text-[#363C41] font-prompt text-4xl md:text-5xl lg:text-[74px] font-extrabold leading-tight md:leading-[125%] tracking-tight md:tracking-[-1.48px]`
      break
    case 'h2':
      tailwindClasses = `text-[#363C41] font-prompt text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-normal tracking-tight md:tracking-[-0.64px]`
      break
    case 'h3':
      tailwindClasses = `text-[#363C41] font-montserrat text-lg md:text-xl lg:text-[20px] font-extrabold leading-snug`
      break
    case 'h4':
      tailwindClasses = `text-[#9B297D] font-montserrat text-base md:text-lg lg:text-[18px] font-extrabold leading-relaxed`
      break
    case 'h5':
      tailwindClasses = `text-[#363C41] font-montserrat text-sm md:text-base lg:text-[16px] font-extrabold leading-relaxed`
      break
    case 'h6':
      tailwindClasses = `text-[#363C41] font-montserrat text-xs md:text-sm lg:text-[14px] font-extrabold leading-relaxed`
      break
    case 'body1':
    case 'body2':
      tailwindClasses = `text-[#363C41] font-montserrat text-sm md:text-base lg:text-[15px] font-normal leading-snug`
      break
    case 'body3':
    case 'body4':
      tailwindClasses = `text-[#363C41] font-montserrat text-sm md:text-base lg:text-[16px] font-semibold leading-snug`
      break
    case 'caption':
      tailwindClasses = `text-[#8E8E8E] font-montserrat text-xs md:text-sm lg:text-[13px] font-semibold leading-snug tracking-wider uppercase`
      break
    case 'title':
      tailwindClasses = `text-[#363C41] font-montserrat text-3xl md:text-4xl lg:text-[56px] font-semibold leading-normal tracking-tight md:tracking-[-1.12px]`
      break
    case 'advert-1':
      tailwindClasses = `text-[#363C41] font-prompt text-[43px] font-bold leading-[107%] tracking-tight`
      break
    case 'advert-2':
      tailwindClasses = `text-[#363C41] font-prompt text-[56px] font-bold leading-[125%] tracking-tight`
      break
    case 'advert-3':
      tailwindClasses = `text-[#363C41] font-prompt text-[32px] font-bold leading-[107%] tracking-tight`
      break
    case 'advert-4':
      tailwindClasses = `text-[#363C41] font-prompt text-[50px] font-bold leading-[3.25rem] tracking-[0.02em] letter-spacing-[0.05em]`
      break
    case 'advert-subtitle-1':
      tailwindClasses = `text-[#363C41] font-montserrat text-[20px] font-semibold leading-[-0.05em] tracking-[-0.02em]`
      break
    case 'advert-subtitle-2':
      tailwindClasses = `text-[#363C41] font-montserrat text-[20px] font-medium leading-[135%] tracking-[-2%]`
      break
    case 'advert-subtitle-3':
      tailwindClasses = `text-[#363C41] font-montserrat text-[10px] font-medium leading-[135%] tracking-[-2%]`
      break
    case 'quick-promotions':
      tailwindClasses = `text-[#363C41] font-prompt text-[47px] font-bold leading-[125%] tracking-[-2%]`
      break
    case 'promotion-card-price':
      tailwindClasses = `text-[#363C41] font-montserrat text-[26px] font-bold leading-[120%] tracking-[0px]`
      break
    case 'navigation':
      tailwindClasses = `font-montserrat text-xs md:text-sm lg:text-[13px] font-medium leading-snug tracking-wider uppercase`
      break
    case 'chatbot-title':
      tailwindClasses = `font-prompt text-[40px] font-bold leading-[120%] tracking-[-2%] text-white`
      break
    case 'chatbot-info':
      tailwindClasses = `text-[#363C41] font-montserrat text-[13px] font-normal leading-[130%] tracking-[0%]`
      break
    case 'product-title':
      tailwindClasses = `font-prompt text-[32px] font-extrabold leading-[auto] tracking-[-2%]`
      break
    case 'product-category':
      tailwindClasses = `font-montserrat text-[#8E8E8E] text-[13px] font-semibold leading-[130%] tracking-[10%]`
      break
    case 'custom1':
      tailwindClasses = `font-prompt text-3xl md:text-4xl lg:text-[48px] font-bold leading-[57.6px] tracking-[-0.02em] text-left`
      break
    case 'product-title-card':
      tailwindClasses = `font-montserrat text-2xl text-[18px] font-extrabold leading-[130%] tracking-[0%]`
      break
    default:
      tailwindClasses = ''
  }

  return (
    <div className={`${tailwindClasses} ${className}`} style={{ color }}>
      {children}
    </div>
  )
}

export default Typography
