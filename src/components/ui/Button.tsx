'use client'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@//utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { buttonVariants } from '../cva-styles'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			loading,
			disabled,
			children,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={disabled || loading}
				{...props}>
				{loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}{' '}
				{children}
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
