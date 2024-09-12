import { queryKeys } from '@/constants'
import { userApi } from '@/external/api/user'
import { getUserConfigOutput } from '@/external/api/user/getUserConfig'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useGetUserConfig = () => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getUserConfigOutput>({
		queryKey: queryKeys.getUserConfig(),
		queryFn: async () => userApi.getUserConfig(),
		enabled: !!isAuthen,
	})

	return returnedQuery
}

export default useGetUserConfig
