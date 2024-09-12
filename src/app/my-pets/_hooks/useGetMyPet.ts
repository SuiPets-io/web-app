import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { getMyPetOutput } from '@/external/api/pet/get-my-pet'
import { useAccount, useCheckAuthentication, useQuery } from '@/hooks'

const useGetMyPet = () => {
	const { address } = useAccount()
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getMyPetOutput>({
		queryKey: queryKeys.getMyPet(address),
		queryFn: async () => petApi.getMyPet(),
		enabled: !!isAuthen,
	})

	return {
		...returnedQuery,
		myPet: returnedQuery.data || [],
	}
}

export default useGetMyPet
