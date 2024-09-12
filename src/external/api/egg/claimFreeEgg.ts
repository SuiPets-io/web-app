import { EGG_STATUS, ORIGIN, PET_TYPE, RARITY } from '@/constants'
import { axiosPrivate } from '@/http'
import { z } from 'zod'

const EggSchema = z.object({
	publicAddress: z.string(),
	_id: z.string(),
	status: z.nativeEnum(EGG_STATUS),
	rarity: z.nativeEnum(RARITY),
	origin: z.nativeEnum(ORIGIN),
	petType: z.nativeEnum(PET_TYPE),
})

export const claimFreeEgg = async () => {
	try {
		const res = await axiosPrivate.post('/eggs/claim-free-egg')
		return EggSchema.parse(res.data.data)
	} catch (error) {
		throw error
	}
}
