import { axiosPrivate } from '@/http'
import { z } from 'zod'

const listingInputSchema = z.object({
	eggId: z.string(),
	price: z.number(),
})

export type listingInput = z.infer<typeof listingInputSchema>

export const listing = async (input: listingInput) => {
	try {
		const body = listingInputSchema.parse(input)
		const res = await axiosPrivate.post('/eggs/listing', body)
		return res
	} catch (error) {
		throw error
	}
}
