import { useModal } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { ORIGIN, PET_TYPE, RARITY } from '@/constants'
import { balanceDisplayer } from '@/utils'
import useBuyEgg from '../hooks/useBuyEgg'

interface IBuyEggModal {
	publicAddress: string
	rarity: RARITY
	origin: ORIGIN
	eggId: string
	petType: PET_TYPE
	price?: number
}

const BuyEggModal = ({ eggInfo }: { eggInfo: IBuyEggModal }) => {
	const { eggId, price } = eggInfo
	const { closeModal } = useModal()

	const onSuccess = () => {
		closeModal()
	}

	const { mutate } = useBuyEgg({ eggId, onSuccess })

	const onConfirm = () => {
		if (price) {
			mutate({ amount: price })
		}
	}

	return (
		<div className="flex flex-col gap-4 px-4 pb-4">
			<div className="grid grid-cols-2 gap-2">
				{eggInfo.origin ? (
					<Text className="capitalize">
						<b>Origin:</b> {eggInfo.origin}
					</Text>
				) : null}
				<Text className="capitalize">
					<b>Rarity:</b> {eggInfo.rarity}
				</Text>
				<Text className="capitalize">
					<b>Pet:</b> {eggInfo.petType}
				</Text>
			</div>
			<hr />
			<div className="flex justify-between">
				<Text className="capitalize">
					<b>Price:</b>
				</Text>
				<Text className="capitalize text-green-500 font-semibold">
					{balanceDisplayer(eggInfo.price)} SUI
				</Text>
			</div>
			<Button className="capitalize" onClick={onConfirm}>
				Buy
			</Button>
		</div>
	)
}

export default BuyEggModal
