'use client'

import {
	Label as AtomicLabel,
	TextArea as AtomicTextarea,
	Text,
} from '@/components/ui'
import { cn } from '@/utils'
import React, { forwardRef } from 'react'
import { TextareaWithLabelProps } from './types'

const ForwardRefRenderTextareaWithLabel: React.ForwardRefRenderFunction<
	HTMLTextAreaElement,
	TextareaWithLabelProps
> = (props, inputRef) => {
	const inputId = React.useId()

	const {
		className,
		labelClassName,
		inputClassName,
		label,
		error,
		sizeScale,
		direction,
		required,
		...inputProps
	} = props

	return (
		<div className="w-full">
			<div
				className={cn(
					'flex gap-2 flex-col items-start w-full',
					direction === 'horizontal' ? 'lg:flex-row lg:items-center' : '',
					className
				)}>
				{label && (
					<AtomicLabel
						className={cn(['w-full', labelClassName])}
						htmlFor={inputId}>
						{label}
						{required && (
							<span className="text-red-500 ml-2 h-[10px] leading-[14px] mt-[6px]">
								*
							</span>
						)}
					</AtomicLabel>
				)}

				<AtomicTextarea
					{...inputProps}
					ref={inputRef}
					id={inputId}
					className={cn('w-full', inputClassName)}
					sizeScale={sizeScale}
					variant={error ? 'invalid' : 'normal'}
					required={required}
				/>
			</div>
			{error && (
				<Text textTag="span" title={error} variant="error" size="small" />
			)}
		</div>
	)
}

const TextareaWithLabel = forwardRef(ForwardRefRenderTextareaWithLabel)
export { TextareaWithLabel }
