import { useGlobalLoading } from '@/hooks'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
type ClientPortalInterface = {
	children: React.ReactNode
	show?: boolean
	onClose?: () => void
	selector: string
}

export const ClientPortal = ({
	children,
	selector,
	show,
}: ClientPortalInterface) => {
	const ref = useRef<Element | null>(null)
	useEffect(() => {
		ref.current = document.querySelector(selector)
	}, [selector])

	useGlobalLoading(show && !ref.current)

	return show && ref.current ? createPortal(children, ref.current) : null
}
