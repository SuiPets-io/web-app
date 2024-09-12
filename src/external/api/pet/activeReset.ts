import { axiosPrivate } from '@/http'
import { z } from 'zod'

const activeResetInputSchema = z.object({
	position: z.number(),
	txHash: z.string(),
})

export type activeResetInput = z.infer<typeof activeResetInputSchema>

export const activeReset = async (input: activeResetInput) => {
	try {
		const body = activeResetInputSchema.parse(input)
		const resp = await axiosPrivate.post('pets/reset-pet', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
