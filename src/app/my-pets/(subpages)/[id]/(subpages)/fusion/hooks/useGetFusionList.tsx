import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import {
	getFusionListInput,
	getFusionListOutput,
} from '@/external/api/pet/getFusionList'
import { useAccount, useCheckAuthentication, useQuery } from '@/hooks'

const useGetFusionList = ({ params }: { params: getFusionListInput }) => {
	const { address } = useAccount()
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getFusionListOutput>({
		queryKey: queryKeys.getFusionList([
			JSON.stringify(address),
			JSON.stringify(params),
		]),
		queryFn: async () => petApi.getFusionList(params),
		enabled: !!isAuthen,
	})

	return {
		...returnedQuery,
	}
}

export default useGetFusionList
