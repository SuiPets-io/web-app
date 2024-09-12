import { Text } from '@/components/ui'
import { ORIGIN } from '@/constants'
import { RecentSoldItemType } from '@/external/api/egg/get-recent-sold'
import { cn } from '@/utils'
import { getEggAsset } from '@/utils/getAssets'
import { useRouter } from 'next-nprogress-bar'
import Image from 'next/image'

interface IEggItem {
	data: RecentSoldItemType
}

const EggItem = ({ data }: IEggItem) => {
	const router = useRouter()
	const { eggId, rarity, petType, price, origin } = data
	const EggImg = getEggAsset(petType, rarity)

	const onGoDetail = () => {
		router.push(`/marketplace/${eggId}`)
	}

	return (
		<div className="flex flex-col items-center cursor-pointer shadow rounded-xl bg-white">
			<div
				onClick={onGoDetail}
				className="flex flex-col items-center cursor-pointer w-full">
				<div
					className={cn(
						'flex justify-center items-center',
						'h-[176px] w-full rounded-t-xl',
						'bg-gradient-to-br from-[#F4FCF8] to-[#E1F5EB]',
						'shadow-[inset_0px_0px_8px_8px_rgba(5,150,105,0.1)] relative'
					)}>
					<Image
						src={EggImg}
						alt="egg"
						className={cn(
							'h-[112px] w-auto',
							origin === ORIGIN.GENESIS ? 'scale-125' : ''
						)}
					/>
					<Text className="text-xs px-1.5 py-0.5 rounded-full font-semibold absolute top-2 left-2 bg-red-400 text-white leading-3 italic">
						Sold
					</Text>
				</div>
				<div className="p-2 w-full flex flex-col gap-2">
					<div>
						<div className="flex gap-1 flex-col">
							<div className="flex items-center gap-1">
								<Text
									className={cn(
										'font-medium uppercase text-xs px-1.5 py-0.5 rounded-full text-white',
										origin === ORIGIN.GENESIS ? 'bg-orange-500' : 'bg-gray-500'
									)}>
									{origin}
								</Text>
								<Text
									className={cn(
										'font-medium uppercase text-xs px-1.5 py-0.5 rounded-full text-white bg-sky-500'
									)}>
									{rarity}
								</Text>
							</div>

							<div className="flex justify-between">
								<Text className="font-semibold capitalize text-green-500">
									{petType}
								</Text>
								<div className="text-sm font-semibold">{price} SUI</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EggItem
