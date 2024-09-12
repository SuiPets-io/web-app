import { useModal } from '@/components/molecules'
import { Button } from '@/components/ui'
import { EGG_STATUS, ORIGIN } from '@/constants'
import { EggType } from '@/external/api/egg/get-my-egg'
import { cn } from '@/utils'
import { getEggAsset } from '@/utils/getAssets'
import Image from 'next/image'
import Link from 'next/link'
import ListModal from './ListingModal/ListingModal'

const EggItem = ({ data }: { data: EggType }) => {
	const { status, petType, rarity, origin, isFree, _id } = data
	const { openModal } = useModal()

	const onOpenListModal = () => {
		openModal({
			view: <ListModal eggInfo={data} />,
		})
	}

	const onHandleClick = () => {
		onOpenListModal()
	}

	const eggImage = getEggAsset(petType, rarity)

	return (
		<div className="flex flex-col gap-4 items-center">
			<Link className="relative" href={`/marketplace/${_id}`}>
				<div className="relative w-full flex justify-center">
					<Image
						src={eggImage}
						alt={petType}
						className={cn(
							'w-[76px] h-[76px]',
							origin === ORIGIN.GENESIS ? 'scale-125' : ''
						)}
					/>
					{isFree ? (
						<span className="text-[8px] rounded-full px-1 py-0.5 bg-orange-500 text-white absolute bottom-0 right-0">
							Free
						</span>
					) : null}
				</div>
				<div className="flex flex-wrap gap-1 justify-center bg-white px-1.5 py-1 rounded-xl border border-green-500 max-w-[130px] h-10 overflow-auto">
					<p className={cn('px-1 py-0.5 rounded-full uppercase text-[8px] leading-[8px] text-white min-w-[40px] text-center',
						origin === ORIGIN.GENESIS ? 'bg-orange-500' : 'bg-gray-500'
					)}>
						{origin}
					</p>
					<p className="px-1 py-0.5 rounded-full bg-sky-500 uppercase text-[8px] leading-[8px] text-white min-w-[40px] text-center">
						{rarity}
					</p>
					<p className="px-1 py-0.5 rounded-full text-green-500 uppercase text-[8px] leading-[8px] bg-white border border-green-500 font-semibold min-w-[40px] text-center">
						{petType}
					</p>
				</div>
			</Link>
			{!isFree ? (
				<Button
					className="capitalize w-[53px] h-[21px] font-semibold text-xs"
					variant={status === EGG_STATUS.ACTIVE ? 'orange' : 'orange-outline'}
					onClick={onHandleClick}>
					{status === EGG_STATUS.ONSALE ? 'unlist' : 'list'}
				</Button>
			) : null}
		</div>
	)
}

export default EggItem
