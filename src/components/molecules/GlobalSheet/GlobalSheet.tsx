'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui'
import { cn } from '@/utils'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSheet } from './useSheet'

export function GlobalSheet() {
	const { className, isOpen, view, closeSheet, side, isToggle, title } =
		useSheet()
	const pathname = usePathname()

	useEffect(() => {
		closeSheet()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])
	return (
		<Sheet
			open={isOpen}
			onOpenChange={(open) => {
				if (!open && isToggle) {
					closeSheet()
				}
			}}>
			<SheetContent className={cn(className)} side={side}>
				{title && (
					<SheetHeader>
						<SheetTitle>{title}</SheetTitle>
					</SheetHeader>
				)}
				{view}
			</SheetContent>
		</Sheet>
	)
}
