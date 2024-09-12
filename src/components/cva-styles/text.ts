import { cva } from 'class-variance-authority'

const variantStyles = {
	variant: {
		default: 'font-normal text-sm',
		d2: 'text-2.5xl font-semibold',
		headline: 'text-xl font-semibold leading-7',
		t2: 'text-sm font-semibold',
		t1: 'text-xl font-medium',
		caption: 'text-xs font-medium leading-5',
		body: 'text-sm font-medium',
		button: 'text-sm font-semibold leading-4',
		blockquote: 'italic',
		muted: 'text-muted-foreground',
		error: 'text-red-500',
		hint: 'italic text-teal-500',
	},
	size: {
		xsmall: 'text-xs',
		small: 'text-sm',
		medium: 'text-sm',
		large: 'text-lg',
		xlarge: 'text-2xl',
	},
} as const

export const textVariants = cva('tracking-tight', {
	variants: variantStyles,
	compoundVariants: [],
	defaultVariants: {
		variant: 'default',
	},
})
