import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { getMarketInput, getMarketOutput } from '@/external/api/egg/get-market'
import { useAccount, useCheckAuthentication, useQuery } from '@/hooks'

const useGetGlobalEggs = ({ params }: { params: getMarketInput }) => {
	const { address } = useAccount()
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getMarketOutput>({
		queryKey: queryKeys.getGlobalEggs([
			JSON.stringify(address),
			JSON.stringify(params),
		]),
		queryFn: async () => eggApi.getMarket(params),
		enabled: !!isAuthen,
	})

	return {
		...returnedQuery,
	}
}

export default useGetGlobalEggs
