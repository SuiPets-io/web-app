import { axiosPrivate } from '@/http'
import { z } from 'zod'

const buyEggInputSchema = z.object({
	eggId: z.string(),
	txHash: z.string(),
})

export type buyEggInput = z.infer<typeof buyEggInputSchema>

export const buyEgg = async (input: buyEggInput) => {
	try {
		const body = buyEggInputSchema.parse(input)
		const resp = await axiosPrivate.post('/eggs/buy', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
