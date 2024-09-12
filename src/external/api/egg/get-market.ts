import { EGG_ONSATE_STATUS, ORIGIN, PET_TYPE, RARITY } from '@/constants'
import { axiosPrivate } from '@/http'
import { removeNullishValue } from '@/utils'
import { z } from 'zod'

const getMarketInputSchema = z.object({
	origins: z.string().optional(),
	rarities: z.string().optional(),
	priceSort: z
		.number()
		.refine((value) => value === 1 || value === -1, {
			message: 'Number must be 1 or -1',
		})
		.optional(),
	timeSort: z
		.number()
		.refine((value) => value === 1 || value === -1, {
			message: 'Number must be 1 or -1',
		})
		.optional(),
	offset: z.number().optional(),
	limit: z.number().optional(),
	status: z.string().optional(),
	publicAddress: z.string().optional(),
})

const marketItemSchema = z.object({
	_id: z.string(),
	publicAddress: z.string(),
	eggId: z.string(),
	rarity: z.nativeEnum(RARITY),
	origin: z.nativeEnum(ORIGIN),
	price: z.number(),
	status: z.nativeEnum(EGG_ONSATE_STATUS),
	petType: z.nativeEnum(PET_TYPE),
})

const getMarketOutputSchema = z.object({
	total: z.number(),
	data: z.array(marketItemSchema),
})

export type MarketItemType = z.infer<typeof marketItemSchema>

export type getMarketInput = z.infer<typeof getMarketInputSchema>

export type getMarketOutput = z.infer<typeof getMarketOutputSchema>

export const getMarket = async (params: getMarketInput) => {
	try {
		const resp = await axiosPrivate.get('/eggs/market', {
			params: removeNullishValue(params),
		})
		return getMarketOutputSchema.parse(resp?.data) || { total: 0, data: [] }
	} catch (error) {
		throw error
	}
}
