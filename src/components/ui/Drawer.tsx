'use client'

import { cn } from '@/utils'
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

const Drawer = ({
	shouldScaleBackground = true,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		shouldScaleBackground={shouldScaleBackground}
		{...props}
	/>
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn('fixed inset-0 z-50 bg-neutral-800/80', className)}
		{...props}
	/>
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DrawerPortal>
		<DrawerOverlay />
		<DrawerPrimitive.Content
			ref={ref}
			className={cn(
				'fixed inset-x-0 z-50 bottom-0 mt-24 md:rounded-3xl rounded-t-3xl flex h-auto flex-col bg-neutral-50 after:hidden pb-8',
				className
			)}
			{...props}>
			<div className="py-3">
				<div className="mx-auto h-1 w-10 rounded-full bg-neutral-500" />
			</div>
			{children}
		</DrawerPrimitive.Content>
	</DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('grid gap-1.5 px-4 text-center sm:text-left', className)}
		{...props}
	/>
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('mt-auto flex flex-col gap-2 p-4', className)}
		{...props}
	/>
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn('text-xl font-semibold tracking-tight', className)}
		{...props}
	/>
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Description
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
}
