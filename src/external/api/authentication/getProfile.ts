import { axiosPrivate } from '@/http'
import { z } from 'zod'

const UserInfoOutputSchema = z.object({
	publicAddress: z.string(),
	chatId: z.string(),
	referralCode: z.string(),
	numberReferral: z.number(),
	teleBotName: z.string(),
	items: z.record(z.string(), z.number()),
	pps: z.number(),
})

export type UserInfoOutput = z.infer<typeof UserInfoOutputSchema>

export const getProfile = async () => {
	try {
		const response = await axiosPrivate.get('/users/info')
		if (response?.data?.data) {
			return UserInfoOutputSchema.parse(response.data.data)
		} else {
			return null
		}
	} catch (error) {
		throw error
	}
}
