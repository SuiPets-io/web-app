import { useModal } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { PET_ITEM_TYPE } from '@/constants'
import { useGlobalLoading, useProfile } from '@/hooks'
import { balanceDisplayer, cn, shortenNumber } from '@/utils'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import useCarePet from '../../[id]/_hooks/useCarePet'
import { petStageAtom } from '../../[id]/_store/petDetailAtom'
import { TItem } from '../../_store/types'
import BuyItemModal from './BuyItemModal/BuyItemModal'

interface IITemCard {
	itemInfo: TItem
	disabled?: boolean
}

const ItemCard = ({ itemInfo, disabled }: IITemCard) => {
	const { id } = useParams<{ id: string }>()
	const { image, price, name, type } = itemInfo
	const { openModal } = useModal()
	const setStage = useSetAtom(petStageAtom)
	const { data: userInfo } = useProfile()

	const currentItemQuantity = useMemo(() => {
		return (userInfo?.items && userInfo.items[name]) || 0
	}, [name, userInfo?.items])

	const onSuccess = useCallback(() => {
		if (type === PET_ITEM_TYPE.FOOD) {
			setStage('eat')
			setTimeout(() => setStage('normal'), 5000)
			return
		}

		if (type === PET_ITEM_TYPE.TOILET) {
			setStage('toilet')
			setTimeout(() => setStage('normal'), 5000)
			return
		}

		if (type === PET_ITEM_TYPE.ENTERTAINMENT) {
			setStage('funny')
			setTimeout(() => setStage('normal'), 5000)
			return
		}
	}, [setStage, type])

	const { mutate: onCarePet, isPending } = useCarePet({ onSuccess })

	useGlobalLoading(isPending)

	const onClickCarePet = () => {
		onCarePet({ name: itemInfo.name, petId: id })
	}

	const onOpenBuyItemModal = () => {
		openModal({
			view: (
				<BuyItemModal
					itemInfo={itemInfo}
					currentItemQuantity={currentItemQuantity}
				/>
			),
		})
	}

	const formattedPrice = userInfo
		? balanceDisplayer(shortenNumber(price, 5)[0], 4) +
			shortenNumber(price, 5)[1]
		: 0

	return (
		<>
			<div className="flex flex-col gap-2 border border-[#C3DFD1] bg-[#DDF0E7] px-2 py-2 rounded-[10px]">
				<div className="relative w-full flex gap-2 items-center">
					<div className="relative">
						<Image
							src={image}
							alt={name}
							className="h-[40px] w-auto max-w-[40px]"
							width={30}
							height={50}
						/>
						<Text
							className={cn(
								'absolute bottom-0 right-0 px-1 py-0.5 rounded-full bg-green-400',
								'text-[8px] leading-[8px] font-medium text-white'
							)}>
							x{currentItemQuantity}
						</Text>
					</div>
					<div className="flex flex-col gap-1 items-start">
						<Text className="text-xs capitalize font-medium">{name}</Text>
						<div className="uppercase text-xs text-green-500">
							{formattedPrice} PPS
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<Button
						size="sm"
						variant="orange"
						className="h-6"
						disabled={currentItemQuantity === 0 || disabled}
						onClick={onClickCarePet}>
						Use
					</Button>
					<Button
						variant="orange-outline"
						size="sm"
						className="h-6"
						onClick={onOpenBuyItemModal}>
						Buy
					</Button>
				</div>
			</div>
		</>
	)
}

export default ItemCard
