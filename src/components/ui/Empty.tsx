import EmptyIcon from '@/assets/images/empty.png'
import { cn } from '@/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
	text: React.ReactElement | string
	image?: React.ReactNode
	className?: string
	textClassName?: string
	imageClassName?: string
	imageHeight?: number
	imageWidth?: number
}

export const Empty = ({
	text,
	image,
	className,
	textClassName,
	imageClassName,
	imageHeight,
	imageWidth,
}: Props) => {
	return (
		<div className={cn('flex flex-col items-center gap-3', className)}>
			<div className={cn(imageClassName)}>
				{image ? (
					image
				) : (
					<Image
						src={EmptyIcon}
						alt="empty"
						width={imageHeight || 60}
						height={imageWidth || 60}
					/>
				)}
			</div>
			<p className={cn(textClassName)}>{text}</p>
		</div>
	)
}
