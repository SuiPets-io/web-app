import { axiosPrivate } from '@/http'
import { z } from 'zod'

export const createAccountTeleInputSchema = z.object({
	chatId: z.string(),
	firstname: z.string().optional(),
	lastname: z.string().optional(),
	username: z.string(),
	hash: z.string(),
	publicAddress: z.string(),
	message: z.instanceof(Uint8Array),
	signature: z.string(),
	referedCode: z.string().optional(),
})

const createAccountTeleOutputSchema = z.object({
	token: z.string(),
})

export type createAccountTeleInput = z.infer<
	typeof createAccountTeleInputSchema
>

export type createAccountTeleOutput = z.infer<
	typeof createAccountTeleOutputSchema
>

export const createAccountTelegram = async (input: createAccountTeleInput) => {
	try {
		const body = createAccountTeleInputSchema.parse(input)
		const resp = await axiosPrivate.post('/users/create-account-tele', body)
		if (resp?.data?.data) {
			return createAccountTeleOutputSchema.parse(resp.data.data)
		} else {
			throw resp
		}
	} catch (error) {
		throw error
	}
}
