import { PET_TYPE } from '@/constants'
import { axiosPrivate } from '@/http'
import { removeNullishValue } from '@/utils'
import { z } from 'zod'
import { getPetDetailOutputSchema } from './get-detail-pet'

const getFusionListInputSchema = z.object({
	origins: z.string().optional(),
	rarities: z.string().optional(),
	priceSort: z
		.number()
		.refine((value) => value === 1 || value === -1, {
			message: 'Number must be 1 or -1',
		})
		.optional(),
	offset: z.number().optional(),
	limit: z.number().optional(),
	status: z.string().optional(),
	petType: z.nativeEnum(PET_TYPE).optional(),
})

const getFusionListOutputSchema = z.object({
	total: z.number(),
	data: z.array(getPetDetailOutputSchema),
})

export type getFusionListInput = z.infer<typeof getFusionListInputSchema>

export type getFusionListOutput = z.infer<typeof getFusionListOutputSchema>

export const getFusionList = async (params: getFusionListInput) => {
	try {
		const resp = await axiosPrivate.get('pets/fusion/list', {
			params: removeNullishValue(params),
		})
		return getFusionListOutputSchema.parse(resp?.data) || { total: 0, data: [] }
	} catch (error) {
		throw error
	}
}
