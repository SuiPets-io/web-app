import { InputProps } from '@/components/ui'

export interface InputWithLabelProps extends InputProps {
	children?: never
	label?: React.ReactNode
	inputClassName?: string
	labelClassName?: string
	errorClassName?: string
	error?: React.ReactNode
}
