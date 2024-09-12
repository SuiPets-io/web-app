import { petApi } from '@/external/api/pet'
import { getLeaderboardOutput } from '@/external/api/pet/get-leaderboard'
import { useAccount, useCheckAuthentication, useQuery } from '@/hooks'

const useGetLeaderboard = () => {
	const { address } = useAccount()
	const isAuthen = useCheckAuthentication()

	const returnedQuery = useQuery<getLeaderboardOutput>({
		queryKey: ['getLeaderboard', address],
		queryFn: async () => petApi.getLeaderBoard(),
		enabled: !!isAuthen,
	})

	return returnedQuery
}

export default useGetLeaderboard
