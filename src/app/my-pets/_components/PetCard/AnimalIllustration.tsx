import { ORIGIN } from '@/constants'
import { TEggOrigin, TPet, TRarity } from '@/types'
import { cn } from '@/utils'
import { getAnimalAsset } from '@/utils/getAssets'
import Image from 'next/image'
import LevelInfo from './LevelInfo'

interface AnimalIllustration {
	petType: TPet
	rarity: TRarity
	level: number
	point?: number
	origin: TEggOrigin
}

const AnimalIllustration = ({
	petType,
	rarity,
	level,
	point,
	origin,
}: AnimalIllustration) => {
	if (!petType || !rarity || level === undefined || !origin) return null

	const selectedPet = getAnimalAsset(petType, rarity, origin)

	return (
		<div className="flex flex-col w-full items-center">
			{selectedPet && (
				<div
					className={cn(
						'-mb-3',
						origin === ORIGIN.NORMAL
							? 'h-[140px] w-[140px]'
							: 'h-[160px] w-[160px]'
					)}>
					<Image
						className={cn('object-cover')}
						src={selectedPet}
						alt={petType}
					/>
				</div>
			)}
			{level !== undefined && point !== undefined && (
				<LevelInfo level={level} currentExp={point} />
			)}
		</div>
	)
}

export default AnimalIllustration
