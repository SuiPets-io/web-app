import { globalSettingAtom } from '@/app/_store/globalSettingAtom'
import { useAtom } from 'jotai'
import moment from 'moment'
import { useCallback, useEffect, useRef } from 'react'

const MAX_LOADING_TIME = 45000

type TInterval = ReturnType<typeof setInterval>

export const useGlobalLoading = (loading?: boolean) => {
	const [globalSetting, setGlobalSetting] = useAtom(globalSettingAtom)
	const intervalId = useRef<TInterval>()

	const setLoading = useCallback(
		(isLoading: boolean) => {
			setGlobalSetting((draft) => {
				draft.loading = isLoading
			})
		},
		[setGlobalSetting]
	)

	useEffect(() => {
		if (typeof loading === 'boolean') {
			setLoading(loading)
		}

		return () => setLoading(false)
	}, [loading, setLoading])

	useEffect(() => {
		if (globalSetting.loading) {
			let start = moment.now()
			let end = start

			intervalId.current = setInterval(() => {
				if (end - start > MAX_LOADING_TIME) {
					clearInterval(intervalId.current)
					setLoading(false)
				} else {
					end = moment.now()
				}
			}, 1000)
		} else {
			clearInterval(intervalId.current)
		}

		return () => clearInterval(intervalId.current)
	}, [globalSetting.loading, setLoading])

	return {
		loading: globalSetting.loading,
		setLoading,
	}
}
