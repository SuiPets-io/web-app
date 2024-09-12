import { axiosPrivate } from '@/http'
import { z } from 'zod'

const buyPetSlotInputSchema = z.object({
	txHash: z.string(),
	position: z.number(),
})

export type buyPetSlotInput = z.infer<typeof buyPetSlotInputSchema>

export const buyPetSlot = async (input: buyPetSlotInput) => {
	try {
		const body = buyPetSlotInputSchema.parse(input)
		const res = await axiosPrivate.post('/pets/buy-pet-slot', body)
		if (res.data) {
			return true
		} else {
			throw res
		}
	} catch (error) {
		throw error
	}
}
