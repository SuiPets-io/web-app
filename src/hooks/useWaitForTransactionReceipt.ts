import { useQuery } from '@/hooks'
import { suiClient } from '@/web3'

export const useWaitForTransactionReceipt = ({
	hash,
}: {
	hash: string | undefined
}) => {
	const fetchTransactionReceipt = async (digest: string) => {
		let receipt = null
		while (!receipt) {
			receipt = await suiClient.waitForTransaction({
				digest,
				options: {
					showEffects: true,
				},
			})
			if (!receipt) {
				await new Promise((resolve) => setTimeout(resolve, 1000))
			}
		}
		if (!receipt.effects?.status) {
			throw new Error('Transaction failed')
		}
		return receipt
	}

	const { data, isLoading, isSuccess, error, refetch } = useQuery({
		queryKey: ['fetchTransactionReceipt', hash],
		queryFn: async () => {
			if (hash) {
				return fetchTransactionReceipt(hash)
			} else {
				return null
			}
		},
		enabled: !!hash,
	})

	return { data, isLoading, isSuccess, error, refetch }
}
