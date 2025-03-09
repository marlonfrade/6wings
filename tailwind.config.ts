import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  prefix: '',
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			prompt: [
  				'var(--font-prompt)'
  			],
  			montserrat: [
  				'var(--font-montserrat)'
  			]
  		},
  		colors: {
  			primary: {
  				'50': '#F3E0EE',
  				'100': '#E7C1DD',
  				'200': '#D584BB',
  				'300': '#C34799',
  				'400': '#B13A8E',
  				'500': '#9B297D',
  				'600': '#85226B',
  				'700': '#6F1C59',
  				'800': '#591647',
  				'900': '#431035',
  				'950': '#360D2B',
  				DEFAULT: '#9B297D'
  			},
  			secondary: {
  				'50': '#D6D8D9',
  				'100': '#BEC1C3',
  				'200': '#8E9397',
  				'300': '#5E656B',
  				'400': '#464D53',
  				'500': '#363C41',
  				'600': '#2E3338',
  				'700': '#262A2E',
  				'800': '#1E2124',
  				'900': '#16181A',
  				'950': '#0F1012',
  				DEFAULT: '#363C41'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'glow-pulse': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px #F3E0EE, 0 0 40px #E7C1DD, 0 0 60px #9B297D',
  					filter: 'brightness(1.2)'
  				},
  				'50%': {
  					boxShadow: '0 0 10px #F3E0EE, 0 0 20px #E7C1DD, 0 0 30px #9B297D',
  					filter: 'brightness(1)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			orbit: {
  				'0%': {
  					transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))'
  				},
  				'100%': {
  					transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			orbit: 'orbit calc(var(--duration)*1s) linear infinite'
  		},
  		letterSpacing: {
  			tightest: '-.075em',
  			tighter: '-.05em',
  			tight: '-.025em',
  			normal: '0',
  			wide: '.025em',
  			wider: '.05em',
  			widest: '.1em'
  		},
  		lineHeight: {
  			none: '1',
  			tight: '1.25',
  			snug: '1.375',
  			normal: '1.5',
  			relaxed: '1.625',
  			loose: '2'
  		},
  		boxShadow: {
  			glow: '0 0 20px rgba(255, 204, 112, 0.7), 0 0 40px rgba(200, 80, 192, 0.5), 0 0 60px rgba(65, 88, 208, 0.3)',
  			glow2: '0 0 20px rgba(50, 255, 50, 0.7), 0 0 40px rgba(20, 200, 20, 0.5), 0 0 60px rgba(5, 150, 5, 0.3)',
  			'glow-primary': '0 0 20px rgba(155, 41, 125, 0.7), 0 0 40px rgba(155, 41, 125, 0.5), 0 0 60px rgba(155, 41, 125, 0.3)'
  		},
  		filter: {
  			'blur-20': 'blur(20px)',
  			'blur-25': 'blur(25px)'
  		},
  		brightness: {
  			'150': '1.5'
  		}
  	}
  },
  plugins: [animate],
  variants: {
    extend: {
      inset: ['group-hover'],
      boxShadow: ['hover', 'focus'],
      brightness: ['hover', 'focus']
    }
  }
} satisfies Config

export default config
