import { HOUR_DURATION } from '@/constants'
import { useDiffTime } from '@/hooks'
import { cn } from '@/utils'
import { motion } from 'framer-motion'
import moment from 'moment'
import Countdown from 'react-countdown'

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
		<span className="text-[12px] text-green-500 text-center">
			{hours}h:{minutes}m:{seconds}s
		</span>
	)
}

interface CountDownTimeProps {
	maxDuration: number
	nextTime: string
}

const CountDownTime = ({ nextTime, maxDuration }: CountDownTimeProps) => {
	const { diffTime } = useDiffTime({ nextTime })

	return diffTime ? (
		<div className={cn('w-full flex flex-col justify-center')}>
			<Countdown date={moment(nextTime).valueOf()} renderer={renderer} />
			<div className="border-[1.5px] border-green-700 bg-[#EAEAEA] rounded-[3.5px] h-[9px] relative w-full">
				<motion.div
					className="absolute top-[-1.5px] left-[-2px] h-[9px] border-[1.5px] border-green-700 bg-green-200 rounded-[3.5px]"
					initial={{ width: '0%' }}
					animate={{
						width: `${(diffTime / (maxDuration * HOUR_DURATION)) * 100}%`,
					}}
				/>
			</div>
		</div>
	) : null
}

export default CountDownTime
