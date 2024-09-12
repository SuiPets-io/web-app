import { useToast } from '@/components/molecules'
import { globalEnv, queryClient } from '@/configs'
import { CHECK_TX_STATUS, CHECK_TX_TYPE, queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { buyPetSlotInput } from '@/external/api/pet/buy-pet-slot'
import {
	useAccount,
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

const useBuyPetSlot = ({
	position,
	onSuccess,
	onError,
}: {
	position: number
	onSuccess?: () => void
	onError?: () => void
}) => {
	const { address } = useAccount()
	const { onDisconnect } = useDisconnectWallet()
	const result = useBalance({})
	const balance = result.data?.formatted || 0

	const {
		mutate,
		isPending: isLoadingBuyPetSlot,
		isSuccess,
	} = useMutation({
		mutationFn: (params: buyPetSlotInput) => petApi.buyPetSlot(params),
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'Buy Slot',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	const handleBuySlotAfterTx = useCallback(
		(hash: string) => {
			if (hash) {
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
		onCallback: handleBuySlotAfterTx,
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
		type: CHECK_TX_TYPE.BUY_PET_SLOT,
	})

	const { toast } = useToast()

	const handleSend = async ({ amount }: { amount?: number }) => {
		if (amount) {
			if (balance < amount) {
				toast({
					title: 'Buy Slot',
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
				title: 'Buy Slot',
				description: 'Transaction confirmed.',
				variant: 'success',
				duration: 2000,
			})

			onSuccess && onSuccess()

			queryClient.invalidateQueries({
				queryKey: queryKeys.getMyPet(address),
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
				title: 'Buy Slot',
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
				title: 'Buy Slot',
				description: 'Buying...',
				duration: 5000,
			})
		} else if (isConfirming) {
			toast({
				title: 'Buy Slot',
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
			isLoadingBuyPetSlot ||
			isConfirming ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK
	)

	return {
		mutate: handleSend,
		isLoading:
			isPendingSendTx ||
			isLoadingBuyPetSlot ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK,
	}
}

export default useBuyPetSlot
