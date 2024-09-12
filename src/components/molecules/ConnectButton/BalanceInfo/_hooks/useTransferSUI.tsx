import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import {
	useAccount,
	useBalance,
	useSendTransaction,
	useWaitForTransactionReceipt,
} from '@/hooks'
import { createCoin } from '@/utils'
import { useCallback, useEffect } from 'react'
import { TSendToken } from '../SendSUIModal/sendSchema'

const useTransferSUI = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void
	onError?: () => void
}) => {
	const { address } = useAccount()
	const result = useBalance({})
	const balance = result.data?.formatted || 0

	const {
		data: hash,
		sendTransaction,
		isPending: isPendingSendTx,
		error: sendError,
	} = useSendTransaction({})

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		error: confirmError,
	} = useWaitForTransactionReceipt({
		hash,
	})

	const { toast } = useToast()

	const handleSend = async ({ to, amount }: TSendToken) => {
		if (balance < amount) {
			toast({
				title: 'Buy Egg',
				description: 'Sorry, you do not have enough SUI to buy',
				variant: 'error',
			})
		} else {
			sendTransaction({
				to: to as `0x${string}`,
				value: [createCoin(amount)],
			})
		}
	}

	const handleSendSuccess = useCallback(() => {
		result.refetch()

		queryClient.invalidateQueries({
			queryKey: queryKeys.getProfile(address),
			refetchType: 'active',
		})

		toast({
			title: 'Send token',
			description: 'Transaction confirmed.',
			variant: 'success',
		})
		onSuccess && onSuccess()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSendError = useCallback(() => {
		if (sendError || confirmError) {
			const errorMsg =
				(sendError as any)?.details ||
				JSON.stringify(sendError) ||
				JSON.stringify(confirmError)
			toast({
				title: 'Send token',
				description: errorMsg,
				variant: 'error',
			})
			onError && onError()
		}
	}, [sendError, confirmError, toast])

	useEffect(() => {
		if (isPendingSendTx) {
			toast({
				title: 'Send token',
				description: 'Sending...',
				duration: 10000,
			})
		} else if (isConfirming) {
			toast({
				title: 'Send token',
				description: 'Waiting for confirmation...',
				duration: 10000,
			})
		} else if (isConfirmed) {
			handleSendSuccess()
		}
	}, [isPendingSendTx, isConfirming, isConfirmed, handleSendSuccess, toast])

	useEffect(() => {
		handleSendError()
	}, [handleSendError])

	return { mutate: handleSend, isLoading: isPendingSendTx || isConfirming }
}

export default useTransferSUI
