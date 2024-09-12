import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { getMyEggInput, getMyEggOutput } from '@/external/api/egg/get-my-egg'
import { useAccount, useCheckAuthentication, useQuery } from '@/hooks'

const useGetMyEgg = ({ params }: { params: getMyEggInput }) => {
	const { address } = useAccount()
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getMyEggOutput>({
		queryKey: queryKeys.getMyEgg([
			JSON.stringify(address),
			JSON.stringify(params),
		]),
		queryFn: async () => eggApi.getMyEgg(params),
		enabled: !!isAuthen,
	})

	return {
		...returnedQuery,
	}
}

export default useGetMyEgg
