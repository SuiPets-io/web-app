import {
	CHECK_TX_STATUS,
	EGG_STATUS,
	ORIGIN,
	PET_TYPE,
	RARITY,
} from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getEggDetailInputSchema = z.object({
	eggId: z.string(),
})

const SaleHistoryItem = z.object({
	_id: z.string(),
	seller: z.string(),
	buyer: z.string(),
	eggId: z.string(),
	origin: z.nativeEnum(ORIGIN),
	rarity: z.nativeEnum(RARITY),
	price: z.number(),
	status: z.nativeEnum(CHECK_TX_STATUS),
	petType: z.nativeEnum(PET_TYPE),
	txHash: z.string(),
	txSend: z.string(),
	createdAt: z.string(),
})

export type SaleHistoryItemType = z.infer<typeof SaleHistoryItem>

export const EggDetailSchema = z.object({
	publicAddress: z.string(),
	_id: z.string(),
	status: z.nativeEnum(EGG_STATUS),
	rarity: z.nativeEnum(RARITY),
	origin: z.nativeEnum(ORIGIN),
	petType: z.nativeEnum(PET_TYPE),
	price: z.number().optional(),
	isFree: z.boolean().optional(),
	saleHistory: z.array(SaleHistoryItem),
})

export type EggType = z.infer<typeof EggDetailSchema>

export type getEggDetailInput = z.infer<typeof getEggDetailInputSchema>

export type getEggDetailOutput = z.infer<typeof EggDetailSchema>

export const getEggDetail = async (params: getEggDetailInput) => {
	try {
		const resp = await axiosPrivate.get('/eggs/detail', { params })
		return EggDetailSchema.parse(resp?.data.data)
	} catch (error) {
		throw error
	}
}
