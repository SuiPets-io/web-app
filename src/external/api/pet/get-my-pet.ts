import { ORIGIN, PET_STAGE, PET_STATUS, PET_TYPE, RARITY } from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const petSchema = z.object({
	_id: z.string(),
	publicAddress: z.string(),
	isFree: z.boolean().optional(),
	name: z.string().optional(),
	status: z.nativeEnum(PET_STATUS),
	position: z.number(),
	type: z.nativeEnum(PET_TYPE).optional(),
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
	rarity: z.nativeEnum(RARITY).optional(),
	origin: z.nativeEnum(ORIGIN).optional(),
	isActiveAuto: z.boolean().optional(),
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
})

const getMyPetOutputSchema = z.array(petSchema)

export type PetType = z.infer<typeof petSchema>

export type getMyPetOutput = z.infer<typeof getMyPetOutputSchema>

export const getMyPet = async () => {
	try {
		const resp = await axiosPrivate.get('/pets/get-my-pet')
		return getMyPetOutputSchema.parse(resp?.data?.data) || []
	} catch (error) {
		throw error
	}
}
