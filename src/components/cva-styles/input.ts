import { cva } from 'class-variance-authority'

const variantsStyles = {
	sizeScale: {
		xsmall: 'text-sm py px-1',
		small: 'text-sm py-2 px-3',
		medium: 'text-sm py-2 px-4',
		large: 'text-sm p-4 sm:p-5',
		xlarge: 'text-xl p-4 sm:p-5',
	},
	variant: {
		normal: [
			'rounded-xl text-neutral-800',
			'outline outline-[1px] outline-green-400',
			'disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-100',
			'dark:bg-slate-900 dark:outline-gray-700 dark:text-gray-400',
		],
		invalid: [
			'outline outline-[1px] outline-red-500 rounded-xl',
			'focus:outline-red-500 focus:ring-red-500',
			'dark:bg-gray-800 dark:outline-gray-700 dark:text-gray-400',
		],
		lookgood: [
			'outline outline-[1px] outline-teal-500 dark:bg-gray-800',
			'focus:outline-teal-500 focus:ring-teal-500',
			'dark:outline-gray-700 dark:text-gray-400',
		],
	},
} as const

export const inputVariants = cva(['rounded-2xl', 'text-sm text-neutral-800'], {
	variants: variantsStyles,
	compoundVariants: [],
	defaultVariants: {
		variant: 'normal',
		sizeScale: 'medium',
	},
})
