import { isValidSuiAddress } from '@mysten/sui/utils'
import { z } from 'zod'

export const SendTokenSchemaFn = (value: number) =>
	z.object({
		to: z
			.string({
				invalid_type_error: 'Address is required',
				required_error: 'Address is required',
			})
			.min(1, 'Address is required')
			.refine((value) => {
				return isValidSuiAddress(value)
			}, 'Address is invalid'),
		amount: z
			.number({
				invalid_type_error: 'Amount is required',
				required_error: 'Amount is required',
			})
			.max(value, `Amount is not over ${value} SUI`),
	})
const SendTokenSchema = SendTokenSchemaFn(0)
export type TSendToken = z.infer<typeof SendTokenSchema>
