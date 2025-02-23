import localFont from 'next/font/local'

// Configure local Montserrat font
export const montserrat = localFont({
  src: [
    {
      path: '../../public/fonts/Montserrat/Montserrat-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-montserrat',
  fallback: ['system-ui', 'arial']
})

// Configure local Prompt font
export const prompt = localFont({
  src: [
    {
      path: '../../public/fonts/Prompt/Prompt-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Prompt/Prompt-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Prompt/Prompt-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Prompt/Prompt-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Prompt/Prompt-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-prompt',
  fallback: ['system-ui', 'arial']
})
