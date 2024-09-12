import { storageKeys } from '@/constants'
import { atomWithStorage } from 'jotai/utils'

export const positionAtom = atomWithStorage<number | null>(
	storageKeys.PET_POSITION,
	null
)
