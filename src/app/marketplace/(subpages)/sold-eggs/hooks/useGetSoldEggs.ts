import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import {
	getRecentSoldInput,
	getRecentSoldOutput,
} from '@/external/api/egg/get-recent-sold'
import { useAccount, useCheckAuthentication, useQuery } from '@/hooks'

const useGetSoldEggs = ({ params }: { params: getRecentSoldInput }) => {
	const { address } = useAccount()
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getRecentSoldOutput>({
		queryKey: queryKeys.getSoldEggs([
			JSON.stringify(address),
			JSON.stringify(params),
		]),
		queryFn: async () => eggApi.getRecentSold(params),
		enabled: !!isAuthen,
	})

	return {
		...returnedQuery,
	}
}

export default useGetSoldEggs
