import { DEFAULT_PAGE_SIZE } from '@/constants'
import { getMarketInput } from '@/external/api/egg/get-market'
import { atomWithImmer } from 'jotai-immer'

export const filterParamsAtom = atomWithImmer<getMarketInput>({
	offset: 0,
	limit: DEFAULT_PAGE_SIZE,
})
