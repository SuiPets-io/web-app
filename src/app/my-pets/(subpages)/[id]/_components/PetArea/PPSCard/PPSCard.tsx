import { Button } from '@/components/ui'
import { ORIGIN } from '@/constants'
import { useGlobalLoading } from '@/hooks'
import { cn } from '@/utils'
import { useAtomValue } from 'jotai'
import useHarvest from '../../../_hooks/useHarvest'
import { petDetailAtom } from '../../../_store/petDetailAtom'
import LevelInfo from './LevelInfo'
import PPSPoint from './PPSPoint'

const PPSCard = () => {
	const petInfo = useAtomValue(petDetailAtom)

	const { mutate, isPending } = useHarvest({})

	useGlobalLoading(isPending)

	return (
		<div className="relative flex flex-col gap-1 border border-[#C3DFD1] bg-white rounded-lg p-2 min-w-[94px] w-full">
			<div className="flex gap-1">
				<p
					className={cn(
						'px-1 py-0.5 rounded-full uppercase text-[7px] leading-[8px] text-white text-center',
						petInfo?.origin === ORIGIN.GENESIS ? 'bg-orange-500' : 'bg-gray-500'
					)}>
					{petInfo?.origin}
				</p>
				<p className="px-1 py-0.5 rounded-full bg-sky-500 uppercase text-[7px] leading-[8px] text-white text-center">
					{petInfo?.rarity}
				</p>
			</div>
			{petInfo?.level !== undefined && petInfo?.point !== undefined ? (
				<>
					<LevelInfo level={petInfo.level} currentExp={petInfo.point} />
					<hr className="border-[#C3DFD1]" />
				</>
			) : null}

			{petInfo?.currentPps !== undefined ? (
				<PPSPoint ppsPoint={petInfo?.currentPps} />
			) : null}
			<Button
				disabled={!petInfo?.currentPps}
				variant="orange"
				className="uppercase text-xs font-semibold h-[22px] border-b-[4px] hover:border-b-[4px]"
				onClick={() =>
					petInfo &&
					petInfo.currentPps &&
					mutate({
						petId: petInfo._id,
						pps: petInfo?.currentPps || 0,
					})
				}>
				Collect
			</Button>
		</div>
	)
}

export default PPSCard
