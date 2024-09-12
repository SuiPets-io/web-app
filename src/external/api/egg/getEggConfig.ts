import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getEggConfigOutputSchema = z.object({
	buyFeeRate: z.number(),
	buyOfferingPrice: z.number(),
})

export type getEggConfigOutput = z.infer<typeof getEggConfigOutputSchema>

export const getEggConfig = async () => {
	try {
		const resp = await axiosPrivate.get('/eggs/config')
		return getEggConfigOutputSchema.parse(resp?.data?.data)
	} catch (error) {
		throw error
	}
}
