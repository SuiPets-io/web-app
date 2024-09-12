import { useGetDecryptedPrivateKey } from '@/app/_store/telegramStore'
import { getKeypairFromPrivateKey } from '@/utils'
import { suiClient } from '@/web3'
import {
	Transaction,
	TransactionObjectArgument,
} from '@mysten/sui/transactions'
import { useMutation } from '@tanstack/react-query'

interface ReturnWeb3SendTransaction {
	data?: string
	sendTransaction: (params: SendTransactionParamType) => void
	isPending: boolean
	error: Error | null
	isSuccess: boolean
	isError: boolean
}

type SendTransactionParamType = {
	to: `0x${string}`
	value: (TransactionObjectArgument | string)[]
}

export const useSendTransaction: ({
	onCallback,
}: {
	onCallback?: (hash: string) => void
}) => ReturnWeb3SendTransaction = ({
	onCallback,
}: {
	onCallback?: (hash: string) => void
}) => {
	const decryptedPrivateKey = useGetDecryptedPrivateKey()
	const keypair =
		decryptedPrivateKey && getKeypairFromPrivateKey(decryptedPrivateKey)
	const tx = new Transaction()

	const { data, mutate, isPending, isSuccess, isError, error } = useMutation({
		mutationFn: async ({ to, value }: SendTransactionParamType) => {
			try {
				if (keypair) {
					tx.setSender(keypair.toSuiAddress())

					tx.transferObjects(value, to)
					const result = await suiClient.signAndExecuteTransaction({
						signer: keypair,
						transaction: tx,
					})
					await suiClient.waitForTransaction({ digest: result.digest })

					onCallback && onCallback(result.digest)

					return result
				}

				return null
			} catch (error) {
				throw error
			}
		},
	})

	return {
		data: data?.digest,
		sendTransaction: mutate,
		error,
		isPending,
		isSuccess,
		isError,
	}
}
