import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { getPetConfigOutput } from '@/external/api/pet/get-pet-config'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useGetPetConfig = () => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getPetConfigOutput>({
		queryKey: queryKeys.getPetConfig(),
		queryFn: async () => petApi.getPetConfig(),
		enabled: !!isAuthen,
	})

	return returnedQuery
}

export default useGetPetConfig
