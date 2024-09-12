import { Text } from '@/components/ui'
import { HOUR_DURATION } from '@/constants'
import { cn } from '@/utils'
import { motion } from 'framer-motion'
import moment from 'moment'
import Countdown from 'react-countdown'

const renderer = ({
	hours,
	minutes,
	seconds,
	days,
}: {
	days: number
	hours: number
	minutes: number
	seconds: number
	completed: boolean
}) => {
	return (
		<span className="text-xs text-green-500 text-center">
			{days}d:{hours}h:{minutes}m:{seconds}s
		</span>
	)
}

type TCountdownTime = {
	maxDuration: number
	diffTime: number | null
	nextTime: string
}

const CountdownTime = ({ maxDuration, diffTime, nextTime }: TCountdownTime) => {
	const completedPercent = diffTime
		? (diffTime / (maxDuration * HOUR_DURATION)) * 100
		: 0

	return (
		<div className="flex gap-2 justify-center w-full max-w-[200px] m-auto">
			<Text className="text-green-500 font-semibold text-sm min-w-max capitalize -mt-0.5">
				Next Fusion:
			</Text>
			<div className="flex flex-col w-full gap-1">
				<div className="border-[1.5px] border-green-700 bg-[#EAEAEA] rounded-[6px] h-[12px] relative w-full">
					<motion.div
						className={cn(
							'absolute top-[-1px] left-[-1.5px] h-[12px] border-[1.5px] border-green-700 bg-green-200 rounded-[6px]',
							completedPercent < 5 ? 'left-0' : ''
						)}
						initial={{ width: '0%' }}
						animate={{ width: `${completedPercent}%` }}
					/>
				</div>
				<Countdown date={moment(nextTime).valueOf()} renderer={renderer} />
			</div>
		</div>
	)
}

export default CountdownTime
