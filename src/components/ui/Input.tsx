import { cn } from '@/utils'
import { type VariantProps } from 'class-variance-authority'
import React, { useId } from 'react'
import { inputVariants } from '../cva-styles'

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>,
		VariantProps<typeof inputVariants> {
	prefix?: React.ReactNode
	suffix?: React.ReactNode
	innerInputClassName?: string
}

const ForwardRefRenderInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = (props, topRef) => {
	const {
		id,
		className,
		variant = 'normal',
		sizeScale,
		type = 'text',
		required,
		innerInputClassName,
		prefix,
		suffix,
		disabled,
		...othersProps
	} = props
	const componentId = useId()
	const inputId = id || componentId

	return (
		<div
			className={cn(
				'w-full flex items-center group h-12 rounded-xl bg-white font-normal text-sm',
				inputVariants({ variant, sizeScale }),
				disabled ? 'pointer-events-none bg-gray-100' : '',
				className
			)}>
			{prefix && (
				<div className="relative whitespace-nowrap leading-normal w-fit mr-2">
					{prefix}
				</div>
			)}
			<input
				ref={topRef}
				id={inputId}
				className={cn(
					'w-full text-sm border-0 bg-transparent p-0 focus:outline-none focus:ring-0 placeholder-neutral-400',
					innerInputClassName
				)}
				type={type}
				required={required}
				disabled={disabled}
				{...othersProps}
			/>
			{suffix && (
				<span className="whitespace-nowrap leading-normal ml-2">{suffix}</span>
			)}
		</div>
	)
}

export const Input = React.forwardRef(ForwardRefRenderInput)
