import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import CarpetImg from '@/assets/images/carpet.png'
import { PET_STATUS } from '@/constants'
import { TEggOrigin, TPet, TPetStatus, TRarity } from '@/types'
import { cn } from '@/utils'
import { getEggAsset } from '@/utils/getAssets'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CountDownTime from './CountdownTime'

interface IEggIllustration {
	petType: TPet
	rarity: TRarity
	status: TPetStatus
	origin: TEggOrigin
	growthTime?: string
}

const EggIllustration = ({
	petType,
	rarity,
	status,
	growthTime,
	origin,
}: IEggIllustration) => {
	const { data: petConfig } = useGetPetConfig()

	const [isShake, setShake] = useState(false)

	useEffect(() => {
		if (status === PET_STATUS.EGG) {
			const interval = setInterval(() => {
				setShake((prev) => !prev)
			}, 5000)

			return () => clearInterval(interval)
		}
		return
	}, [status])

	if (!petType || !rarity) return null

	const selectedEgg = getEggAsset(petType, rarity)

	return selectedEgg && petConfig?.growthEggTimeInHour ? (
		<div className="flex flex-col items-center min-w-[252px]">
			<div className="flex justify-center">
				{growthTime ? (
					<CountDownTime
						nextTime={growthTime}
						maxDuration={petConfig?.growthEggTimeInHour}
					/>
				) : null}
			</div>
			<Image
				src={CarpetImg}
				alt="carpet"
				className="w-auto h-[74px] absolute bottom-[-25px]"
			/>
			<Image
				src={selectedEgg}
				alt={petType}
				className={cn(
					'w-auto h-[140px] relative -mb-5',
					origin === 'genesis' ? 'h-[160px]' : '',
					isShake ? 'egg-shake' : ''
				)}
			/>
		</div>
	) : null
}

export default EggIllustration
