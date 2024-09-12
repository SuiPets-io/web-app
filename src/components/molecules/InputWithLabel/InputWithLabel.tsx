'use client'

import {
	Input as AtomicInput,
	Label as AtomicLabel,
	Text,
} from '@/components/ui'
import { cn } from '@/utils'
import React, { forwardRef } from 'react'
import { InputWithLabelProps } from './types'

const ForwardRefRenderInputWithLabel: React.ForwardRefRenderFunction<
	HTMLInputElement,
	InputWithLabelProps
> = (props, inputRef) => {
	const inputId = React.useId()

	const {
		className,
		labelClassName,
		inputClassName,
		label,
		error,
		sizeScale,
		required,
		prefix,
		suffix,
		...inputProps
	} = props

	return (
		<div className="w-full">
			<div className={cn('flex gap-2 flex-col items-start w-full', className)}>
				{label && (
					<AtomicLabel
						className={cn(['w-full text-sm font-semibold', labelClassName])}
						htmlFor={inputId}>
						{label}
						{required && (
							<span className="text-red-500 ml-2 h-[10px] leading-[14px] mt-[6px]">
								*
							</span>
						)}
					</AtomicLabel>
				)}

				<AtomicInput
					{...inputProps}
					ref={inputRef}
					id={inputId}
					className={cn('w-full', inputClassName)}
					sizeScale={sizeScale}
					variant={error ? 'invalid' : 'normal'}
					required={required}
					prefix={prefix}
					suffix={suffix}
				/>
			</div>
			{error && (
				<Text textTag="span" title={error} variant="error" size="small" />
			)}
		</div>
	)
}

const InputWithLabel = forwardRef(ForwardRefRenderInputWithLabel)
export { InputWithLabel }
