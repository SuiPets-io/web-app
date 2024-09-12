import { z } from 'zod'

export const editPetSchema = z.object({
	petName: z
		.string()
		.min(1, 'Pet name is required')
		.max(10, 'Pet name is not over 10 characters'),
	petId: z.string(),
})

export type TEditPetSchema = z.infer<typeof editPetSchema>
