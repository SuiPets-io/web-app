import {
	CHECK_TX_STATUS,
	ORIGIN,
	PET_STAGE,
	PET_STATUS,
	PET_TYPE,
	RARITY,
} from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getFusionDetailInputSchema = z.object({
	petId: z.string(),
})

const fusionHistoryItemSchema = z.object({
	_id: z.string(),
	publicAddress: z.string(),
	givePublicAddress: z.string(),
	receivePetId: z.string(),
	receivePetRarity: z.nativeEnum(RARITY),
	givePetId: z.string(),
	givePetRarity: z.nativeEnum(RARITY),
	amount: z.number(),
	status: z.nativeEnum(CHECK_TX_STATUS),
	txHash: z.string(),
	receivePublicAddress: z.string(),
	createdAt: z.string(),
})

export type FusionHistoryItemType = z.infer<typeof fusionHistoryItemSchema>

const getFusionDetailOutputSchema = z.object({
	publicAddress: z.string(),
	_id: z.string(),
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
	fusionHistory: z.array(fusionHistoryItemSchema),
})

export type getFusionDetailInput = z.infer<typeof getFusionDetailInputSchema>

export type getFusionDetailOutput = z.infer<typeof getFusionDetailOutputSchema>

export const getFusionDetail = async (params: getFusionDetailInput) => {
	try {
		const resp = await axiosPrivate.get('/pets/fusion/detail', { params })
		return getFusionDetailOutputSchema.parse(resp?.data?.data)
	} catch (error) {
		throw error
	}
}
