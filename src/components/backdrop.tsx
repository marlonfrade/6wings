import { FC } from 'react'
import Image from 'next/image'

interface BackdropProps {
  className?: string
}

const Backdrop: FC<BackdropProps> = ({ className = '' }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm ${className}`}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center justify-center">
        <div
          className="relative h-32 w-32 animate-spin rounded-full border-b-2 border-primary"
          aria-hidden="true"
        />
        <Image
          src="/images/logos/logo.png"
          alt="6Wings Logo"
          width={80}
          height={80}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          priority
          quality={90}
        />
      </div>
    </div>
  )
}

export default Backdrop
