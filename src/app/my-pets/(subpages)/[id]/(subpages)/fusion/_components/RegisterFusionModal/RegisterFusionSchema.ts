import { z } from 'zod'

export const RegisterFusioningSchema = z.object({
	price: z.number({
		invalid_type_error: 'Price is required',
		required_error: 'Price is required',
	}),
})

export type TRegisterFusion = z.infer<typeof RegisterFusioningSchema>
