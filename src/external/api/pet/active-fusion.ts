import { axiosPrivate } from '@/http'
import { z } from 'zod'

const activeFusionInputSchema = z.object({
	position: z.number(),
	txHash: z.string(),
})

export type activeFusionInput = z.infer<typeof activeFusionInputSchema>

export const activeFusion = async (input: activeFusionInput) => {
	try {
		const body = activeFusionInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/active-fusion', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
