'use client'
import { accessTokenStore } from '@/app/_store/authenStore'
import { CHECK_TX_STATUS, queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { checkTxInput, checkTxOutput } from '@/external/api/egg/checkTx'
import { useCheckAuthentication, useQuery } from '@/hooks'
import { useAtomValue } from 'jotai'

export const useCheckTransaction = (params: checkTxInput) => {
	const isAuthen = useCheckAuthentication()
	const accessToken = useAtomValue(accessTokenStore)

	const returnedQuery = useQuery<checkTxOutput>({
		queryKey: queryKeys.checkTx(JSON.stringify(params)),
		queryFn: async () => await eggApi.checkTx(params),
		retry: false,
		enabled: !!isAuthen && !!accessToken && !!params.txHash,
		refetchOnWindowFocus: true,
		refetchInterval: (data) => {
			if (
				data.state.data &&
				data.state.data.status === CHECK_TX_STATUS.WAITING_TO_CHECK
			) {
				return 3000
			}

			return false
		},
	})

	return returnedQuery
}
