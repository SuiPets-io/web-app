'use client'
import { cn } from '@/utils'
import * as TooltipPremitive from '@radix-ui/react-tooltip'
import type { ForwardedRef, PropsWithChildren, ReactNode } from 'react'
import { forwardRef, useState } from 'react'

export type TooltipProps = Omit<
	TooltipPremitive.TooltipContentProps,
	'content'
> &
	PropsWithChildren<{
		content?: ReactNode
		contentClass?: string
		arrowClass?: string
	}>

export function TooltipProvider(props: TooltipPremitive.TooltipProviderProps) {
	return <TooltipPremitive.Provider {...props} delayDuration={300} />
}

export function TooltipRoot(props: TooltipPremitive.TooltipProps) {
	return <TooltipPremitive.Root {...props} />
}

export function TooltipTrigger(props: TooltipPremitive.TooltipTriggerProps) {
	return (
		<TooltipPremitive.Trigger
			{...props}
			className={cn('flex items-center', props.className)}
		/>
	)
}

export function TooltipPortal(props: TooltipPremitive.TooltipPortalProps) {
	return <TooltipPremitive.Portal {...props} />
}

export const TooltipContent = forwardRef(function Comp(
	props: TooltipPremitive.TooltipContentProps,
	ref: ForwardedRef<HTMLDivElement>
) {
	return (
		<TooltipPremitive.Content
			{...props}
			ref={ref}
			className={cn(
				'py-2 px-2.5 bg-neutral-500 text-white font-medium rounded leading-tight tracking-tight',
				props.className
			)}
		/>
	)
})

export function TooltipArrow(props: TooltipPremitive.TooltipArrowProps) {
	return (
		<TooltipPremitive.Arrow
			{...props}
			className={cn('fill-neutral-700', props.className)}
		/>
	)
}

export function Tooltip({
	children,
	contentClass,
	content,
	arrowClass,
	...props
}: TooltipProps) {
	const [open, setOpen] = useState(false)
	return (
		<TooltipProvider>
			<TooltipRoot open={!!content && open} onOpenChange={setOpen}>
				<TooltipTrigger>{children}</TooltipTrigger>
				{content && (
					<TooltipPortal>
						<TooltipContent
							className={cn('z-50 shadow max-w-[300px]', contentClass)}
							{...props}>
							<span dangerouslySetInnerHTML={{ __html: content.toString() }} />
							<TooltipArrow className={cn(arrowClass)} />
						</TooltipContent>
					</TooltipPortal>
				)}
			</TooltipRoot>
		</TooltipProvider>
	)
}
