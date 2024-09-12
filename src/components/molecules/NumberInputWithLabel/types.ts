import { NumberInputProps } from './NumbericInput'

export interface NumberInputWithLabelProps extends NumberInputProps {
	children?: never
	label?: React.ReactNode
	inputClassName?: string
	labelClassName?: string
	errorClassName?: string
	watchedValue?: string | number | null | undefined
	error?: React.ReactNode
}
