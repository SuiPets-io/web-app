import { axiosPrivate } from '@/http'
import { z } from 'zod'

const loginTeleInputSchema = z.object({
	chatId: z.string(),
	firstname: z.string().optional(),
	lastname: z.string().optional(),
	username: z.string(),
	hash: z.string(),
	publicAddress: z.string(),
})

const loginTeleOutputSchema = z.object({
	token: z.string().nullable(),
})

export type loginTeleInput = z.infer<typeof loginTeleInputSchema>

export type loginTeleOutput = z.infer<typeof loginTeleOutputSchema>

export const loginTelegram = async (input: loginTeleInput) => {
	try {
		const body = loginTeleInputSchema.parse(input)
		const resp = await axiosPrivate.post('/users/login-tele', body)
		if (resp?.data?.data) {
			return loginTeleOutputSchema.parse(resp.data.data)
		} else {
			throw resp
		}
	} catch (error) {
		throw error
	}
}
