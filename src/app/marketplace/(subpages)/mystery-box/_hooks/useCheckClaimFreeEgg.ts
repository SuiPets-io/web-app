import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { checkClaimFreeEggOutput } from '@/external/api/egg/checkClaimFreeEgg'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useCheckClaimFreeEgg = () => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<checkClaimFreeEggOutput>({
		queryKey: queryKeys.checkClaimFreeEgg(),
		queryFn: async () => await eggApi.checkClaimFreeEgg(),
		enabled: !!isAuthen,
	})

	return returnedQuery
}

export default useCheckClaimFreeEgg
