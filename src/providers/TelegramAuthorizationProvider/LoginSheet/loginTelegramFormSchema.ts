import { isValidPrivateKey, isValidSeedPhrase } from '@/utils'
import { z } from 'zod'

export const loginTelegramFormSchema = z.object({
	seedOrPrivateKey: z.string().refine((v) => {
		if (isValidPrivateKey(v)) {
			return true
		}

		if (isValidSeedPhrase(v)) {
			return true
		}

		return false
	}, 'Seedphrase or Private key is not valid'),
})

export type TLoginTelegramForm = z.infer<typeof loginTelegramFormSchema>
