import { CHAIN_CONFIGS, ECHAIN } from '@/constants'
import { useAccount, useQuery } from '@/hooks'
import { convertMISTToBalance } from '@/utils'
import { suiClient } from '@/web3'

export const useBalance = ({ type = ECHAIN.SUI }: { type?: ECHAIN }) => {
	const { address } = useAccount()

	const chain = CHAIN_CONFIGS[type]

	const initialData = {
		decimals: chain.decimals,
		formatted: 0,
		symbol: chain.symbol,
		value: BigInt(0),
	}
	const fetchBalance = async (address: `0x${string}`) => {
		try {
			const balance = await suiClient.getBalance({
				owner: address,
				coinType: chain.contract,
			})
			const value = Number.parseInt(balance.totalBalance)
			const formatted = convertMISTToBalance(value.toString(), type)

			return {
				...initialData,
				formatted,
				value,
			}
		} catch (error) {
			throw error
		}
	}

	const { data, isPending, isError, error, refetch } = useQuery({
		queryKey: ['fetchBalance', address, type],
		queryFn: async () => {
			if (address) {
				return await fetchBalance(address)
			} else {
				return initialData
			}
		},
	})

	return { data, isPending, isError, error, refetch }
}
