import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { positionAtom } from '@/app/my-pets/_store/positionAtom'
import { ConfirmPopup } from '@/components/molecules'
import { Text } from '@/components/ui'
import { cn } from '@/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import useBuyReset from '../../_hooks/useBuyReset'

const BuyResetAction = () => {
	const { data: petConfig } = useGetPetConfig()
	const position = useAtomValue(positionAtom)
	const [isShow, setShow] = useState(false)
	const router = useRouter()

	const onSuccess = () => {
		router.push('/my-pets')
	}

	const { mutate: buyReset } = useBuyReset({ position, onSuccess })

	const confirmText = (
		<div>
			<div>
				<span>Are you sure to reset pet to egg?</span>
			</div>
		</div>
	)

	const onConfirm = () => {
		if (petConfig?.resetPetPrice) {
			setShow(false)
			buyReset({ amount: petConfig.resetPetPrice })
		}
	}

	return (
		<>
			<button
				onClick={() => setShow(true)}
				className={cn(
					'relative border border-sky-400 bg-gradient-to-r from-sky-400 to-sky-100',
					'w-full px-3 py-2 rounded-[10px] flex flex-col items-center cursor-pointer'
				)}>
				<ReloadIcon height={40} className="h-[40px] w-[40px] text-white" />
				<Text className="text-xs leading-5 mt-2 capitalize text-sky-600 font-semibold">
					Reset
				</Text>
				<div className="uppercase text-xs text-white">
					{petConfig?.resetPetPrice} SUI
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

export default BuyResetAction
