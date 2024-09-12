import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getUserConfigOutputSchema = z.object({
	REFERRAL_MESSAGE: z.string(),
	CLAIM_PPS_FEE: z.number(),
	IS_OPEN_CLAIM_PPS: z.boolean(),
})

export type getUserConfigOutput = z.infer<typeof getUserConfigOutputSchema>

export const getUserConfig = async () => {
	try {
		const resp = await axiosPrivate.get('/users/config')
		return getUserConfigOutputSchema.parse(resp.data.data)
	} catch (error) {
		throw error
	}
}
