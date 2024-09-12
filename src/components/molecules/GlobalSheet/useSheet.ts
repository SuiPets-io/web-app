import { atom, useAtomValue, useSetAtom } from 'jotai'

type TSHEET_SIDE = 'top' | 'right' | 'bottom' | 'left'

type SheetTypes = {
	title?: string
	view: React.ReactNode
	isOpen: boolean
	className?: string
	side?: TSHEET_SIDE
	isToggle?: boolean
}

const sheetAtom = atom<SheetTypes>({
	title: '',
	isOpen: false,
	view: null,
	side: 'right',
	isToggle: true,
})

export function useSheet() {
	const state = useAtomValue(sheetAtom)
	const setState = useSetAtom(sheetAtom)

	const openSheet = (props: Omit<SheetTypes, 'isOpen'>) => {
		setState({
			...state,
			isOpen: true,
			...props,
		})
	}

	const closeSheet = () => {
		setState({
			...state,
			isOpen: false,
		})
	}

	return {
		...state,
		openSheet,
		closeSheet,
	}
}
