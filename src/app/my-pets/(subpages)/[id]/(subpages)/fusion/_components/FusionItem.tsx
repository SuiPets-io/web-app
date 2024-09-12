import { useModal } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { EggType } from '@/external/api/egg/get-my-egg'
import { PetType } from '@/external/api/pet/get-my-pet'
import { useAccount } from '@/hooks'
import { addressShorten, cn } from '@/utils'
import { getAnimalAsset } from '@/utils/getAssets'
import { useRouter } from 'next-nprogress-bar'
import Image from 'next/image'
import { useState } from 'react'
import useFusion from '../hooks/useFusion'
import BreedModal from './BreedModal'
import FusionEggSuccessModal from './FusionEggSuccessModal'

interface IFusionItem {
	givePetInfo: PetType
	receivePetInfo: PetType
	disabled: boolean
}

const FusionItem = ({ givePetInfo, receivePetInfo, disabled }: IFusionItem) => {
	const router = useRouter()
	const { address } = useAccount()
	const [isSuccess, setSuccess] = useState(false)
	const [eggInfo, setEggInfo] = useState<EggType | null>(null)
	const { rarity, type, publicAddress, origin } = givePetInfo
	const AnimalImg =
		type && rarity && origin ? getAnimalAsset(type, rarity, origin) : ''

	const { openModal, closeModal } = useModal()

	const onSuccess = (data: EggType) => {
		closeModal()
		setSuccess(true)
		setEggInfo(data)
	}

	const { mutate: onBreed } = useFusion({
		params: {
			receivePetId: receivePetInfo._id,
			givePetId: givePetInfo._id,
			publicAddress: address || '',
		},
		onSuccess,
	})

	const onConfirm = () => {
		if (givePetInfo.fusion?.amount) {
			onBreed({ amount: givePetInfo.fusion?.amount })
		}
	}

	const onOpenBreedModal = () => {
		openModal({
			view: <BreedModal givePetInfo={givePetInfo} onConfirm={onConfirm} />,
		})
	}

	const onGoDetail = () => {
		router.push(`fusion/${givePetInfo._id}`)
	}

	return (
		<>
			<div className="flex flex-col items-center">
				<div
					className="flex flex-col items-center cursor-pointer w-full shadow rounded-xl"
					onClick={onGoDetail}>
					<div
						className={cn(
							'flex justify-center items-center relative',
							'h-[140px] w-full rounded-t-xl',
							'border border-[#C3DFD1] bg-[#DDF0E7]'
						)}>
						<Image
							src={AnimalImg}
							alt="egg"
							className="h-[130px] w-auto -mb-2"
						/>
						<Text className="text-xs px-1.5 py-0.5 rounded-full font-semibold absolute top-2 right-2 bg-green-400 text-white leading-3">
							{addressShorten(publicAddress, 4, 4)}
						</Text>
					</div>
					<div className="p-2 w-full flex flex-col gap-2">
						<div>
							<div className="flex gap-1 flex-col">
								<div className="flex items-center gap-1 justify-between">
									<Text
										className={cn(
											'font-medium uppercase text-xs px-1.5 py-0.5 rounded-full text-white bg-sky-500'
										)}>
										{rarity}
									</Text>
									<div className="text-sm font-semibold">
										{givePetInfo.fusion?.amount} SUI
									</div>
								</div>
								<Button
									size="sm"
									variant="outline"
									className="bg-[#F4FCF8] h-7 px-3 disabled:border-gray-400 disabled:text-gray-400"
									onClick={(e) => {
										e.stopPropagation()
										onOpenBreedModal()
									}}
									disabled={
										disabled ||
										givePetInfo.publicAddress ===
											receivePetInfo.publicAddress ||
										receivePetInfo.fusion?.matchingPetId?.includes(
											givePetInfo._id
										)
									}>
									Breed
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isSuccess ? (
				<FusionEggSuccessModal
					eggInfo={eggInfo}
					onClose={() => setSuccess(false)}
				/>
			) : null}
		</>
	)
}

export default FusionItem
