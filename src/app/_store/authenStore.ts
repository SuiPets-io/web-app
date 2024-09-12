import { storageKeys } from '@/constants'
import { useCloudStorage } from '@/hooks'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, useEffect } from 'react'

export const accessTokenStore = atomWithStorage<string | null>(
	storageKeys.ACCESS_TOKEN,
	null
)

export const useTelegramAccessToken = () => {
	const [accessToken, setAccessToken] = useAtom(accessTokenStore)
	const { setItem, getItem, removeItem } = useCloudStorage()

	const setAccessTokenCloud = useCallback(
		async (token: string) => {
			setAccessToken(token)
			return await setItem(storageKeys.ACCESS_TOKEN, token)
		},
		[setItem, setAccessToken]
	)

	const removeAccessTokenCloud = useCallback(async () => {
		setAccessToken('')
		return await removeItem(storageKeys.ACCESS_TOKEN)
	}, [removeItem, setAccessToken])

	const getAccessTokenCloud = useCallback(async () => {
		const token = await getItem(storageKeys.ACCESS_TOKEN)
		setAccessToken(token)
		return token
	}, [getItem, setAccessToken])

	useEffect(() => {
		getAccessTokenCloud()
	}, [getAccessTokenCloud])

	return {
		accessToken,
		getAccessTokenCloud,
		setAccessTokenCloud,
		removeAccessTokenCloud,
	}
}
