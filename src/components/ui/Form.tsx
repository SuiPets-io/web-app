'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren } from 'react'
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	UseFormProps,
	useForm,
} from 'react-hook-form'
import type { Schema } from 'zod'

type FormProps<TFormValues extends FieldValues> = PropsWithChildren<{
	onSubmit: SubmitHandler<TFormValues>
	useFormProps?: UseFormProps<TFormValues>
	validationSchema?: Schema<TFormValues>
	className?: string
}>

export const Form = <
	TFormValues extends Record<string, any> = Record<string, any>,
>({
	onSubmit,
	children,
	useFormProps,
	validationSchema,
	className,
	...formProps
}: FormProps<TFormValues>) => {
	const methods = useForm<TFormValues>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		...useFormProps,
		...(validationSchema && { resolver: zodResolver(validationSchema) }),
	})

	return (
		<FormProvider {...methods}>
			<form
				action="submit"
				noValidate
				onSubmit={methods.handleSubmit(onSubmit)}
				{...formProps}
				className={className}>
				{children}
			</form>
		</FormProvider>
	)
}
