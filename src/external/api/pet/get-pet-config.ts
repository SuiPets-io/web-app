import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getPetConfigOutputSchema = z.object({
	levelConfig: z.record(z.string(), z.number()),
	ppsSpeed: z.record(z.string(), z.number()),
	activityTimeInHour: z.number(),
	numberDayToDie: z.number(),
	petSlotPrice: z.record(z.string(), z.number()),
	growthEggTimeInHour: z.number().optional(),
	resetPetPrice: z.number().optional(),
	resetPetDiePrice: z.number().optional(),
	activeFusionPrice: z.number().optional(),
	autoActivityPrice: z.number().optional(),
	buyItemFeeInSui: z.number().optional(),
	timeToFusionInHour: z.record(z.string(), z.number()),
	fusionFeeRate: z.number(),
	levelMapItem: z.record(z.string(), z.array(z.string())),
	growthEggBonus: z.array(z.number()).optional(),
})

export type getPetConfigOutput = z.infer<typeof getPetConfigOutputSchema>

export const getPetConfig = async () => {
	try {
		const resp = await axiosPrivate.get('/pets/config')
		return getPetConfigOutputSchema.parse(resp?.data?.data)
	} catch (error) {
		throw error
	}
}
