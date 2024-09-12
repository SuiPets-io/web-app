import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { positionAtom } from '@/app/my-pets/_store/positionAtom'
import AutoIcon from '@/assets/images/svg/auto.svg'
import { ConfirmPopup } from '@/components/molecules'
import { Text } from '@/components/ui'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useState } from 'react'
import useBuyAuto from '../../_hooks/useBuyAuto'

const BuyAutoFeedAction = () => {
	const { data: petConfig } = useGetPetConfig()
	const position = useAtomValue(positionAtom)
	const [isShow, setShow] = useState(false)

	const onSuccess = () => {}

	const { mutate: buyAuto } = useBuyAuto({ position, onSuccess })

	const confirmText = (
		<div>
			<span>Are you sure to buy this item?</span>
		</div>
	)

	const onConfirm = () => {
		if (petConfig?.autoActivityPrice) {
			setShow(false)
			buyAuto({ amount: petConfig.autoActivityPrice })
		}
	}

	return (
		<>
			<button
				className="relative border border-[#F79857] bg-gradient-to-r from-[#F79F5C] to-[#FCE995] w-full px-3 py-2 rounded-[10px] flex flex-col items-center cursor-pointer"
				onClick={() => setShow(true)}>
				<Image
					src={AutoIcon}
					alt={'auto'}
					className="h-[40px] w-auto max-w-[50px]"
					width={30}
					height={50}
				/>
				<Text className="text-xs leading-5 mt-2 capitalize text-[#9E4A00] font-semibold">
					Auto Care
				</Text>
				<div className="uppercase text-xs text-white">
					{petConfig?.autoActivityPrice} SUI
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

export default BuyAutoFeedAction
