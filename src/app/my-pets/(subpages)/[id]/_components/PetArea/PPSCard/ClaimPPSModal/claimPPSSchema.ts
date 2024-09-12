import { z } from 'zod'

export const claimPPSSchema = z.object({
	pps: z.number({
		invalid_type_error: 'Amount is required',
		required_error: 'Amount is required',
	}),
})

export type TClaimPPSSchema = z.infer<typeof claimPPSSchema>
