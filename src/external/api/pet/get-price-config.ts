import { PET_ITEM_TYPE } from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getPriceConfigOutputSchema = z.object({
	// eggPrice: z.number(),
	foodConfig: z.array(
		z.object({
			name: z.string(),
			type: z.nativeEnum(PET_ITEM_TYPE),
			price: z.number(),
			image: z.string(),
		})
	),
	toiletConfig: z.array(
		z.object({
			name: z.string(),
			type: z.nativeEnum(PET_ITEM_TYPE),
			price: z.number(),
			image: z.string(),
		})
	),
	entertainmentConfig: z.array(
		z.object({
			name: z.string(),
			type: z.nativeEnum(PET_ITEM_TYPE),
			price: z.number(),
			image: z.string(),
		})
	),
})

export type getPriceConfigOutput = z.infer<typeof getPriceConfigOutputSchema>

export const getPriceConfig = async () => {
	try {
		const resp = await axiosPrivate.get('/pets/price-config')
		return getPriceConfigOutputSchema.parse(resp?.data?.data)
	} catch (error) {
		throw error
	}
}
