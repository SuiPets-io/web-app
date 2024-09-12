import { axiosPrivate } from '@/http'
import { z } from 'zod'

const harvestInputSchema = z.object({
	petId: z.string(),
	pps: z.number().gt(0),
})

const harvestOutputSchema = z.object({
	pps: z.number(),
})

export type harvestInput = z.infer<typeof harvestInputSchema>
export type harvestOutput = z.infer<typeof harvestOutputSchema>

export const harvest = async (input: harvestInput) => {
	try {
		const body = harvestInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/harvest', body)
		return harvestOutputSchema.parse(resp?.data?.data)
	} catch (error) {
		throw error
	}
}
