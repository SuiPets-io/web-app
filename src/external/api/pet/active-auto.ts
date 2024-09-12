import { axiosPrivate } from '@/http'
import { z } from 'zod'

const activeAutoInputSchema = z.object({
	position: z.number(),
	txHash: z.string(),
})

export type activeAutoInput = z.infer<typeof activeAutoInputSchema>

export const activeAuto = async (input: activeAutoInput) => {
	try {
		const body = activeAutoInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/active-auto', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
