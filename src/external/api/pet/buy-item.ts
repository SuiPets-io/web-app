import { axiosPrivate } from '@/http'
import { z } from 'zod'

const buyItemInputSchema = z.object({
	petId: z.string(),
	txHash: z.string(),
	name: z.string(),
	itemNumber: z.number(),
})

export type buyItemInput = z.infer<typeof buyItemInputSchema>

export const buyItem = async (input: buyItemInput) => {
	try {
		const body = buyItemInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/buy-item', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
