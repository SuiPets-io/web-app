import { ORIGIN, PET_TYPE, RARITY } from '@/constants'
import { axiosPrivate } from '@/http'
import { removeNullishValue } from '@/utils'
import { z } from 'zod'

const getRecentSoldInputSchema = z.object({
	origins: z.string().optional(),
	rarities: z.string().optional(),
	timeSort: z
		.number()
		.refine((value) => value === 1 || value === -1, {
			message: 'Number must be 1 or -1',
		})
		.optional(),
	offset: z.number().optional(),
	limit: z.number().optional(),
	publicAddress: z.string().optional(),
})

const RecentSoldItemSchema = z.object({
	_id: z.string(),
	seller: z.string(),
	buyer: z.string(),
	eggId: z.string(),
	rarity: z.nativeEnum(RARITY),
	origin: z.nativeEnum(ORIGIN),
	price: z.number(),
	status: z.string(),
	petType: z.nativeEnum(PET_TYPE),
})

const getRecentSoldOutputSchema = z.object({
	total: z.number(),
	data: z.array(RecentSoldItemSchema),
})

export type RecentSoldItemType = z.infer<typeof RecentSoldItemSchema>

export type getRecentSoldInput = z.infer<typeof getRecentSoldInputSchema>

export type getRecentSoldOutput = z.infer<typeof getRecentSoldOutputSchema>

export const getRecentSold = async (params: getRecentSoldInput) => {
	try {
		const resp = await axiosPrivate.get('/eggs/reccent-sold', {
			params: removeNullishValue(params),
		})
		return getRecentSoldOutputSchema.parse(resp?.data) || { total: 0, data: [] }
	} catch (error) {
		throw error
	}
}
