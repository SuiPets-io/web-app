import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['class'],
	theme: {
		screens: {
			xxs: '360px',
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1920px',
			'4xl': '2560px', // only need to control product grid mode in ultra 4k device
		},
		fontSize: {
			xs: '0.625rem', // 10px
			sm: '0.813rem', // 13px
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'2.5xl': '1.75rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '4.5rem',
			'8xl': '5rem',
			'9xl': '6rem',
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				neutral: {
					white: 'rgb(var(--neutral-white) / <alpha-value>)',
					100: 'rgb(var(--neutral-100) / <alpha-value>)',
					200: 'rgb(var(--neutral-200) / <alpha-value>)',
					300: 'rgb(var(--neutral-300) / <alpha-value>)',
					400: 'rgb(var(--neutral-400) / <alpha-value>)',
					500: 'rgb(var(--neutral-500) / <alpha-value>)',
					600: 'rgb(var(--neutral-600) / <alpha-value>)',
					700: 'rgb(var(--neutral-700) / <alpha-value>)',
					800: 'rgb(var(--neutral-800) / <alpha-value>)',
					900: 'rgb(var(--neutral-900) / <alpha-value>)',
					black: 'rgb(var(--neutral-black) / <alpha-value>)',
				},
				green: {
					100: 'rgb(var(--green-100) / <alpha-value>)',
					200: 'rgb(var(--green-200) / <alpha-value>)',
					300: 'rgb(var(--green-300) / <alpha-value>)',
					400: 'rgb(var(--green-400) / <alpha-value>)',
					500: 'rgb(var(--green-500) / <alpha-value>)',
					600: 'rgb(var(--green-600) / <alpha-value>)',
					700: 'rgb(var(--green-700) / <alpha-value>)',
					800: 'rgb(var(--green-800) / <alpha-value>)',
					900: 'rgb(var(--green-900) / <alpha-value>)',
				},
				orange: {
					100: 'rgb(var(--orange-100) / <alpha-value>)',
					200: 'rgb(var(--orange-200) / <alpha-value>)',
					300: 'rgb(var(--orange-300) / <alpha-value>)',
					400: 'rgb(var(--orange-400) / <alpha-value>)',
				},
				success: {
					100: 'rgb(var(--success-100) / <alpha-value>)',
					200: 'rgb(var(--success-200) / <alpha-value>)',
					300: 'rgb(var(--success-300) / <alpha-value>)',
				},
				error: {
					100: 'rgb(var(--error-100) / <alpha-value>)',
					200: 'rgb(var(--error-200) / <alpha-value>)',
					300: 'rgb(var(--error-300) / <alpha-value>)',
				},
				info: {
					100: 'rgb(var(--info-100) / <alpha-value>)',
					200: 'rgb(var(--info-200) / <alpha-value>)',
					300: 'rgb(var(--info-300) / <alpha-value>)',
				},
				highlight: {
					100: 'rgb(var(--hightlight-100) / <alpha-value>)',
					200: 'rgb(var(--hightlight-200) / <alpha-value>)',
					300: 'rgb(var(--hightlight-300) / <alpha-value>)',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			backgroundImage: {
				'gradient-primary':
					'linear-gradient(269.45deg, #1AF7A9 0%, #08CDDA 100%)',
				'gradient-primary-hover':
					'linear-gradient(180deg, #1af7a9b3 0%, #08cddab5 100%)',
				'gradient-secondary':
					'linear-gradient(180deg, #1D1C2B 0%, #2C2B3D 100%)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'width-increase': {
					from: { width: '0%' },
					to: { width: '100%' },
				},
				'width-descrease': {
					from: { width: '100%' },
					to: { width: '0%' },
				},
				'height-increase': {
					from: { height: '0%' },
					to: { height: '100%' },
				},
				'height-descrease': {
					from: { height: '100%' },
					to: { height: '0%' },
				},
				'fade-up': {
					from: { transform: 'translateY(100%)' },
					to: { transform: 'translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'width-inscrease': 'width-increase 0.5s ease-out',
				'width-descrease': 'width-descrease 0.5s ease-out',
				'height-inscrease': 'height-increase 0.5s ease-out',
				'height-descrease': 'height-descrease 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
			},
		},
	},
	extend: {
		fontFamily: {
			poppins: ['var(--font-poppins)'],
		},
		keyframes: {
			'caret-blink': {
				'0%,70%,100%': { opacity: '1' },
				'20%,50%': { opacity: '0' },
			},
		},
		animation: {
			'caret-blink': 'caret-blink 1.25s ease-out infinite',
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(function ({ addVariant }) {
			// required this to prevent any style on readOnly input elements
			addVariant('not-read-only', '&:not(:read-only)')
		}),
	],
} satisfies Config
