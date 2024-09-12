import { ConfirmPopup } from '@/components/molecules'
import { Button } from '@/components/ui'
import { EggType } from '@/external/api/egg/get-my-egg'
import { useGlobalLoading } from '@/hooks'
import { cn } from '@/utils'
import { useState } from 'react'
import useGetEggConfig from '../../my-eggs/_hooks/useGetEggConfig'
import useOpenMysteryBox from '../_hooks/useBuyMysteryBox'
import useCheckClaimFreeEgg from '../_hooks/useCheckClaimFreeEgg'
import useClaimFreeEgg from '../_hooks/useClaimFreeEgg'
import Congratulations from './Congratulations'

const BoxItem = () => {
	const { data: eggConfig } = useGetEggConfig()
	const [isShow, setShow] = useState(false)
	const [isSuccess, setSuccess] = useState(false)
	const [eggInfo, setEggInfo] = useState<EggType | null>(null)
	const { data: isClaimFreeEgg, isLoading } = useCheckClaimFreeEgg()

	const eggPrice = eggConfig?.buyOfferingPrice || 0

	useGlobalLoading(isLoading)

	const onSuccess = (data: EggType) => {
		setSuccess(true)
		setEggInfo(data)
	}

	const { mutate: onBuyMysteryBox } = useOpenMysteryBox({ onSuccess })
	const { mutate: onClaimFreeEgg } = useClaimFreeEgg({ onSuccess })

	const onConfirm = () => {
		setShow(false)
		if (isClaimFreeEgg) {
			onClaimFreeEgg()
		} else {
			onBuyMysteryBox({ amount: eggPrice })
		}
	}

	const confirmText = (
		<div>
			<span>Are you sure to open this box?</span>
		</div>
	)

	return (
		<>
			<div
				onClick={() => setShow(true)}
				className={cn(
					'h-[185px] bg-[#17D7A6] rounded-xl w-full drop-shadow-[0_4px_6px_rgba(17,199,153,0.8)] cursor-pointer'
				)}>
				<div
					className={cn(
						'h-[176px] w-full rounded-xl',
						'bg-gradient-to-br from-[#F4FCF8] to-[#E1F5EB]',
						'shadow-[inset_0px_0px_8px_8px_rgba(5,150,105,0.1)] relative border border-[#17D7A6]'
					)}>
					<div className="grid grid-cols-2 w-full h-full relative">
						<div className="rounded-xl w-full h-full bg-[#EDFAF3] border border-[#17D7A6]" />
						<div className="rounded-xl w-full h-full bg-[#EDFAF3] border border-[#17D7A6]" />
						<div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
							<Button size="sm" variant="orange" className="min-w-[75px] gap-1">
								OPEN{' '}
								<span className="px-1 py-0.5 text-[8px] rounded-full bg-green-500 text-white font-normal">
									{isClaimFreeEgg ? 'FREE' : `${eggPrice} SUI`}
								</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<ConfirmPopup
				show={isShow}
				text={confirmText}
				onYes={onConfirm}
				onClose={() => setShow(false)}
			/>
			{isSuccess ? (
				<Congratulations eggInfo={eggInfo} onClose={() => setSuccess(false)} />
			) : null}
		</>
	)
}

export default BoxItem
