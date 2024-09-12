'use client'

import { Toaster } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Toaster>

const Sonner = ({ ...props }: ToasterProps) => {
	return (
		<Toaster
			theme={'dark'}
			className="toaster group"
			position="top-right"
			toastOptions={{
				classNames: {
					toast:
						'group group-[.toaster]:!font-poppins toast group-[.toaster]:bg-sky-500 group-[.toaster]:text-foreground group-[.toaster]:shadow-lg group-[.toaster]:border-0',
					title: 'group-[.toaster]:!font-poppins font-semibold text-lg',
					description:
						'group-[.toaster]:!font-poppins group-[.toast]:text-white text-sm',
					actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-white',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
				},
			}}
			{...props}
		/>
	)
}

export { Sonner }
