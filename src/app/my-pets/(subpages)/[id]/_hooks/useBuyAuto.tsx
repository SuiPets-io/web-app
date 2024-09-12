import { useToast } from '@/components/molecules'
import { globalEnv, queryClient } from '@/configs'
import { CHECK_TX_STATUS, CHECK_TX_TYPE, queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { activeAutoInput } from '@/external/api/pet/active-auto'
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

const useBuyAuto = ({
	position,
	onSuccess,
	onError,
}: {
	position: number | null
	onSuccess?: () => void
	onError?: () => void
}) => {
	const { onDisconnect } = useDisconnectWallet()
	const result = useBalance({})
	const balance = result.data?.formatted || 0

	const {
		mutate,
		isPending: isLoadingBuyAuto,
		isSuccess,
	} = useMutation({
		mutationFn: (params: activeAutoInput) => petApi.activeAuto(params),
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'Buy Item',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	const handleBuyAutoAfterTx = useCallback(
		(hash: string) => {
			if (hash && position !== null) {
				mutate({ txHash: hash, position })
			}
		},
		[mutate, position]
	)

	const {
		data: hash,
		sendTransaction,
		isPending: isPendingSendTx,
		error: sendError,
	} = useSendTransaction({
		onCallback: handleBuyAutoAfterTx,
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
		type: CHECK_TX_TYPE.ACTIVE_AUTO,
	})

	const { toast } = useToast()

	const handleSend = async ({ amount }: { amount: number }) => {
		if (balance < amount) {
			toast({
				title: 'Buy Item',
				description: 'Sorry, you do not have enough SUI to buy',
				variant: 'error',
			})
		} else {
			sendTransaction({
				to: globalEnv.adminWalletAddress as any,
				value: [createCoin(amount)],
			})
		}
	}

	const handleSendSuccess = useCallback(() => {
		if (isConfirmed) {
			result.refetch()
			toast({
				title: 'Buy Item',
				description: 'Transaction confirmed.',
				variant: 'success',
				duration: 2000,
			})

			onSuccess && onSuccess()

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
				title: 'Buy Item',
				description: errorMsg,
				variant: 'error',
			})
			onError && onError()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendError, confirmError, toast])

	useEffect(() => {
		handleSendError()
	}, [handleSendError])

	useEffect(() => {
		if (isPendingSendTx) {
			toast({
				title: 'Buy Item',
				description: 'Buying...',
				duration: 5000,
			})
		} else if (isConfirming) {
			toast({
				title: 'Buy Item',
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
		toast,
		checkTxData,
		isSuccess,
	])

	useGlobalLoading(
		isPendingSendTx ||
			isLoadingBuyAuto ||
			isConfirming ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK
	)

	return {
		mutate: handleSend,
		isLoading:
			isPendingSendTx ||
			isLoadingBuyAuto ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK,
	}
}

export default useBuyAuto
