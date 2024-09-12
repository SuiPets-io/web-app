'use client'
import { accessTokenStore } from '@/app/_store/authenStore'
import { profileAtom, TProfile } from '@/app/_store/profileStore'
import { queryKeys } from '@/constants'
import { authenApi } from '@/external/api/authentication'
import {
	useAccount,
	useCheckAuthentication,
	useDisconnectWallet,
	useQuery,
} from '@/hooks'
import { useAtomValue, useSetAtom } from 'jotai'

export const useProfile = () => {
	const { address } = useAccount()
	const { onDisconnect } = useDisconnectWallet()
	const isAuthen = useCheckAuthentication()
	const setProfile = useSetAtom(profileAtom)
	const accessToken = useAtomValue(accessTokenStore)

	const returnedQuery = useQuery<TProfile>({
		queryKey: queryKeys.getProfile(address),
		queryFn: () => authenApi.getProfile(),
		retry: false,
		enabled: !!isAuthen && !!accessToken,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	})

	if (returnedQuery.isSuccess) {
		setProfile(returnedQuery.data)
	}

	if (returnedQuery.isError) {
		onDisconnect()
		setProfile(null)
	}

	return returnedQuery
}
