import { axiosPrivate } from '@/http'
import { z } from 'zod'

const cancelFusionInputSchema = z.object({
	position: z.number(),
})

export type cancelFusionInput = z.infer<typeof cancelFusionInputSchema>

export const cancelFusion = async (input: cancelFusionInput) => {
	try {
		const body = cancelFusionInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/cancel-give-mode', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
