import { PET_ITEM_TYPE } from '@/constants'
import { z } from 'zod'

export const ItemSchem = z.object({
	name: z.string(),
	image: z.string(),
	price: z.number(),
	type: z.nativeEnum(PET_ITEM_TYPE),
})

export const CategoryItemsConfigSchema = z.object({
	foodConfig: z.array(ItemSchem),
	entertainmentConfig: z.array(ItemSchem),
	toiletConfig: z.array(ItemSchem),
})

export type TItem = z.infer<typeof ItemSchem>

export type TCategoryItemsConfig = z.infer<typeof CategoryItemsConfigSchema>
