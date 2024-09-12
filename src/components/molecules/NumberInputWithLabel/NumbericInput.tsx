import { inputVariants } from '@/components/cva-styles'
import { cn } from '@/utils'
import { type VariantProps } from 'class-variance-authority'
import React, { useId } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

export interface NumberInputProps
	extends Omit<NumericFormatProps, 'prefix' | 'suffix'>,
		VariantProps<typeof inputVariants> {
	prefix?: React.ReactNode
	suffix?: React.ReactNode
	innerInputClassName?: string
}

const ForwardRefRenderInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	NumberInputProps
> = (props, topRef) => {
	const {
		id,
		className,
		variant = 'normal',
		sizeScale,
		required,
		innerInputClassName,
		prefix,
		suffix,
		disabled,
		placeholder,
		...othersProps
	} = props
	const componentId = useId()
	const inputId = id || componentId

	return (
		<div className="w-full">
			<div className={cn('relative w-full')}>
				<div
					className={cn(
						'w-full flex items-center group h-12 rounded-lg font-normal text-sm bg-white',
						inputVariants({ variant, sizeScale }),
						disabled ? 'pointer-events-none bg-neutral-100' : '',
						className
					)}>
					{prefix && (
						<div className="relative whitespace-nowrap w-fit flex items-center">
							{prefix}
						</div>
					)}
					<NumericFormat
						getInputRef={topRef}
						id={inputId}
						className={cn(
							'w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 placeholder-neutral-400',
							innerInputClassName
						)}
						required={required}
						disabled={disabled}
						placeholder={placeholder}
						{...othersProps}
					/>
					{suffix && (
						<span className="whitespace-nowrap leading-normal flex items-center">
							{suffix}
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export const NumberInput = React.forwardRef(ForwardRefRenderInput)
