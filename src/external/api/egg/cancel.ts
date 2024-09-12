import { axiosPrivate } from '@/http'
import { z } from 'zod'

const cancelInputSchema = z.object({
	eggId: z.string(),
})

export type cancelInput = z.infer<typeof cancelInputSchema>

export const cancel = async (input: cancelInput) => {
	try {
		const body = cancelInputSchema.parse(input)
		const resp = await axiosPrivate.post('/eggs/cancel', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
