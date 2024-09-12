import { TPet } from '@/types'

export enum ELIFESTATUS {
	NOT_HATCHED = 'not-hatched',
	HATCHED = 'hatched',
	DIED = 'die',
}

export type GeneralPetInfoType = {
	petId: string
	petName: string
	petType: TPet
	lifeStatus: ELIFESTATUS
	level: number
	currentExp: number
	totalExp: number
}
