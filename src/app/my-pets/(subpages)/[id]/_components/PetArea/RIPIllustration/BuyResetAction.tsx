import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { positionAtom } from '@/app/my-pets/_store/positionAtom'
import { ConfirmPopup } from '@/components/molecules'
import { Button } from '@/components/ui'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import useBuyReset from '../../../_hooks/useBuyReset'

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
		if (petConfig?.resetPetDiePrice) {
			setShow(false)
			buyReset({ amount: petConfig.resetPetDiePrice })
		}
	}

	return (
		<>
			<Button onClick={() => setShow(true)} variant="orange">
				Reset
			</Button>
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
