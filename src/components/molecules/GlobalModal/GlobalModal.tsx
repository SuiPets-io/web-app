'use client'

import { Modal } from '@/components/ui'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useModal } from './useModal'

export function GlobalModal() {
	const { isOpen, view, closeModal, size, isToggle, title, customSize } =
		useModal()
	const pathname = usePathname()
	useEffect(() => {
		closeModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	return (
		<Modal
			customSize={customSize}
			isOpen={isOpen}
			size={size}
			onToggle={(open) => {
				if (!open && isToggle) {
					closeModal()
				}
			}}
			title={title}
			onClose={closeModal}>
			{view}
		</Modal>
	)
}
