import { Button, Text } from '@/components/ui'
import { EggType } from '@/external/api/egg/get-my-egg'

const ConfirmPutEggModal = ({
	eggInfo,
	onConfirm,
}: {
	eggInfo: EggType
	onConfirm: () => void
}) => {
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
			<Button className="capitalize" onClick={onConfirm}>
				Put
			</Button>
		</div>
	)
}

export default ConfirmPutEggModal
