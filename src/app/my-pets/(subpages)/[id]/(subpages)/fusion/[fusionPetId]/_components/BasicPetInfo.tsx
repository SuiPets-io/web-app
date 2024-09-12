import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { useModal } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { EggType } from '@/external/api/egg/get-my-egg'
import { getFusionDetailOutput } from '@/external/api/pet/getFusionDetail'
import { useAccount, useDiffTime } from '@/hooks'
import { addressShorten, cn } from '@/utils'
import { getAnimalAsset } from '@/utils/getAssets'
import moment from 'moment'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useGetPetDetail from '../../../../_hooks/useGetPetDetail'
import BreedModal from '../../_components/BreedModal'
import FusionEggSuccessModal from '../../_components/FusionEggSuccessModal'
import RegisterFusionModal from '../../_components/RegisterFusionModal/RegisterFusionModal'
import useFusion from '../../hooks/useFusion'
import {ORIGIN} from '@/constants'

const BasicPetInfo = (props: getFusionDetailOutput) => {
	const { id } = useParams<{ id: string }>()
	const { rarity, type, publicAddress, fusion, origin } = props
	const { address } = useAccount()
	const PetImg = type ? getAnimalAsset(type, rarity, origin) : ''
	const { data: receivePetInfo } = useGetPetDetail({ petId: id })

	const [isSuccess, setSuccess] = useState(false)
	const [eggInfo, setEggInfo] = useState<EggType | null>(null)

	const { openModal, closeModal } = useModal()

	const onOpenRegisterFusionModal = () => {
		openModal({
			view: <RegisterFusionModal petInfo={props} />,
		})
	}

	const onSuccess = (data: EggType) => {
		closeModal()
		setSuccess(true)
		setEggInfo(data)
	}

	const { mutate: onBreed } = useFusion({
		params: {
			receivePetId: receivePetInfo?._id || '',
			givePetId: props._id,
			publicAddress: address || '',
		},
		onSuccess,
	})

	const onConfirm = () => {
		if (props.fusion?.amount) {
			onBreed({ amount: props.fusion?.amount })
		}
	}

	const onOpenBreedModal = () => {
		openModal({
			view: <BreedModal givePetInfo={props} onConfirm={onConfirm} />,
		})
	}

	const { data: petConfig } = useGetPetConfig()

	const NoFusions = receivePetInfo?.fusion?.numberEgg
		? receivePetInfo.fusion.numberEgg > 9
			? 10
			: receivePetInfo.fusion.numberEgg + 1
		: 1

	const maxDuration =
		(receivePetInfo?.fusion?.numberEgg
			? petConfig?.timeToFusionInHour[NoFusions]
			: 0) || 0

	const nextTime = moment(receivePetInfo?.fusion?.checkTime)
		.add(maxDuration, 'h')
		.toISOString()

	const { diffTime } = useDiffTime({ nextTime })

	return (
		<>
			<div className="grid grid-cols-2 gap-4 items-end">
				<div
					className={cn(
						'flex justify-center items-center',
						'h-[176px] w-full rounded-xl',
						'bg-gradient-to-br from-[#F4FCF8] to-[#E1F5EB]',
						'shadow-[inset_0px_0px_8px_8px_rgba(5,150,105,0.1)] relative border border-[#17D7A6] overflow-hidden'
					)}>
					<Image
						src={PetImg}
						alt="egg"
						className="h-[160px] w-auto object-cover scale-110"
					/>
				</div>
				<div>
					<div className="flex flex-col gap-0.5">
						<Text className="font-bold capitalize text-green-500 mt-2">
							{type}
						</Text>
						<div className="flex gap-1">
							<p className={cn('px-1 py-0.5 rounded-full uppercase text-xs text-white min-w-[40px] text-center',
								origin === ORIGIN.GENESIS ? 'bg-orange-500' : 'bg-gray-500'
							)}>
								{origin}
							</p>
							<p className="px-1 py-0.5 rounded-full bg-sky-500 uppercase text-xs text-white min-w-[40px] text-center">
								{rarity}
							</p>
						</div>
						<Text className="font-semibold text-green-400">
							{addressShorten(publicAddress, 4, 4)}
						</Text>
					</div>
					{fusion?.amount ? (
						<div className="flex justify-between mt-2">
							<Text>Price:</Text>
							<Text className="font-semibold">{fusion?.amount} SUI</Text>
						</div>
					) : null}
					{fusion?.isGiveMode ? (
						<>
							{address !== publicAddress ? (
								<Button
									size="sm"
									variant="outline"
									className="bg-[#F4FCF8] h-7 px-3 mt-2 min-w-[120px] w-full"
									onClick={onOpenBreedModal}
									disabled={
										!!(diffTime && diffTime > 0) ||
										receivePetInfo?.fusion?.matchingPetId?.includes(props?._id)
									}>
									Breed
								</Button>
							) : null}
							{address === publicAddress ? (
								<Button
									size="sm"
									variant="orange-outline"
									className="h-7 px-3 mt-2 min-w-[120px] w-full"
									onClick={onOpenRegisterFusionModal}>
									Cancel
								</Button>
							) : null}
						</>
					) : null}
					{!fusion?.isGiveMode && address === publicAddress ? (
						<Button
							size="sm"
							variant="orange"
							className="h-7 px-3 mt-2 w-[120px]"
							onClick={onOpenRegisterFusionModal}>
							Register
						</Button>
					) : null}
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

export default BasicPetInfo
