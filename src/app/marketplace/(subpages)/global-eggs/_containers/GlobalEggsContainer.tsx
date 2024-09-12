'use client'

import MarketplaceTabs from '@/app/marketplace/_components/MarketplaceTabs'
import { Button } from '@/components/ui'
import { DEFAULT_PAGE_SIZE, EGG_ONSATE_STATUS } from '@/constants'
import { MarketItemType } from '@/external/api/egg/get-market'
import { useGlobalLoading } from '@/hooks'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import EggList from '../_components/EggList'
import GlobalEggsFilters from '../_components/GlobalEggsFilters'
import { filterParamsAtom } from '../_store/marketAtom'
import useGetGlobalEgg from '../hooks/useGetGlobalEggs'

const MysteryBoxContainer = () => {
	const [filterParams, setFilterParams] = useAtom(filterParamsAtom)

	const { data, isFetching, isSuccess } = useGetGlobalEgg({
		params: filterParams,
	})

	useGlobalLoading(isFetching)

	const onLoadMore = () =>
		setFilterParams((prev) => {
			prev.limit = (prev.limit || 0) + DEFAULT_PAGE_SIZE
		})

	const [renderData, setRenderData] = useState<MarketItemType[]>([])

	useEffect(() => {
		if (!isFetching) {
			if (data?.data && isSuccess) {
				setRenderData(data.data)
			} else {
				setRenderData([])
			}
		}
	}, [data?.data, isSuccess, isFetching])

	useEffect(() => {
		return () =>
			setFilterParams({
				offset: 0,
				limit: DEFAULT_PAGE_SIZE,
				status: [EGG_ONSATE_STATUS.ONSALE].join(','),
			})
	}, [setFilterParams])

	return (
		<div className="flex flex-col gap-6">
			<MarketplaceTabs />
			<div className="flex flex-col gap-2">
				<GlobalEggsFilters />
				<div className="h-[calc(100vh-200px)] overflow-auto px-4 pb-4">
					<EggList data={renderData} />
					<div className="w-full flex justify-center pt-2 pb-6 z-10">
						{data?.total &&
						filterParams.limit &&
						filterParams.limit < data.total ? (
							<Button loading={isFetching} onClick={onLoadMore}>
								{'Load More'}
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MysteryBoxContainer
