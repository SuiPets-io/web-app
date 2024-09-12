import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { getEggConfigOutput } from '@/external/api/egg/getEggConfig'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useGetEggConfig = () => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getEggConfigOutput>({
		queryKey: queryKeys.getEggConfig(),
		queryFn: async () => eggApi.getEggConfig(),
		enabled: !!isAuthen,
	})

	return returnedQuery
}

export default useGetEggConfig
