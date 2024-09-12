import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { useParams } from 'next/navigation'
import useGetPetDetail from '../../[id]/_hooks/useGetPetDetail'
import { TItem } from '../../_store/types'
import ItemCard from './ItemCard'

const ItemList = ({
	data,
	disabled,
}: {
	data: TItem[]
	disabled?: boolean
}) => {
	const { id } = useParams<{ id: string }>()
	const { data: petInfo } = useGetPetDetail({ petId: id })
	const { data: petConfig } = useGetPetConfig()

	const ableRenderedItems =
		petConfig?.levelMapItem && petInfo?.level !== undefined
			? petConfig.levelMapItem[petInfo.level]
			: []

	return (
		<div className="grid grid-cols-3 gap-3">
			{data.map(
				(item) =>
					ableRenderedItems?.includes(item.name) && (
						<ItemCard key={item.name} itemInfo={item} disabled={disabled} />
					)
			)}
		</div>
	)
}

export default ItemList
