import { cn } from '@/utils'
import { VariantProps } from 'class-variance-authority'
import React from 'react'
import { textVariants } from '../cva-styles'

interface TextProps
	extends React.PropsWithChildren<VariantProps<typeof textVariants>> {
	textTag?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'p'
		| 'b'
		| 'span'
		| 'strong'
		| 'abbr'
		| 'q'
		| 'del'
		| 'em'
		| 'i'
		| 'small'
	title?: React.ReactNode
	className?: string
}

export const Text = ({
	textTag = 'p',
	title,
	className,
	children,
	variant,
	size,
	...props
}: TextProps) => {
	const Tag = textTag

	return (
		<Tag className={cn(textVariants({ size, variant, className }))} {...props}>
			{children ?? title}
		</Tag>
	)
}
