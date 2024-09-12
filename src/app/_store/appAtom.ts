import { atomWithStorage } from 'jotai/utils'

export const reloadAtom = atomWithStorage<boolean | null>('reload', null)
