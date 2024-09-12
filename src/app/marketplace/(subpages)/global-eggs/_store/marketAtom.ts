import { DEFAULT_PAGE_SIZE, EGG_ONSATE_STATUS } from '@/constants'
import { getMarketInput } from '@/external/api/egg/get-market'
import { atomWithImmer } from 'jotai-immer'

export const filterParamsAtom = atomWithImmer<getMarketInput>({
	offset: 0,
	limit: DEFAULT_PAGE_SIZE,
	status: [EGG_ONSATE_STATUS.ONSALE].join(','),
})
