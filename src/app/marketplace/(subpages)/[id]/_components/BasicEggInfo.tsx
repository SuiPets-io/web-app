import { useModal } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { EGG_STATUS, ORIGIN } from '@/constants'
import { getEggDetailOutput } from '@/external/api/egg/getEggDetail'
import { useAccount } from '@/hooks'
import { addressShorten, cn } from '@/utils'
import { getEggAsset } from '@/utils/getAssets'
import Image from 'next/image'
import BuyEggModal from '../../global-eggs/_components/BuyEggModal'
import ListModal from '../../my-eggs/_components/ListingModal/ListingModal'

const BasicEggInfo = (props: getEggDetailOutput) => {
	const {
		rarity,
		petType,
		publicAddress,
		price,
		status,
		_id: eggId,
		origin,
		isFree,
	} = props
	const { address } = useAccount()
	const EggImg = getEggAsset(petType, rarity)

	const { openModal } = useModal()

	const onOpenListModal = () => {
		openModal({
			view: <ListModal eggInfo={props} />,
		})
	}

	const onOpenBuyModal = () => {
		openModal({
			view: <BuyEggModal eggInfo={{ ...props, eggId }} />,
		})
	}

	return (
		<div className="grid grid-cols-2 gap-4 items-end">
			<div
				className={cn(
					'flex justify-center items-center',
					'h-[176px] w-full rounded-xl',
					'bg-gradient-to-br from-[#F4FCF8] to-[#E1F5EB]',
					'shadow-[inset_0px_0px_8px_8px_rgba(5,150,105,0.1)] relative border border-[#17D7A6] overflow-hidden'
				)}>
				<Image
					src={EggImg}
					alt="egg"
					className={cn(
						'h-[112px] w-auto object-cover',
						origin === ORIGIN.GENESIS ? 'scale-125' : ''
					)}
				/>
			</div>
			<div>
				<div className="flex gap-0.5 flex-col">
					<Text className="font-bold capitalize text-green-500 mt-2">
						{petType}
					</Text>
					<div className="flex gap-1">
						<p
							className={cn(
								'px-1 py-0.5 rounded-full uppercase text-xs text-white min-w-[40px] text-center',
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

				{price ? (
					<div className="flex justify-between mt-2">
						<Text>Price:</Text>
						<Text className="font-semibold">{price} SUI</Text>
					</div>
				) : null}

				{status === EGG_STATUS.ONSALE ? (
					<>
						{' '}
						{address !== publicAddress ? (
							<Button
								size="sm"
								variant="outline"
								className="bg-[#F4FCF8] h-7 px-3 mt-2 min-w-[120px] w-full"
								disabled={address === publicAddress}
								onClick={onOpenBuyModal}>
								Buy
							</Button>
						) : null}
						{address === publicAddress ? (
							<Button
								size="sm"
								variant="orange-outline"
								className="h-7 px-3 mt-2 min-w-[120px] w-full"
								onClick={onOpenListModal}>
								Unlist
							</Button>
						) : null}
					</>
				) : null}
				{status === EGG_STATUS.ACTIVE &&
				address === publicAddress &&
				!isFree ? (
					<Button
						size="sm"
						variant="orange"
						className="h-7 px-3 mt-2 min-w-[120px] w-full"
						onClick={onOpenListModal}>
						List
					</Button>
				) : null}
			</div>
		</div>
	)
}

export default BasicEggInfo
