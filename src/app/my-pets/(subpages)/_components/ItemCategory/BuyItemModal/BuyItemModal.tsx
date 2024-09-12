import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { useModal } from '@/components/molecules'
import { Form, Text } from '@/components/ui'
import { useGlobalLoading } from '@/hooks'
import { cn } from '@/utils'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import useBuyItem from '../../../[id]/_hooks/useBuyItem'
import { TItem } from '../../../_store/types'
import BuyItemFields from './BuyItemFields'
import { BuyItemSchema, TBuyItem } from './BuyItemSchema'

const BuyItemModal = ({
	itemInfo,
	currentItemQuantity,
}: {
	itemInfo: TItem
	currentItemQuantity: number
}) => {
	const { data: petConfig } = useGetPetConfig()

	const SUIfee = petConfig?.buyItemFeeInSui

	const { id } = useParams<{ id: string }>()

	const { closeModal } = useModal()

	const onSuccess = () => closeModal()

	const { mutate: buyItem, isLoading } = useBuyItem({ onSuccess })

	useGlobalLoading(isLoading)

	const onSubmit: SubmitHandler<TBuyItem> = async (data) => {
		if (SUIfee) {
			buyItem({
				amount: data.itemNumber * SUIfee,
				itemNumber: data.itemNumber,
				itemName: itemInfo.name,
				petId: id,
			})
		}
	}

	return (
		<div
			data-vaul-no-drag
			className="flex flex-col gap-4 px-4 pb-4 items-center">
			<div className="flex gap-2 items-center">
				<div className="relative h-fit">
					<Image
						src={itemInfo.image}
						alt={itemInfo.name}
						className="h-[50px] w-auto"
						width={50}
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
				<div className="flex flex-col gap-1">
					<Text className="text-sm leading-5 capitalize font-semibold">
						{itemInfo.name}
					</Text>
					<div className="border border-green-500 bg-white px-2 py-1 uppercase rounded-full text-xs text-green-500">
						{itemInfo.price} PPS
					</div>
				</div>
			</div>
			<Form
				validationSchema={BuyItemSchema}
				onSubmit={onSubmit}
				useFormProps={{
					defaultValues: {
						itemNumber: 0,
					},
				}}
				className="w-full flex flex-col gap-4">
				<BuyItemFields itemInfo={itemInfo} />
			</Form>
		</div>
	)
}

export default BuyItemModal
