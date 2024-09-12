import { EGG_STATUS, ORIGIN, PET_TYPE, RARITY } from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getMyEggInputSchema = z.object({
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
	status: z.string().optional(),
})

export const EggSchema = z.object({
	publicAddress: z.string(),
	_id: z.string(),
	status: z.nativeEnum(EGG_STATUS),
	rarity: z.nativeEnum(RARITY),
	origin: z.nativeEnum(ORIGIN),
	petType: z.nativeEnum(PET_TYPE),
	isFree: z.boolean().optional(),
	price: z.number().optional(),
})

const getMyEggOutputSchema = z.object({
	total: z.number(),
	data: z.array(EggSchema),
})

export type EggType = z.infer<typeof EggSchema>

export type getMyEggInput = z.infer<typeof getMyEggInputSchema>

export type getMyEggOutput = z.infer<typeof getMyEggOutputSchema>

export const getMyEgg = async (params: getMyEggInput) => {
	try {
		const resp = await axiosPrivate.get('/eggs/my-egg', { params })
		return getMyEggOutputSchema.parse(resp?.data) || { total: 0, data: [] }
	} catch (error) {
		throw error
	}
}
