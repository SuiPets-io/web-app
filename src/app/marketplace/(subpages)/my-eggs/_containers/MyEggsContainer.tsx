'use client'

import MarketplaceTabs from '@/app/marketplace/_components/MarketplaceTabs'
import { Button } from '@/components/ui'
import { DEFAULT_PAGE_SIZE, EGG_STATUS } from '@/constants'
import { EggType } from '@/external/api/egg/get-my-egg'
import { useGlobalLoading } from '@/hooks'
import { cn } from '@/utils'
import { useEffect, useState } from 'react'
import EggCollection from '../_components/EggCollection'
import WoodBars from '../_components/WoodBars'
import useGetMyEgg from '../_hooks/useGetMyEggs'

const MyEggsContainer = () => {
	const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE)

	const { data, isFetching, isSuccess } = useGetMyEgg({
		params: {
			offset: 0,
			limit,
			status: [EGG_STATUS.ACTIVE, EGG_STATUS.ONSALE].join(','),
		},
	})

	useGlobalLoading(isFetching)

	const onLoadMore = () => setLimit((prev) => prev + DEFAULT_PAGE_SIZE)

	const [renderData, setRenderData] = useState<EggType[]>([])

	useEffect(() => {
		if (!isFetching) {
			if (data?.data && isSuccess) {
				setRenderData(data.data)
			} else {
				setRenderData([])
			}
		}
	}, [data?.data, isSuccess, isFetching])

	return (
		<div className="flex flex-col gap-6">
			<MarketplaceTabs />
			<div className="px-4">
				<div
					className={cn(
						'h-[calc(100vh-160px)] rounded-xl w-full overflow-auto',
						'bg-gradient-to-br from-[#F4FCF8] to-[#E1F5EB] border-[2px] border-[#17D7A6]',
						'shadow-[inset_0px_0px_16px_16px_rgba(5,150,105,0.3)] relative'
					)}>
					<>
						<div className="my-6 relative">
							<WoodBars length={renderData.length || 0} />
							<EggCollection data={renderData || []} />
						</div>
						<div className="w-full flex justify-center pt-2 pb-6 z-10">
							{data?.total && limit < data?.total ? (
								<Button loading={isFetching} onClick={onLoadMore}>
									{'Load More'}
								</Button>
							) : null}
						</div>
					</>
				</div>
			</div>
		</div>
	)
}

export default MyEggsContainer
