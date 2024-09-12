import { DEFAULT_PAGE_SIZE } from '@/constants'
import { getFusionListInput } from '@/external/api/pet/getFusionList'
import { atomWithImmer } from 'jotai-immer'

export const filterParamsAtom = atomWithImmer<getFusionListInput>({
	offset: 0,
	limit: DEFAULT_PAGE_SIZE,
})
