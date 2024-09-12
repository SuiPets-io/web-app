import { axiosPrivate } from '@/http'
import { z } from 'zod'

const claimPPSInputSchema = z.object({
	pps: z.number(),
	txHash: z.string(),
})

export type claimPPSInput = z.infer<typeof claimPPSInputSchema>

export const claimPPS = async (input: claimPPSInput) => {
	try {
		const body = claimPPSInputSchema.parse(input)
		const resp = await axiosPrivate.post('/users/claim-pps', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
