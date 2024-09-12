'use client'

import { useModal } from '@/components/molecules/GlobalModal'
import { Form } from '@/components/ui'
import { useBalance, useGlobalLoading } from '@/hooks'
import { useEffect, useRef } from 'react'
import { SubmitHandler } from 'react-hook-form'
import useTransferSUI from '../_hooks/useTransferSUI'
import { SendTokenSchemaFn, TSendToken } from './sendSchema'
import TransferBlock from './TransferBlock'

const SendSUIModal = () => {
	const { closeModal } = useModal()
	const ref = useRef<{ reset: () => void; load: (a: boolean) => void }>(null)
	const SUIBalance = useBalance({})

	const { mutate, isLoading } = useTransferSUI({
		onSuccess: () => {
			ref?.current?.reset()
			closeModal()
		},
	})
	const onHandleSubmit: SubmitHandler<TSendToken> = (data) => {
		mutate(data)
	}

	useGlobalLoading(isLoading)

	useEffect(() => {
		if (ref.current) {
			ref.current.load(isLoading)
		}
	}, [isLoading])

	return (
		<Form
			validationSchema={SendTokenSchemaFn(SUIBalance.data?.formatted || 0)}
			onSubmit={onHandleSubmit}
			className="px-4">
			<TransferBlock ref={ref} />
		</Form>
	)
}

export default SendSUIModal
