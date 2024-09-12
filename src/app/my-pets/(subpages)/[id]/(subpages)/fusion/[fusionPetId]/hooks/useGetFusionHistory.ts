import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { getFusionDetailOutput } from '@/external/api/pet/getFusionDetail'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useGetFusionHistory = ({ petId }: { petId: string }) => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getFusionDetailOutput>({
		queryKey: queryKeys.getFusionDetail(petId),
		queryFn: async () => await petApi.getFusionDetail({ petId }),
		enabled: !!isAuthen,
	})

	return {
		...returnedQuery,
	}
}

export default useGetFusionHistory
