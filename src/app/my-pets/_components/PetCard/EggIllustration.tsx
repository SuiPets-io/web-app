import { Text } from '@/components/ui'
import { TEggOrigin, TPet, TPetStatus, TRarity } from '@/types'
import { cn } from '@/utils'
import { getEggAsset } from '@/utils/getAssets'
import { ReloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import useGetPetConfig from '../../_hooks/useGetPetConfig'
import CountDownTime from './CountdownTime'

interface IEggIllustration {
	petType: TPet
	rarity: TRarity
	status: TPetStatus
	growthTime?: string
	origin: TEggOrigin
}

const EggIllustration = ({
	petType,
	rarity,
	status,
	growthTime,
	origin,
}: IEggIllustration) => {
	const { data: petConfig } = useGetPetConfig()
	if (!petType || !rarity) return null

	const selectedEgg = getEggAsset(petType, rarity)

	return (
		<div className="flex flex-col gap-2 w-full items-center">
			{selectedEgg && (
				<div
					className={cn(
						'w-[90px] -mb-2',
						origin === 'genesis' ? 'scale-125' : ''
					)}>
					<Image className={cn('w-[90px]')} src={selectedEgg} alt={petType} />
				</div>
			)}
			<div className="min-h-[16px] w-full block">
				{status === 'waiting-to-check-buy' ? (
					<div className="flex gap-2 items-center text-sky-500">
						<ReloadIcon className="h-3 w-3 animate-spin" />
						<Text className="text-xs font-normal leading-[8px] text-center">
							Waiting for transaction...
						</Text>
					</div>
				) : growthTime && petConfig?.growthEggTimeInHour ? (
					<CountDownTime
						nextTime={growthTime}
						maxDuration={petConfig.growthEggTimeInHour}
					/>
				) : null}
			</div>
		</div>
	)
}

export default EggIllustration
