export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalType = {
	/** Whether the Modal is open or not */
	isOpen: boolean

	onClose: () => void

	/** Preset size of modal is sm, DEFAULT, lg, xl, full */
	size?: ModalSize
	/** Set custom style classes for the Modal root element */
	className?: string
	/** Set open/close state of modal */
	onToggle?: (state: boolean) => void

	title?: string
	customSize?: string
}

export interface ModalProps extends React.PropsWithChildren<ModalType> {}
