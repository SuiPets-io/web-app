import { cva } from 'class-variance-authority'

const variantsStyles = {
	size: {
		sm: 'w-[300px]',
		md: 'w-[500px]',
		lg: 'w-[800px]',
		xl: 'w-[1140px]',
		full: 'w-full',
	},
} as const

export const modalVariants = cva([], {
	variants: variantsStyles,
	compoundVariants: [],
	defaultVariants: {
		size: 'md',
	},
})
