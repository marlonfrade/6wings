import React from 'react'
import Typography from '@/components/typography'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface BannerBancoAfroProps {
  className?: string
}

export const BannerBancoAfro: React.FC<BannerBancoAfroProps> = ({
  className
}) => {
  return (
    <div
      className={`relative flex max-w-full flex-col items-center rounded-[24px] bg-[#9B297D] p-4 lg:mb-20 lg:mt-40 lg:max-w-[1746px] lg:flex-row ${className}`}
    >
      <div className="relative z-10 h-[280px] w-full lg:absolute lg:bottom-[240px] lg:left-0 lg:h-full lg:w-[40%]">
        <Image
          src="/images/banner/banner-banco-afro.png"
          alt="Banner Banco Afro"
          className="h-full w-full rounded-l-lg object-contain lg:h-[155%] lg:w-[140%]"
          width={1546}
          height={1000}
          priority
        />
      </div>
      <div className="z-20 mt-0 text-white lg:mb-6 lg:ml-[33%]">
        <h2 className="mb-4 text-center font-prompt text-2xl font-black leading-snug text-white lg:-ml-24 lg:pt-20 lg:text-left lg:text-[74px] lg:leading-[125%] lg:tracking-[-1.48px]">
          Conheça a 6Wings – o programa de recompensa do Banco Afro
        </h2>
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-[143px]">
          <Button
            variant="default"
            size="lg"
            className="flex min-w-[266px] justify-between rounded-full bg-[#FFD700] py-[24px] font-prompt text-base font-normal text-[#9B297D] hover:bg-[#E6C300] hover:text-[#9B297D]"
          >
            CRIE SEU CARTÃO
            <ArrowRight className="h-6 w-6 text-[#9B297D]" />
          </Button>
          <div className="flex max-w-full items-center lg:max-w-[392px]">
            <Typography
              variant="body1"
              className="text-center text-white lg:text-left"
            >
              Crie seu cartão no Banco Afro hoje mesmo e comece a acumular
              pontos na 6Wings. Cada compra se transforma em benefícios
              exclusivos para você!
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerBancoAfro
