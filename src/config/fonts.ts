import localFont from 'next/font/local'

// Configure Montserrat font
export const montserrat = localFont({
  src: [
    {
      path: '/fonts/Montserrat/static/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '/fonts/Montserrat/static/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '/fonts/Montserrat/static/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-montserrat'
})

// Configure Prompt font
export const prompt = localFont({
  src: [
    {
      path: '/fonts/Prompt/Prompt-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '/fonts/Prompt/Prompt-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '/fonts/Prompt/Prompt-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-prompt'
})
