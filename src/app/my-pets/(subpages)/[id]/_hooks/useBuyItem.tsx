import { useToast } from '@/components/molecules'
import { globalEnv, queryClient } from '@/configs'
import { CHECK_TX_STATUS, CHECK_TX_TYPE, ECHAIN, queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { buyItemInput } from '@/external/api/pet/buy-item'
import {
	useAccount,
	useBalance,
	useCheckTransaction,
	useDisconnectWallet,
	useSendTransaction,
	useWaitForTransactionReceipt,
} from '@/hooks'
import { createCoin } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { isBuyingItemAtom } from '../_store/petDetailAtom'

const useBuyItem = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void
	onError?: () => void
}) => {
	const [petId, setPetId] = useState<string>('')
	const [itemName, setName] = useState<string>('')
	const [itemNumber, setItemNumber] = useState<number | null>(null)
	const { onDisconnect } = useDisconnectWallet()
	const { address } = useAccount()
	const result = useBalance({ type: ECHAIN.SUI })
	const setIsBuyingItem = useSetAtom(isBuyingItemAtom)

	const {
		mutate,
		isPending: isLoadingBuyItem,
		isSuccess,
	} = useMutation({
		mutationFn: (params: buyItemInput) => petApi.buyItem(params),
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

	const handleBuyItemAfterTx = useCallback(
		(hash: string) => {
			if (hash && itemNumber && itemName && petId) {
				mutate({ txHash: hash, itemNumber, name: itemName, petId })
				setItemNumber(null)
			}
		},
		[itemName, itemNumber, mutate, petId]
	)

	const {
		data: hash,
		sendTransaction,
		isPending: isPendingSendTx,
		error: sendError,
	} = useSendTransaction({
		onCallback: handleBuyItemAfterTx,
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
		type: CHECK_TX_TYPE.BUY_ITEM,
	})

	const { toast } = useToast()

	const handleSend = async (params: {
		amount: number
		itemNumber: number
		itemName: string
		petId: string
	}) => {
		const { amount, itemName, itemNumber, petId } = params
		if (result.data && result.data.formatted < amount) {
			toast({
				title: 'Buy Item',
				description: 'Sorry, you do not have enough SUI to pay gas fees',
				variant: 'error',
			})
			return
		}
		{
			setName(itemName)
			setItemNumber(itemNumber)
			setPetId(petId)
			sendTransaction({
				to: globalEnv.adminWalletAddress as any,
				value: [createCoin(amount, ECHAIN.SUI)],
			})
		}
	}

	const handleSendSuccess = useCallback(() => {
		if (isConfirmed) {
			result.refetch()
			queryClient.invalidateQueries({
				queryKey: queryKeys.getProfile(address),
				refetchType: 'active',
			})
			toast({
				title: 'Buy Item',
				description: 'Transaction confirmed.',
				variant: 'success',
				duration: 2000,
			})
			onSuccess && onSuccess()
		}
	}, [isConfirmed])

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

	useEffect(() => {
		setIsBuyingItem(
			isPendingSendTx ||
				isLoadingBuyItem ||
				isConfirming ||
				checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK
		)
	}, [
		isPendingSendTx,
		isLoadingBuyItem,
		setIsBuyingItem,
		isConfirming,
		checkTxData?.status,
	])

	return {
		mutate: handleSend,
		isLoading:
			isPendingSendTx ||
			isLoadingBuyItem ||
			isConfirming ||
			checkTxData?.status === CHECK_TX_STATUS.WAITING_TO_CHECK,
	}
}

export default useBuyItem
