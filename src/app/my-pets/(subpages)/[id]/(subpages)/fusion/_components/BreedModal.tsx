import { Button, Text } from '@/components/ui'
import { PetType } from '@/external/api/pet/get-my-pet'
import { balanceDisplayer } from '@/utils'

const BreedModal = ({
	givePetInfo,
	onConfirm,
}: {
	givePetInfo: PetType
	onConfirm: () => void
}) => {
	return (
		<>
			<div className="flex flex-col gap-4 px-4 pb-4">
				<div className="grid grid-cols-2 gap-2">
					{givePetInfo.origin ? (
						<Text className="capitalize">
							<b>Origin:</b> {givePetInfo.origin}
						</Text>
					) : null}
					<Text className="capitalize">
						<b>Rarity:</b> {givePetInfo.rarity}
					</Text>
					<Text className="capitalize">
						<b>Pet:</b> {givePetInfo.type}
					</Text>
				</div>
				<hr />
				<div className="flex justify-between">
					<Text className="capitalize">
						<b>Price:</b>
					</Text>
					<Text className="capitalize text-green-500 font-semibold">
						{balanceDisplayer(givePetInfo.fusion?.amount)} SUI
					</Text>
				</div>
				<Button className="capitalize" onClick={onConfirm}>
					Breed
				</Button>
			</div>
		</>
	)
}

export default BreedModal
