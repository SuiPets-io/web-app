import { axiosPrivate } from '@/http'
import { z } from 'zod'

const doActivityInputSchema = z.object({
	petId: z.string(),
	name: z.string(),
})

export type doActivityInput = z.infer<typeof doActivityInputSchema>

export const doActivity = async (input: doActivityInput) => {
	try {
		const body = doActivityInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/do-activity', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
