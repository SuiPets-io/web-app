import { useToast } from '@/components/molecules'
import { globalEnv, queryClient } from '@/configs'
import { CHECK_TX_STATUS, CHECK_TX_TYPE, queryKeys } from '@/constants'
import { EggType } from '@/external/api/egg/get-my-egg'
import { petApi } from '@/external/api/pet'
import { fusionInput } from '@/external/api/pet/fusion'
import {
	useBalance,
	useCheckTransaction,
	useDisconnectWallet,
	useGlobalLoading,
	useSendTransaction,
	useWaitForTransactionReceipt,
} from '@/hooks'
import { createCoin } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

const useFusion = ({
	params,
	onSuccess,
	onError,
}: {
	params: Omit<fusionInput, 'txHash'>
	onSuccess?: (data: EggType) => void
	onError?: () => void
}) => {
	const { onDisconnect } = useDisconnectWallet()
	const result = useBalance({})
	const balance = result.data?.formatted || 0

	const {
		mutate,
		isPending: isLoadingFusion,
		isSuccess,
	} = useMutation({
		mutationFn: (params: fusionInput) => petApi.fusion(params),
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'Breed',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	const handleFusionAfterSendTx = useCallback(
		(hash: string) => mutate({ txHash: hash, ...params }),
		[mutate, params]
	)

	const {
		data: hash,
		sendTransaction,
		isPending: isPendingSendTx,
		error: sendError,
	} = useSendTransaction({
		onCallback: handleFusionAfterSendTx,
	})

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		error: confirmError,
	} = useWaitForTransactionReceipt({
		hash,
	})

	const { data: checkTxData } = useCheckTransaction({
		txHash: isSuccess && hash ? hash : '',
		type: CHECK_TX_TYPE.FUSION,
	})

	const { toast } = useToast()

	const handleSend = async ({ amount }: { amount: number }) => {
		const petInfo = await petApi.getFusionDetail({ petId: params.givePetId })
		const newAmount = petInfo?.fusion?.amount

		if (amount) {
			if (amount !== newAmount) {
				toast({
					title: 'Buy Egg',
					description: 'Price changed. Please reconfirm!',
					variant: 'warning',
				})
				queryClient.invalidateQueries({
					queryKey: queryKeys.privateQuery,
					refetchType: 'active',
				})
				return
			}

			if (balance < amount) {
				toast({
					title: 'Breed',
					description: 'Sorry, you do not have enough SUI to breed',
					variant: 'error',
				})
			} else {
				sendTransaction({
					to: globalEnv.adminWalletAddress as any,
					value: [createCoin(amount)],
				})
			}
		}
	}

	const handleSendSuccess = useCallback(() => {
		if (isConfirmed) {
			result.refetch()
			toast({
				title: 'Breed',
				description: 'Transaction confirmed.',
				variant: 'success',
				duration: 2000,
			})

			checkTxData?.info && onSuccess && onSuccess(checkTxData.info)

			queryClient.invalidateQueries({
				queryKey: queryKeys.privateQuery,
				refetchType: 'active',
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConfirmed, checkTxData])

	const handleSendError = useCallback(() => {
		if (sendError || confirmError) {
			const errorMsg =
				(sendError as any)?.details ||
				JSON.stringify(sendError) ||
				JSON.stringify(confirmError)
			toast({
				title: 'Breed',
				description: errorMsg,
				variant: 'error',
			})
			onError && onError()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendError, confirmError])

	useEffect(() => {
		handleSendError()
	}, [handleSendError])

	useEffect(() => {
		if (isPendingSendTx) {
			toast({
				title: 'Breed',
				description: 'Breeding...',
				duration: 5000,
			})
		} else if (isConfirming) {
			toast({
				title: 'Breed',
				description: 'Waiting for confirmation...',
				duration: 5000,
			})
		} else if (isConfirmed && isSuccess) {
			if (checkTxData?.status === CHECK_TX_STATUS.SUCCESS) {
				handleSendSuccess()
			}
		}
	}, [
		isPendingSendTx,
		isConfirming,
		isConfirmed,
		handleSendSuccess,
		checkTxData,
		isSuccess,
		toast,
	])

	useGlobalLoading(
		isPendingSendTx ||
			isLoadingFusion ||
			isConfirming ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK
	)

	return {
		mutate: handleSend,
		isLoading:
			isPendingSendTx ||
			isLoadingFusion ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK,
	}
}

export default useFusion
