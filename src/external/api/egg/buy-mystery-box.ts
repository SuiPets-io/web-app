import { axiosPrivate } from '@/http'
import { z } from 'zod'

const buyMysteryBoxInputSchema = z.object({
	txHash: z.string(),
})

export type buyMysteryBoxInput = z.infer<typeof buyMysteryBoxInputSchema>

export const buyMysteryBox = async (input: buyMysteryBoxInput) => {
	try {
		const body = buyMysteryBoxInputSchema.parse(input)
		const res = await axiosPrivate.post('/eggs/buy-offering', body)
		return res.data
	} catch (error) {
		throw error
	}
}
