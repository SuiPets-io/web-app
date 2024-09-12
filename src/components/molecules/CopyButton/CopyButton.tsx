'use client'
import { Button, ButtonProps, CopyIcon, Tooltip } from '@/components/ui'
import { cn } from '@/utils'
import { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

interface CopyButtonProps extends ButtonProps {
	content?: string
	iconClassName?: string
}

export const CopyButton = ({
	content,
	className,
	children,
	iconClassName,
	...props
}: CopyButtonProps) => {
	const [isCopied, setCopied] = useState(false)
	const [_, copy] = useCopyToClipboard()

	return (
		<Tooltip content={isCopied ? 'Copied' : ''}>
			<Button
				className={className}
				variant="icon"
				disabled={!content}
				onClick={(e) => {
					e.stopPropagation()
					setCopied(true)
					content && copy(content)
					setTimeout(() => setCopied(false), 1000)
				}}
				{...props}>
				{children ? (
					children
				) : (
					<CopyIcon className={cn('fill-neutral-300', iconClassName)} />
				)}
			</Button>
		</Tooltip>
	)
}
