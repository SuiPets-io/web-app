import { axiosPrivate } from '@/http'
import { z } from 'zod'

const claimFreeItemsInputSchema = z.object({
	petId: z.string(),
})

export type claimFreeItemsInput = z.infer<typeof claimFreeItemsInputSchema>

export const claimFreeItems = async (input: claimFreeItemsInput) => {
	try {
		const body = claimFreeItemsInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/claim-free-item', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
