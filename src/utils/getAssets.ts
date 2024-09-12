import { AnimationConfig } from '@/app/my-pets/(subpages)/[id]/_components/PetArea/AnimationConfig/AnimationConfig'
import { TPetState } from '@/app/my-pets/(subpages)/[id]/_store/petDetailAtom'
import { AnimalAssets, EggAssets } from '@/constants'
import { TEggOrigin, TPet, TRarity } from '@/types'

export const getAnimalAsset = (
	petType: TPet,
	rarity: TRarity,
	origin: TEggOrigin
) => {
	return AnimalAssets[petType][origin][rarity]
}

export const getEggAsset = (petType: TPet, rarity: TRarity) => {
	return EggAssets[petType][rarity]
}

export const getPetAnimation = (
	petType: TPet,
	rarity: TRarity,
	stage: TPetState,
	origin: TEggOrigin
) => {
	const { width, height, animation } = AnimationConfig[petType][origin][stage]

	return {
		animation: animation[rarity],
		width,
		height,
	}
}
