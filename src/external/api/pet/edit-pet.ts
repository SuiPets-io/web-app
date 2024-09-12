import { axiosPrivate } from '@/http'
import { z } from 'zod'

const editPetInputSchema = z.object({
	petId: z.string(),
	name: z.string().optional(),
	isOpenAuto: z.boolean().optional(),
	isReadGrowthBonus: z.boolean().optional(),
})

export type editPetInput = z.infer<typeof editPetInputSchema>

export const editPet = async (input: editPetInput) => {
	try {
		const body = editPetInputSchema.parse(input)
		const resp = await axiosPrivate.post('/pets/edit-pet', body)
		return resp.data
	} catch (error) {
		throw error
	}
}
