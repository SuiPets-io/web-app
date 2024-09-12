import { useToast } from '@/components/molecules'
import { globalEnv, queryClient } from '@/configs'
import { CHECK_TX_STATUS, CHECK_TX_TYPE, queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { buyEggInput } from '@/external/api/egg/buy-egg'
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
import useGetEggDetail from '../../[id]/hooks/useGetEggDetail'

const useBuyEgg = ({
	eggId,
	onSuccess,
	onError,
}: {
	eggId: string
	onSuccess?: () => void
	onError?: () => void
}) => {
	const { onDisconnect } = useDisconnectWallet()
	const result = useBalance({})
	const balance = result.data?.formatted || 0
	const { refetch } = useGetEggDetail({ eggId })

	const {
		mutate,
		isPending: isLoadingBuyEgg,
		isSuccess,
	} = useMutation({
		mutationFn: (params: buyEggInput) => eggApi.buyEgg(params),
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'Buy Egg',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	const handleBuyEggAfterTx = useCallback(
		(hash: string) => {
			if (hash) {
				mutate({ txHash: hash, eggId })
			}
		},
		[eggId, mutate]
	)

	const {
		data: hash,
		sendTransaction,
		isPending: isPendingSendTx,
		error: sendError,
	} = useSendTransaction({ onCallback: handleBuyEggAfterTx })

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		error: confirmError,
	} = useWaitForTransactionReceipt({
		hash,
	})

	const { data: checkTxData } = useCheckTransaction({
		txHash: isSuccess && hash ? hash : '',
		type: CHECK_TX_TYPE.BUY_EGG,
	})

	const { toast } = useToast()

	const handleSend = async ({ amount }: { amount: number }) => {
		const { data: eggInfo } = await refetch()
		const newAmount = eggInfo?.price
		if (amount) {
			if (amount !== newAmount) {
				toast({
					title: 'Buy Egg',
					description: 'The price has changed. Please try again!',
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
					title: 'Buy Egg',
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
	}

	const handleSendSuccess = useCallback(() => {
		if (isConfirmed) {
			result.refetch()
			toast({
				title: 'Buy Egg',
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
				title: 'Buy Egg',
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
				title: 'Buy Egg',
				description: 'Buying...',
				duration: 5000,
			})
		} else if (isConfirming) {
			toast({
				title: 'Buy Egg',
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
			isLoadingBuyEgg ||
			isConfirming ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK
	)

	return {
		mutate: handleSend,
		isLoading:
			isPendingSendTx ||
			isLoadingBuyEgg ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK,
	}
}

export default useBuyEgg
