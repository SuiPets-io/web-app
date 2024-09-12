import {
  BathroomIcon,
  EntertainmentIcon,
  FoodIcon,
  Text,
} from '@/components/ui'
import { PET_STAGE } from '@/constants'
import { cn } from '@/utils'
import { motion } from 'framer-motion'

const iconList = {
  [PET_STAGE.EAT]: <FoodIcon className="fill-green-500 w-4 h-4" />,
  [PET_STAGE.TOILET]: <BathroomIcon className="fill-green-500 w-4 h-4" />,
  [PET_STAGE.ENTERTAINMENT]: <EntertainmentIcon className="fill-green-500 w-4 h-4" />,
}

const ThinkingList = {
	hungry: {
		text: "I'm hungry! Can I have some food?",
	},
	eat: {
		text: "Yummy, yummy... I'm full now",
	},
	dirty: {
		text: 'Ewww, I feel dirty! Lets clean up?',
	},
	toilet: {
		text: 'Purr... the bubbles feel so nice on my fur!',
	},
	sad: {
		text: "I'm bored. Lets go play?",
	},
	funny: {
		text: 'Lalala... So funny!',
	},
	sick: {
		text: "I'm gonna die! Because you don't care about me.",
	},
}

const ThinkingPet = ({
	stage,
  petStageType
}: {
	stage: 'hungry' | 'dirty' | 'sad' | 'sick' | 'eat' | 'toilet' | 'funny',
  petStageType: PET_STAGE
}) => {
	return (
		<motion.div
			className={cn(
				'rounded-lg bg-white pl-3 pr-5 py-2 relative max-w-[120px]',
				'before:absolute befote:content-[""] before:right-[24px] before:bottom-[-14px] before:w-0 before:h-0',
				'before:border-l-[12px] before:border-l-white',
				'before:border-r-[6px] before:border-r-transparent',
				'before:border-t-[6px] before:border-t-white',
				'before:border-b-[10px] before:border-b-transparent'
			)}
			initial={{ y: '10px', opacity: 0 }}
			animate={{ y: '0px', opacity: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.5,
			}}>
			<Text className="text-xs">{ThinkingList[stage]?.text}</Text>
			<div className="absolute top-1 right-1">{iconList[petStageType]}</div>
		</motion.div>
	)
}

export default ThinkingPet
