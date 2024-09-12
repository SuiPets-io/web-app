import { axiosPrivate } from '@/http'
import { z } from 'zod'

const putEggInputSchema = z.object({
	eggId: z.string(),
	position: z.number(),
	name: z.string().optional(),
})

export type putEggInput = z.infer<typeof putEggInputSchema>

export const putEgg = async (input: putEggInput) => {
	try {
		const body = putEggInputSchema.parse(input)
		const res = await axiosPrivate.post('/pets/put-egg', body)
		if (res.data) {
			return res.data
		} else {
			throw res
		}
	} catch (error) {
		throw error
	}
}
