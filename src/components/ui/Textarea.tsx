'use client'

import { cn } from '@/utils'
import { type VariantProps } from 'class-variance-authority'
import React, { useId, useImperativeHandle, useRef } from 'react'
import { inputVariants } from '../cva-styles/input'

export interface TextareaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix'>,
		VariantProps<typeof inputVariants> {
	innerInputClassName?: string
	isResize?: boolean
	maxRows?: number
	showCount?: boolean
	prefix?: React.ReactNode
	suffix?: React.ReactNode
	isHide?: boolean
}

const ForwardRefRenderArea: React.ForwardRefRenderFunction<
	HTMLTextAreaElement,
	TextareaProps
> = (props, topRef) => {
	const {
		id,
		className,
		variant,
		sizeScale,
		innerInputClassName,
		disabled,
		isResize = false,
		maxRows,
		rows,
		maxLength,
		value,
		onChange,
		showCount,
		prefix,
		suffix,
		isHide,
		...othersProps
	} = props
	const componentId = useId()
	const inputId = id || componentId
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const lineHeight = useRef<number>(textareaRef.current?.clientHeight || 0)

	useImperativeHandle(topRef, () => textareaRef.current as HTMLTextAreaElement)

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			const { scrollHeight, clientHeight } = textareaRef.current
			if (lineHeight.current === 0) {
				lineHeight.current = clientHeight
			} else {
				const newRows = Math.ceil(scrollHeight / lineHeight.current)
				if (maxRows && newRows > maxRows) {
					textareaRef.current.rows = maxRows
				} else if (rows && newRows < rows) {
					textareaRef.current.rows = rows
				} else {
					textareaRef.current.rows = newRows
				}
			}
		}
	}

	return (
		<div className={cn('relative w-full')}>
			<div
				className={cn(
					'relative w-full flex items-center peer bg-neutral-50 overflow-hidden',
					inputVariants({ variant, sizeScale }),
					disabled ? 'pointer-events-none opacity-50 bg-gray-100' : '',
					className
				)}>
				{prefix && (
					<div className="relative whitespace-nowrap leading-normal w-fit mr-2">
						{prefix}
					</div>
				)}
				<div className="relative w-full">
					{isHide ? (
						<span className="z-10 bg-[#ffffff33] backdrop-blur-md w-full h-full absolute top-0 left-0" />
					) : null}
					<textarea
						ref={textareaRef}
						id={inputId}
						className={cn(
							'w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 text-neutral-800',
							!isResize ? 'resize-none' : '',
							innerInputClassName
						)}
						disabled={disabled}
						rows={rows}
						onChange={(e) => {
							if (onChange) {
								onChange(e)
							}
							adjustTextareaHeight()
						}}
						value={value}
						maxLength={maxLength}
						{...othersProps}
					/>
				</div>
				{suffix && (
					<span className="whitespace-nowrap leading-normal ml-2">
						{suffix}
					</span>
				)}

				{showCount && (
					<div className="absolute bottom-1 right-1 text-xs text-gray-400">
						{(typeof value === 'string' && value?.length) || 0}{' '}
						{maxLength && `/ ${maxLength}`}
					</div>
				)}
			</div>
		</div>
	)
}

export const TextArea = React.forwardRef(ForwardRefRenderArea)
