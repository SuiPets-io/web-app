import {
	CHECK_TX_STATUS,
	CHECK_TX_TYPE,
	EGG_STATUS,
	ORIGIN,
	PET_TYPE,
	RARITY,
} from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const checkTxInputSchema = z.object({
	txHash: z.string(),
	type: z.nativeEnum(CHECK_TX_TYPE),
})

const checkTxOutputSchema = z.object({
	status: z.nativeEnum(CHECK_TX_STATUS),
	info: z
		.object({
			publicAddress: z.string(),
			_id: z.string(),
			status: z.nativeEnum(EGG_STATUS),
			rarity: z.nativeEnum(RARITY),
			origin: z.nativeEnum(ORIGIN),
			petType: z.nativeEnum(PET_TYPE),
		})
		.optional(),
})

export type checkTxInput = z.infer<typeof checkTxInputSchema>

export type checkTxOutput = z.infer<typeof checkTxOutputSchema>

export const checkTx = async (params: checkTxInput) => {
	try {
		const resp = await axiosPrivate.get('/eggs/check-tx', { params })

		return checkTxOutputSchema.parse(resp?.data.data)
	} catch (error) {
		throw error
	}
}
