import { axiosPrivate } from '@/http'
import { z } from 'zod'

const registerFusionInputSchema = z.object({
	position: z.number(),
	amount: z.number(),
})

export type registerFusionInput = z.infer<typeof registerFusionInputSchema>

export const registerFusion = async (input: registerFusionInput) => {
	try {
		const body = registerFusionInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/open-give-mode', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
