import { CongratulationsAnimation } from '@/components/molecules'
import { Text } from '@/components/ui'
import { EggType } from '@/external/api/egg/get-my-egg'
import { getEggAsset } from '@/utils/getAssets'
import { Cross1Icon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface CongratulationsProps {
	eggInfo: EggType | null
	onClose: () => void
}

const Congratulations = ({ eggInfo, onClose }: CongratulationsProps) => {
	const ref = useRef<HTMLDivElement>(null)

	useOnClickOutside(ref, onClose)

	if (!eggInfo) return null

	const { petType, rarity } = eggInfo

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
			<div className="z-0 absolute top-0 left-0 w-full h-full bg-neutral-800/50" />
			<div
				ref={ref}
				className="relative w-fit min-w-[300px] h-fit p-4 rounded-xl bg-white border-[2px] border-green-500 backdrop-blur-md flex flex-col gap-4 items-center shadow">
				<div
					className="z-[1] absolute top-4 right-4 cursor-pointer"
					onClick={onClose}>
					<Cross1Icon width={16} height={16} color="black" />
				</div>
				<Image
					src={getEggAsset(petType, rarity)}
					alt={petType}
					className="w-[140px] h-[140px]"
				/>
				<div className="flex flex-col gap-2 items-center">
					<Text>
						Congratulations! You have received a <b>GENESIS</b> egg.
					</Text>
					<Text className="capitalize font-bold">
						{petType} - {rarity}
					</Text>
				</div>
			</div>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<CongratulationsAnimation />
			</div>
		</div>
	)
}

export default Congratulations
