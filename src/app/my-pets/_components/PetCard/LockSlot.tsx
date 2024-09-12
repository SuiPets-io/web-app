import { ConfirmPopup } from '@/components/molecules'
import { Button, LockIcon, UnlockIcon } from '@/components/ui'
import { cn } from '@/utils'
import { useState } from 'react'
import useBuyPetSlot from '../../_hooks/useBuyPetSlot'
import useGetPetConfig from '../../_hooks/useGetPetConfig'

const LockSlot = ({ position }: { position: number }) => {
	const { data: petConfig } = useGetPetConfig()
	const [isShow, setShow] = useState(false)

	const { mutate } = useBuyPetSlot({ position })

	const onConfirm = () => {
		if (petConfig?.petSlotPrice[position]) {
			setShow(false)
			mutate({ amount: petConfig.petSlotPrice[position] })
		}
	}

	const confirmText = (
		<div>
			<span>Are you sure to buy this slot?</span>
		</div>
	)

	return (
		<>
			<div className={cn('flex items-end')} onClick={() => setShow(true)}>
				<div
					className={cn(
						'border border-[#AAAAAA] bg-[#D4D4D4] h-[150px] rounded-xl w-full',
						'border-neutral-300',
						'flex flex-col items-center gap-4 justify-center'
					)}>
					<LockIcon className="stroke-white fill-white" />
					<Button variant="orange" size="sm" className="h-7 w-[80px] p-0 gap-1">
						<UnlockIcon className="fill-[#FFEFA7] w-[14px] h-[16px]" />
						{petConfig?.petSlotPrice[position]} SUI
					</Button>
				</div>
			</div>
			<ConfirmPopup
				show={isShow}
				text={confirmText}
				onYes={onConfirm}
				onClose={() => setShow(false)}
			/>
		</>
	)
}

export default LockSlot
