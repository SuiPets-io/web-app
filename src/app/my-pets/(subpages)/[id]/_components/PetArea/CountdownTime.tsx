import { Text } from '@/components/ui'
import { queryClient } from '@/configs'
import { HOUR_DURATION, PET_STATUS, queryKeys } from '@/constants'
import { useDiffTime } from '@/hooks'
import { cn } from '@/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import Countdown from 'react-countdown'
import { petDetailAtom, petStageAtom } from '../../_store/petDetailAtom'
import ThinkingPet from './ThinkingPet'

const renderer = ({
	hours,
	minutes,
	seconds,
}: {
	hours: number
	minutes: number
	seconds: number
	completed: boolean
}) => {
	return (
		<span className="text-[12px] text-green-500">
			{hours}h:{minutes}m:{seconds}s
		</span>
	)
}

interface CountDownTimeProps {
	nextTime: string
	maxDuration: number
}

const CountDownTime = ({ maxDuration, nextTime }: CountDownTimeProps) => {
	const { id } = useParams<{ id: string }>()
	const { diffTime } = useDiffTime({ nextTime })
	const stage = useAtomValue(petStageAtom)
	const petInfo = useAtomValue(petDetailAtom)

	useEffect(() => {
		if (diffTime !== null && nextTime && diffTime <= 0) {
			setTimeout(
				() =>
					queryClient.invalidateQueries({
						queryKey: queryKeys.getPetDetail(id),
						refetchType: 'active',
					}),
				1000
			)
		}
	}, [diffTime, id, nextTime])

	const completedPercent = diffTime
		? (diffTime / (maxDuration * HOUR_DURATION)) * 100
		: 0

	return diffTime && diffTime > 0 && stage === 'normal' ? (
		<div
			className={cn(
				'bg-white rounded-xl p-2 py-[6px] flex flex-col items-center gap-[2px] relative max-w-[120px]',
				"after:absolute after:content-[''] after:bg-white after:top-[90%] after:left-1/2 after:-translate-x-1/2",
				'after:w-[8px] after:h-[10px]',
				'after:[clip-path:polygon(100%_0,0_0,50%_100%)] min-w-[90px]'
			)}>
			<Countdown date={moment(nextTime).valueOf()} renderer={renderer} />
			<div className="border-[1.5px] border-green-700 bg-[#EAEAEA] rounded-[3.5px] h-[9px] relative w-full">
				<motion.div
					className={cn(
						'absolute top-[-1.5px] left-[-1.5px] h-[9px] border-[1.5px] border-green-700 bg-green-200 rounded-[3.5px]',
						completedPercent < 5 ? 'left-0' : ''
					)}
					initial={{ width: '0%' }}
					animate={{
						width: `${completedPercent}%`,
					}}
				/>
			</div>
		</div>
	) : petInfo?.stage &&
	  petInfo.status === PET_STATUS.PET &&
	  (stage === 'hungry' ||
			stage === 'sad' ||
			stage === 'sick' ||
			stage === 'dirty' ||
			stage === 'eat' ||
			stage === 'funny' ||
			stage === 'toilet') ? (
		<ThinkingPet stage={stage} petStageType={petInfo.stage} />
	) : (
		<div
			className={cn(
				'bg-white rounded-xl p-2 py-[6px] flex flex-col items-center gap-[2px] relative max-w-[120px]',
				"after:absolute after:content-[''] after:bg-white after:top-[90%] after:left-1/2 after:-translate-x-1/2",
				'after:w-[8px] after:h-[10px]',
				'after:[clip-path:polygon(100%_0,0_0,50%_100%)] min-w-[90px]'
			)}>
			<div className="flex gap-2 items-center text-sky-500">
				<ReloadIcon className="h-3 w-3 animate-spin" />
				<Text className="text-xs font-normal leading-[8px] text-center min-w-max">
					Wait a minute...
				</Text>
			</div>
		</div>
	)
}

export default CountDownTime
