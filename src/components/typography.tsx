'use client'

import { ReactNode } from 'react'
import { montserrat, prompt } from '@/config/fonts'

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

const variantStyles: Record<TypographyVariant, string> = {
  h1: `text-[#363C41] ${prompt.variable} font-prompt text-4xl md:text-5xl lg:text-[74px] font-extrabold leading-tight md:leading-[125%] tracking-tight md:tracking-[-1.48px] z-[100000]`,
  h2: `text-[#363C41] ${prompt.variable} font-prompt text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-normal tracking-tight md:tracking-[-0.64px]`,
  h3: `text-[#363C41] ${montserrat.variable} font-montserrat text-lg md:text-xl lg:text-[20px] font-extrabold leading-snug`,
  h4: `text-[#9B297D] ${montserrat.variable} font-montserrat text-base md:text-lg lg:text-[18px] font-extrabold leading-relaxed`,
  h5: `text-[#363C41] ${montserrat.variable} font-montserrat text-sm md:text-base lg:text-[16px] font-extrabold leading-relaxed`,
  h6: `text-[#363C41] ${montserrat.variable} font-montserrat text-xs md:text-sm lg:text-[14px] font-extrabold leading-relaxed`,
  body1: `text-[#363C41] ${montserrat.variable} font-montserrat text-sm md:text-base lg:text-[15px] font-normal leading-snug`,
  body2: `text-[#363C41] ${montserrat.variable} font-montserrat text-sm md:text-base lg:text-[18px] font-normal leading-snug`,
  body3: `text-[#363C41] ${montserrat.variable} font-montserrat text-sm md:text-base lg:text-[16px] font-semibold leading-snug`,
  body4: `text-[#363C41] ${montserrat.variable} font-montserrat text-sm md:text-base lg:text-[16px] font-semibold leading-snug`,
  caption: `text-[#8E8E8E] ${montserrat.variable} font-montserrat text-xs md:text-sm lg:text-[13px] font-semibold leading-snug tracking-wider uppercase`,
  title: `text-[#363C41] ${montserrat.variable} font-montserrat text-3xl md:text-4xl lg:text-[56px] font-semibold leading-normal tracking-tight md:tracking-[-1.12px]`,
  'advert-1': `text-[#363C41] ${prompt.variable} font-prompt text-[43px] font-bold leading-[107%] tracking-tight`,
  'advert-2': `text-[#363C41] ${prompt.variable} font-prompt text-[56px] font-bold leading-[125%] tracking-tight`,
  'advert-3': `text-[#363C41] ${prompt.variable} font-prompt text-[32px] font-bold leading-[107%] tracking-tight`,
  'advert-4': `text-[#363C41] ${prompt.variable} font-prompt text-[50px] font-bold leading-[3.25rem] tracking-[0.02em] letter-spacing-[0.05em]`,
  'advert-subtitle-1': `text-[#363C41] ${montserrat.variable} font-montserrat text-[20px] font-semibold leading-[-0.05em] tracking-[-0.02em]`,
  'advert-subtitle-2': `text-[#363C41] ${montserrat.variable} font-montserrat text-[20px] font-medium leading-[135%] tracking-[-2%]`,
  'advert-subtitle-3': `text-[#363C41] ${montserrat.variable} font-montserrat text-[10px] font-medium leading-[135%] tracking-[-2%]`,
  'quick-promotions': `text-[#363C41] ${prompt.variable} font-prompt text-[47px] font-bold leading-[125%] tracking-[-2%]`,
  'promotion-card-price': `text-[#363C41] ${montserrat.variable} font-montserrat text-[26px] font-bold leading-[120%] tracking-[0px]`,
  navigation: `${montserrat.variable} font-montserrat text-xs md:text-sm lg:text-[13px] font-medium leading-snug tracking-wider uppercase`,
  'chatbot-title': `${prompt.variable} font-prompt text-[40px] font-bold leading-[120%] tracking-[-2%] text-white`,
  'chatbot-info': `text-[#363C41] ${montserrat.variable} font-montserrat text-[13px] font-normal leading-[130%] tracking-[0%]`,
  'product-title': `${prompt.variable} font-extrabold leading-[auto] tracking-[-2%]`,
  'product-category': `${montserrat.variable} font-montserrat text-[#8E8E8E] text-[13px] font-semibold leading-[130%] tracking-[10%]`,
  custom1: `${prompt.variable} font-prompt text-3xl md:text-4xl lg:text-[48px] font-bold leading-[57.6px] tracking-[-0.02em] text-left`,
  'product-title-card': `${montserrat.variable} font-montserrat text-2xl text-[18px] font-extrabold leading-[130%] tracking-[0%]`
}

const Typography = ({
  variant,
  children,
  className = '',
  color
}: TypographyProps) => {
  const baseStyles = variantStyles[variant] || ''

  return (
    <div className={`${baseStyles} ${className}`} style={{ color }}>
      {children}
    </div>
  )
}

export default Typography
