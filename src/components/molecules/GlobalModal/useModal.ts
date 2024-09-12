import { ModalSize } from '@/components/ui/Modal/types'
import { atom, useAtomValue, useSetAtom } from 'jotai'

type ModalTypes = {
	view: React.ReactNode
	isOpen: boolean
	customSize?: string
	size?: ModalSize
	isToggle?: boolean
	title?: string
}

const modalAtom = atom<ModalTypes>({
	isOpen: false,
	view: null,
	isToggle: true,
	title: '',
	customSize: '',
})

export function useModal() {
	const state = useAtomValue(modalAtom)
	const setState = useSetAtom(modalAtom)

	const openModal = ({
		view,
		size,
		title,
		customSize,
	}: {
		view: React.ReactNode
		customSize?: string
		size?: ModalSize
		title?: string
	}) => {
		setState({
			...state,
			isOpen: true,
			view,
			size,
			title,
			customSize,
		})
	}

	const closeModal = () => {
		setState({
			...state,
			isOpen: false,
		})
	}

	return {
		...state,
		openModal,
		closeModal,
	}
}
