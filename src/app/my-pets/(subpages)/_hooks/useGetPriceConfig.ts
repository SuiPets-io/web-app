import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { getPriceConfigOutput } from '@/external/api/pet/get-price-config'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useGetPriceConfig = () => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getPriceConfigOutput>({
		queryKey: queryKeys.getPriceConfig(),
		queryFn: async () => petApi.getPriceConfig(),
		enabled: !!isAuthen,
		refetchOnWindowFocus: true,
	})

	return returnedQuery
}

export default useGetPriceConfig
