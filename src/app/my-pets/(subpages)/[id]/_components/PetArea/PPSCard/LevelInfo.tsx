import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { Text } from '@/components/ui'
import { cn } from '@/utils'
import { motion } from 'framer-motion'

type TLevelInfo = {
	level: number
	currentExp: number
}

const LevelInfo = ({ level, currentExp }: TLevelInfo) => {
	const { data: petConfig } = useGetPetConfig()
	const preTotalExp = petConfig?.levelConfig?.[level - 1] || 0
	const totalExp = petConfig?.levelConfig?.[level] || 1
	const expPercent = currentExp
		? Math.trunc(((currentExp - preTotalExp) / (totalExp - preTotalExp)) * 100)
		: 0

	return (
		<div className="inline-flex gap-1 justify-between w-full items-center">
			<Text className="text-green-500 font-semibold text-xs leading-5 tracking-tighter">
				LV.{level + 1}
			</Text>
			<div className="border-[1.5px] border-green-700 bg-[#EAEAEA] rounded-[3.5px] h-[9px] relative w-full">
				{expPercent > 0 && expPercent <= 100 ? (
					<motion.div
						className={cn(
							'absolute top-[-1px] left-[-1.5px] h-[9px] max-w-[66px]',
							'border-[1.5px] border-green-700 bg-green-200 rounded-[3.5px]',
							expPercent < 5 ? 'left-0' : ''
						)}
						initial={{ width: '0%' }}
						animate={{ width: `${expPercent}%` }}
					/>
				) : null}
			</div>
		</div>
	)
}

export default LevelInfo
