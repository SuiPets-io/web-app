import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { getEggDetailOutput } from '@/external/api/egg/getEggDetail'
import { useCheckAuthentication, useQuery } from '@/hooks'

const useGetEggDetail = ({ eggId }: { eggId: string }) => {
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getEggDetailOutput>({
		queryKey: queryKeys.getEggDetail(eggId),
		queryFn: async () => eggApi.getEggDetail({ eggId }),
		enabled: !!isAuthen,
	})

	return {
		...returnedQuery,
	}
}

export default useGetEggDetail
