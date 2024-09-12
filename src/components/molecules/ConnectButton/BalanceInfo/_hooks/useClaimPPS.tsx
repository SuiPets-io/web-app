import { useToast } from '@/components/molecules'
import { globalEnv, queryClient } from '@/configs'
import { CHECK_TX_STATUS, CHECK_TX_TYPE, queryKeys } from '@/constants'
import { userApi } from '@/external/api/user'
import { claimPPSInput } from '@/external/api/user/claimPPS'
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
import { useCallback, useEffect, useState } from 'react'

const useClaimPPS = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void
	onError?: () => void
}) => {
	const { onDisconnect } = useDisconnectWallet()
	const result = useBalance({})
	const balance = result.data?.formatted || 0
	const [pps, setPPS] = useState(0)

	const {
		mutate,
		isPending: isLoadingClaimPPS,
		isSuccess,
	} = useMutation({
		mutationFn: (params: claimPPSInput) => userApi.claimPPS(params),
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'Claim PPS',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	const handleClaimPPSAfterTx = useCallback(
		(hash: string) => {
			if (hash) {
				mutate({ txHash: hash, pps })
			}
		},
		[mutate, pps]
	)

	const {
		data: hash,
		sendTransaction,
		isPending: isPendingSendTx,
		error: sendError,
	} = useSendTransaction({ onCallback: handleClaimPPSAfterTx })

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		error: confirmError,
	} = useWaitForTransactionReceipt({
		hash,
	})

	const { data: checkTxData } = useCheckTransaction({
		txHash: isSuccess && hash ? hash : '',
		type: CHECK_TX_TYPE.CLAIM_PPS,
	})

	const { toast } = useToast()

	const handleSend = async ({
		ppsAmount,
		SUIfee,
	}: {
		ppsAmount: number
		SUIfee: number
	}) => {
		if (balance < SUIfee) {
			toast({
				title: 'Claim PPS',
				description: 'Sorry, you do not have enough SUI to open',
				variant: 'error',
			})
		} else {
			setPPS(ppsAmount)
			sendTransaction({
				to: globalEnv.adminWalletAddress as any,
				value: [createCoin(SUIfee)],
			})
		}
	}

	const handleSendSuccess = useCallback(() => {
		if (isConfirmed) {
			result.refetch()

			toast({
				title: 'Claim PPS',
				description: 'Transaction confirmed.',
				variant: 'success',
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
				title: 'Claim PPS',
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
				title: 'Claim PPS',
				description: 'Claiming...',
				duration: 5000,
			})
		} else if (isConfirming) {
			toast({
				title: 'Claim PPS',
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
			isLoadingClaimPPS ||
			isConfirming ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK
	)

	return {
		mutate: handleSend,
		isLoading:
			isPendingSendTx ||
			isLoadingClaimPPS ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK,
	}
}

export default useClaimPPS
