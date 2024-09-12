import { axiosPrivate } from '@/http'
import { z } from 'zod'

const checkClaimFreeEggOutputSchema = z.object({
	data: z.boolean(),
})

export type checkClaimFreeEggOutput = z.infer<
	typeof checkClaimFreeEggOutputSchema
>['data']

export const checkClaimFreeEgg = async () => {
	try {
		const resp = await axiosPrivate.get('/eggs/check-claim-free-egg')
		return checkClaimFreeEggOutputSchema.parse(resp?.data).data
	} catch (error) {
		throw error
	}
}
