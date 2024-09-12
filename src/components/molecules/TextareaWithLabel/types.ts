import { TextareaProps } from '@/components/ui'

export type TInputDirection = 'horizontal' | 'vertical'

export interface TextareaWithLabelProps extends TextareaProps {
	children?: never
	label?: string
	inputClassName?: string
	labelClassName?: string
	errorClassName?: string
	direction?: TInputDirection
	watchedValue?: string | null | undefined
	error?: React.ReactNode
}
