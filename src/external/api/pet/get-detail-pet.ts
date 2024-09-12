import { ORIGIN, PET_STAGE, PET_STATUS, PET_TYPE, RARITY } from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getPetDetailInputSchema = z.object({
	petId: z.string(),
})

export const getPetDetailOutputSchema = z.object({
	publicAddress: z.string(),
	_id: z.string(),
	isFree: z.boolean().optional(),
	// name: z.string(),
	status: z.nativeEnum(PET_STATUS),
	position: z.number(),
	type: z.nativeEnum(PET_TYPE),
	stage: z.nativeEnum(PET_STAGE).optional(),
	stageIndex: z.number().optional(),
	level: z.number().optional(),
	point: z.number().optional(),
	pps: z.number().optional(),
	currentPps: z.number().optional(),
	growthTime: z.string().optional(),
	txHash: z.string().optional(),
	nextActionTime: z.string().optional(),
	prevActionTime: z.string().optional(),
	rarity: z.nativeEnum(RARITY),
	origin: z.nativeEnum(ORIGIN),
	isActiveAuto: z.boolean(),
	fusion: z
		.object({
			isActive: z.boolean(),
			amount: z.number(),
			numberEgg: z.number(),
			isGiveMode: z.boolean(),
			checkTime: z.string().optional(),
			matchingPetId: z.array(z.string()).optional(),
		})
		.optional(),
	freeItemCheckTime: z.string().optional(),
	isFreeItemTime: z.boolean().optional(),
	growthBonus: z
		.object({
			isRead: z.boolean().optional(),
			value: z.number().optional(),
		})
		.optional(),
	isOpenAuto: z.boolean().optional(),
})

export type getPetDetailInput = z.infer<typeof getPetDetailInputSchema>

export type getPetDetailOutput = z.infer<typeof getPetDetailOutputSchema>

export const getPetDetail = async (params: getPetDetailInput) => {
	try {
		const resp = await axiosPrivate.get('/pets/get-pet-detail', { params })
		return getPetDetailOutputSchema.parse(resp?.data?.data)
	} catch (error) {
		throw error
	}
}
