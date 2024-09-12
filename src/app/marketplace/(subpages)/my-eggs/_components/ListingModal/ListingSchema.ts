import { z } from 'zod'

export const ListingSchema = z.object({
	price: z.number({
		invalid_type_error: 'Price is required',
		required_error: 'Price is required',
	}),
})

export type TListing = z.infer<typeof ListingSchema>
