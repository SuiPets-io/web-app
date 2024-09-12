'use client'
import { Label as AtomicLabel, Text } from '@/components/ui'
import { cn } from '@/utils'
import React, { forwardRef } from 'react'
import { NumberInput } from './NumbericInput'
import { NumberInputWithLabelProps } from './types'

const ForwardRefRenderNumberInputWithLabel: React.ForwardRefRenderFunction<
	HTMLInputElement,
	NumberInputWithLabelProps
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
		watchedValue,
		prefix,
		suffix,
		innerInputClassName,
		placeholder,
		...inputProps
	} = props

	return (
		<div className="w-full">
			<div className={cn('flex gap-2 flex-col items-start w-full', className)}>
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

				<div className="flex flex-col gap-2 w-full">
					<NumberInput
						{...inputProps}
						ref={inputRef}
						id={inputId}
						className={cn('w-full', inputClassName)}
						sizeScale={sizeScale}
						variant={error ? 'invalid' : 'normal'}
						required={required}
						prefix={prefix}
						suffix={suffix}
						innerInputClassName={innerInputClassName}
						placeholder={placeholder}
					/>
				</div>
			</div>
			{error && (
				<Text textTag="span" title={error} variant="error" size="small" />
			)}
		</div>
	)
}

const NumberInputWithLabel = forwardRef(ForwardRefRenderNumberInputWithLabel)
export { NumberInputWithLabel }
