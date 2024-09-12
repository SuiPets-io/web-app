import FusionBg from '@/assets/images/background/fusion-bg.png'
import { useModal } from '@/components/molecules'
import { Button, HistoryIcon, Text } from '@/components/ui'
import { PetType } from '@/external/api/pet/get-my-pet'
import { getAnimalAsset } from '@/utils/getAssets'
import Image from 'next/image'
import Link from 'next/link'
import GlobalEggsFilters from './GlobalEggsFilters'
import RegisterFusionModal from './RegisterFusionModal/RegisterFusionModal'

interface IMyPet {
	petInfo?: PetType
}

const MyPet = ({ petInfo }: IMyPet) => {
	const AnimalImg =
		petInfo?.type &&
		petInfo?.rarity &&
		petInfo.origin &&
		getAnimalAsset(petInfo.type, petInfo.rarity, petInfo.origin)
	const { openModal } = useModal()

	const onOpenRegisterFusion = () => {
		if (petInfo) {
			openModal({
				view: <RegisterFusionModal petInfo={petInfo} />,
			})
		}
	}

	return (
		<div className="relative h-1/2 w-full pt-16">
			<Image
				src={FusionBg}
				alt="fusion"
				className="w-full h-full object-cover absolute top-0 left-0"
			/>
			<Link
				href={`fusion/${petInfo?._id}`}
				className="absolute z-[50] top-14 right-4">
				<HistoryIcon className="fill-gray-800" />
			</Link>
			<div className="grid grid-cols-2 relative w-full h-[calc(100%-50px)]">
				<div className="flex flex-col gap-2 justify-center px-4 py-2 border border-green-500 bg-white rounded-2xl h-fit w-fit m-auto shadow">
					{petInfo?.fusion?.amount ? (
						<div className="flex justify-between gap-4">
							<Text className="font-semibold text-gray-800">Price:</Text>
							<Text className="font-semibold text-gray-800">
								{petInfo?.fusion?.amount} SUI
							</Text>
						</div>
					) : null}
					<Button
						variant={petInfo?.fusion?.isGiveMode ? 'orange-outline' : 'orange'}
						onClick={onOpenRegisterFusion}>
						{petInfo?.fusion?.isGiveMode ? 'Cancel' : 'Register'}
					</Button>
				</div>
				<div className="flex items-center h-full w-full">
					{AnimalImg ? (
						<Image
							src={AnimalImg}
							alt={petInfo.type || ''}
							className="h-[100%] w-auto object-cover"
						/>
					) : null}
				</div>
			</div>
			<div className="relative">
				<GlobalEggsFilters />
			</div>
		</div>
	)
}

export default MyPet
