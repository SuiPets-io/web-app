// import { modalVariants } from '@/components/cva-styles'
// import { useMediaQuery } from '@/hooks'
// import { cn } from '@/utils'
import { cn } from '@/utils'
import { Cross1Icon } from '@radix-ui/react-icons'
import {
	Button,
	// Dialog,
	// DialogContent,
	// DialogHeader,
	// DialogTitle,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '..'
import { ModalProps } from './types'

export function Modal({
	isOpen,
	className,
	// size,
	children,
	onToggle,
	onClose,
	title,
	customSize,
}: ModalProps) {
	// const isDesktop = useMediaQuery('(min-width: 768px)')

	// if (isDesktop) {
	// 	return (
	// 		<Dialog open={isOpen} onOpenChange={onToggle}>
	// 			<DialogContent
	// 				className={cn(
	// 					'sm:max-w-[425px]',
	// 					modalVariants({ size }),
	// 					className
	// 				)}>
	// 				<DialogHeader className="text-left flex justify-between items-center">
	// 					<DialogTitle>{title}</DialogTitle>
	// 					<Button
	// 						variant="ghost"
	// 						className="text-neutral-400 p-2 h-fit"
	// 						onClick={onClose}>
	// 						<Cross1Icon className="w-4 h-4" />
	// 					</Button>
	// 				</DialogHeader>
	// 				<div>{children}</div>
	// 			</DialogContent>
	// 		</Dialog>
	// 	)
	// }

	return (
		<Drawer open={isOpen} onOpenChange={onToggle}>
			<DrawerContent
				className={cn(
					'md:max-w-[450px] md:left-1/2 md:!top-1/2 md:!-translate-y-1/2 md:!-translate-x-1/2 h-fit',
					className,
					customSize
				)}>
				<DrawerHeader
					className={cn(
						'text-left flex justify-between items-center',
						title ? 'pb-2' : ''
					)}>
					<DrawerTitle>{title}</DrawerTitle>
					<Button
						variant="ghost"
						className="text-neutral-800 p-2 h-fit z-10 group"
						onClick={onClose}>
						<Cross1Icon className="w-4 h-4 group-hover:text-neutral-400" />
					</Button>
				</DrawerHeader>
				{children}
			</DrawerContent>
		</Drawer>
	)
}
