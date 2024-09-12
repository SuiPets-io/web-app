import { z } from 'zod'

export const SendTokenSchemaFn = (value: number) =>
	z.object({
		amount: z
			.number({
				invalid_type_error: 'Amount is required',
				required_error: 'Amount is required',
			})
			.max(value, `Amount is not over ${value} PPS`),
	})
const SendTokenSchema = SendTokenSchemaFn(0)

export type TSendToken = z.infer<typeof SendTokenSchema>
