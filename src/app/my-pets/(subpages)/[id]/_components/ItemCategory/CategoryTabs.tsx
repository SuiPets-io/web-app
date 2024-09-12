'use client'
import {
	BathroomIcon,
	EntertainmentIcon,
	FoodIcon,
	ReferralIcon,
	StarsIcon,
} from '@/components/ui'
import { PET_STAGE, PET_STATUS } from '@/constants'
import { cn } from '@/utils'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import ItemList from '../../../_components/ItemCategory/ItemList'
import ReferralTab from '../../../_components/ItemCategory/ReferralTab'
import TabContent from '../../../_components/ItemCategory/TabContent'
import TabItem from '../../../_components/ItemCategory/TabItem'
import useGetPriceConfig from '../../../_hooks/useGetPriceConfig'
import {
	isBuyingItemAtom,
	petDetailAtom,
	petStageAtom,
} from '../../_store/petDetailAtom'
import ActionsTab from './ActionsTab'

const CategoryTabs = () => {
	const stage = useAtomValue(petStageAtom)
	const petInfo = useAtomValue(petDetailAtom)
	const { data: itemConfig } = useGetPriceConfig()
	const isBuyingItem = useAtomValue(isBuyingItemAtom)

	const renderedData = useMemo(() => {
		return [
			{
				tabId: 'food-items',
				icon: (props: any) => <FoodIcon {...props} />,
				component: (
					<ItemList
						data={itemConfig?.foodConfig || []}
						disabled={
							!(
								stage === 'hungry' ||
								(stage === 'sick' && petInfo?.stage === PET_STAGE.EAT)
							) ||
							isBuyingItem ||
							petInfo?.status !== PET_STATUS.PET
						}
					/>
				),
			},
			{
				tabId: 'bathroom-items',
				icon: (props: any) => <BathroomIcon {...props} />,
				component: (
					<ItemList
						data={itemConfig?.toiletConfig || []}
						disabled={
							!(
								stage === 'dirty' ||
								(stage === 'sick' && petInfo?.stage === PET_STAGE.TOILET)
							) ||
							isBuyingItem ||
							petInfo?.status !== PET_STATUS.PET
						}
					/>
				),
			},
			{
				tabId: 'entertainment-items',
				icon: (props: any) => <EntertainmentIcon {...props} />,
				component: (
					<ItemList
						data={itemConfig?.entertainmentConfig || []}
						disabled={
							!(
								stage === 'sad' ||
								(stage === 'sick' && petInfo?.stage === PET_STAGE.ENTERTAINMENT)
							) ||
							isBuyingItem ||
							petInfo?.status !== PET_STATUS.PET
						}
					/>
				),
			},
			{
				tabId: 'actions',
				icon: (props: any) => <StarsIcon {...props} />,
				component: <ActionsTab petInfo={petInfo} />,
			},
			{
				tabId: 'referral',
				icon: (props: any) => <ReferralIcon {...props} />,
				component: <ReferralTab />,
			},
		]
	}, [
		isBuyingItem,
		itemConfig?.entertainmentConfig,
		itemConfig?.foodConfig,
		itemConfig?.toiletConfig,
		petInfo,
		stage,
	])

	const [selectedTab, setSelectedTab] = useState<string>(
		renderedData[0]?.tabId || 'food-items'
	)

	return (
		<div className="w-full h-full -mt-16">
			<div className="flex gap-3 items-end px-4 z-0">
				{renderedData.map((item) => (
					<TabItem
						key={item.tabId}
						active={selectedTab === item.tabId}
						onClick={() => setSelectedTab(item.tabId)}>
						{item.icon({
							className: cn(
								selectedTab === item.tabId
									? 'fill-green-600 h-[30px] w-auto'
									: 'fill-white h-[25px] w-auto'
							),
						})}
					</TabItem>
				))}
			</div>
			<TabContent>
				{renderedData.find((item) => item.tabId === selectedTab)?.component}
			</TabContent>
		</div>
	)
}

export default CategoryTabs
