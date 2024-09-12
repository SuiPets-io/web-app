import { cn } from '@/utils'
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
	'inline-flex gap-2 rounded-full items-center justify-center whitespace-nowrap text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-green-500 text-neutral-white border border-green-400 hover:bg-green-500/80',
				secondary:
					'bg-gradient-to-r from-orange-200 to-orange-100 border border-orange-300 text-orange-400 hover:opacity-80',
				icon: 'bg-green-500 text-neutral-white hover:bg-gradient-secondary/80',
				green: cn(
					'transition-all  text-white px-6 py-2',
					'bg-green-500 border-green-400 border-[1px] border-b-[4px]',
					'hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]',
					'active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'
				),
				white: cn(
					'transition-all text-green-500 px-6 py-2',
					'bg-white border-green-400 border-[1px] border-b-[4px]',
					'hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]',
					'active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'
				),
				orange: cn(
					'transition-all text-orange-400 px-6 py-2',
					'bg-gradient-to-r from-orange-200 to-orange-100 border-orange-300 border-[1px] border-b-[4px]',
					'hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]',
					'active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'
				),
				'orange-outline': cn(
					'transition-all text-[#F79D5B] px-6 py-2',
					'bg-white border-orange-300 border-[1px] border-b-[4px]',
					'hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]',
					'active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'
				),
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-green-500 text-green-500 bg-white hover:opacity-80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-[35px] px-4 py-3',
				sm: 'h-8 px-3 text-xs',
				lg: 'h-12 px-8',
				icon: 'h-8 w-8',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)
