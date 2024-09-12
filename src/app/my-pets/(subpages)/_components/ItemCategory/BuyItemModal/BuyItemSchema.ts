import { z } from 'zod'

export const BuyItemSchema = z.object({
	itemNumber: z
		.number({
			invalid_type_error: 'This field is required',
			required_error: 'This field is required',
		})
		.min(1, 'Quantity of item must be over 0'),
})

export type TBuyItem = z.infer<typeof BuyItemSchema>
