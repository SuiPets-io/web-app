import { axiosPrivate } from '@/http'
import { z } from 'zod'

const fusionInputSchema = z.object({
	publicAddress: z.string(),
	receivePetId: z.string(),
	givePetId: z.string(),
	txHash: z.string(),
})

export type fusionInput = z.infer<typeof fusionInputSchema>

export const fusion = async (input: fusionInput) => {
	try {
		const body = fusionInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/fusion', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
