import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { positionAtom } from '@/app/my-pets/_store/positionAtom'
import FusionIcon from '@/assets/images/svg/fusion.svg'
import { ConfirmPopup } from '@/components/molecules'
import { Text } from '@/components/ui'
import { cn } from '@/utils'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useState } from 'react'
import useBuyFusion from '../../_hooks/useBuyFusion'

const BuyFusionAction = () => {
	const { data: petConfig } = useGetPetConfig()
	const position = useAtomValue(positionAtom)
	const [isShow, setShow] = useState(false)

	const onSuccess = () => {}

	const { mutate: buyFusion } = useBuyFusion({ position, onSuccess })

	const confirmText = (
		<div>
			<span>Are you sure to buy this item?</span>
		</div>
	)

	const onConfirm = () => {
		if (petConfig?.activeFusionPrice) {
			setShow(false)
			buyFusion({ amount: petConfig?.activeFusionPrice })
		}
	}

	return (
		<>
			<button
				onClick={() => setShow(true)}
				className={cn(
					'relative border border-[#93F5E7] bg-gradient-to-r from-[#ADFCFF] to-[#F2FFFD]',
					'w-full px-3 py-2 rounded-[10px] flex flex-col items-center cursor-pointer'
				)}>
				<Image
					src={FusionIcon}
					alt={'auto'}
					className="h-[40px] w-auto max-w-[50px]"
					width={30}
					height={50}
				/>
				<Text className="text-xs leading-5 mt-2 capitalize text-[#55D0BF] font-semibold">
					Fusion
				</Text>
				<div className="uppercase text-xs text-white">
					{petConfig?.activeFusionPrice} SUI
				</div>
			</button>
			<ConfirmPopup
				show={isShow}
				text={confirmText}
				onYes={onConfirm}
				onClose={() => setShow(false)}
			/>
		</>
	)
}

export default BuyFusionAction
