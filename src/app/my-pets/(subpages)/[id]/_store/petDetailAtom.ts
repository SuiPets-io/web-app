import { getPetDetailOutput } from '@/external/api/pet/get-detail-pet'
import { atom } from 'jotai'

export type TPetState =
	| 'normal'
	| 'hungry'
	| 'eat'
	| 'dirty'
	| 'toilet'
	| 'sick'
	| 'sad'
	| 'funny'

export const petDetailAtom = atom<getPetDetailOutput | null>(null)

export const petStageAtom = atom<TPetState>('normal')

export const isBuyingItemAtom = atom<boolean>(false)
