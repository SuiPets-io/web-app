import { cva } from 'class-variance-authority'

export const toastVariants = cva(
	'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
	{
		variants: {
			variant: {
				default: 'border bg-neutral-white text-neutral-800',
				error: 'group border-error-300 bg-error-300 text-neutral-white',
				warning: 'group border-yellow-500 bg-yellow-500 text-neutral-white',
				success: 'group border-success-300 bg-success-300 text-neutral-white',
				info: 'group border-sky-500 bg-sky-500 text-neutral-white',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)
