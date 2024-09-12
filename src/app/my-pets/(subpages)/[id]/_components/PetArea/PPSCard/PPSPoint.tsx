import LightningIcon from '@/assets/images/icons/lightning.png'
import { Text } from '@/components/ui'
import { balanceDisplayer } from '@/utils'
import Image from 'next/image'

const PPSPoint = ({ ppsPoint }: { ppsPoint: number }) => {
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex gap-1">
				<Text className="text-[#F79857] text-xs font-normal">
					PetPals (PPS)
				</Text>
				<Image
					src={LightningIcon}
					alt="lightning"
					className="min-w-[10px] w-[10px] h-auto"
				/>
			</div>
			<div className="bg-neutral-100 border border-neutral-300 flex justify-center w-full rounded-full py-1">
				<Text className="text-[#65636F] text-xs font-normal">
					{balanceDisplayer(ppsPoint, 2)}
				</Text>
			</div>
		</div>
	)
}

export default PPSPoint
