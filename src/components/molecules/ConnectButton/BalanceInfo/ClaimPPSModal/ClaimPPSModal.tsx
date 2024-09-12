'use client'

import useGetUserConfig from '@/app/my-pets/(subpages)/_hooks/useGetUserConfig'
import { useModal } from '@/components/molecules/GlobalModal'
import { Form } from '@/components/ui'
import { useGlobalLoading, useProfile } from '@/hooks'
import { SubmitHandler } from 'react-hook-form'
import useClaimPPS from '../_hooks/useClaimPPS'
import TransferBlock from './ClaimBlock'
import { SendTokenSchemaFn, TSendToken } from './sendSchema'

const ClaimPPSToOnchainModal = () => {
	const { data: userInfo } = useProfile()
	const { data: userConfig } = useGetUserConfig()
	const { closeModal } = useModal()

	const { mutate, isLoading } = useClaimPPS({
		onSuccess: () => {
			closeModal()
		},
	})
	const onHandleSubmit: SubmitHandler<TSendToken> = (data) => {
		if (userConfig?.CLAIM_PPS_FEE !== undefined) {
			mutate({
				ppsAmount: data.amount,
				SUIfee: userConfig.CLAIM_PPS_FEE,
			})
		}
	}

	useGlobalLoading(isLoading)

	return (
		<Form
			validationSchema={SendTokenSchemaFn(userInfo?.pps || 0)}
			onSubmit={onHandleSubmit}
			className="px-4">
			<TransferBlock />
		</Form>
	)
}

export default ClaimPPSToOnchainModal
