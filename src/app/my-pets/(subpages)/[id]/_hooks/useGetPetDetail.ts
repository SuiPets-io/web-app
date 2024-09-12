import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { getPetDetailOutput } from '@/external/api/pet/get-detail-pet'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useGetPetDetail = ({ petId }: { petId: string }) => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getPetDetailOutput>({
		queryKey: queryKeys.getPetDetail(petId),
		queryFn: async () => petApi.getPetDetail({ petId }),
		enabled: !!isAuthen && !!petId,
		refetchInterval: 10000,
		refetchOnWindowFocus: true,
	})

	return returnedQuery
}

export default useGetPetDetail
