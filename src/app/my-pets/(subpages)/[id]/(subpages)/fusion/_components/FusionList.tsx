import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { Button, Empty } from '@/components/ui'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { getPetDetailOutput } from '@/external/api/pet/get-detail-pet'
import { PetType } from '@/external/api/pet/get-my-pet'
import { useDiffTime, useGlobalLoading } from '@/hooks'
import { cn } from '@/utils'
import { useAtom } from 'jotai'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { filterParamsAtom } from '../_store/fusionAtom'
import useGetFusionList from '../hooks/useGetFusionList'
import CountdownTime from './CountdownTime'
import FusionItem from './FusionItem'

interface IFusionList {
	petInfo?: PetType
}

const FusionList = ({ petInfo }: IFusionList) => {
	const { data: petConfig } = useGetPetConfig()

	const [filterParams, setFilterParams] = useAtom(filterParamsAtom)

	const { data, isFetching, isSuccess } = useGetFusionList({
		params: filterParams,
	})

	useGlobalLoading(isFetching)

	useEffect(() => {
		if (petInfo) {
			setFilterParams((prev) => {
				prev.petType = petInfo.type
			})
		}
	}, [petInfo, setFilterParams])

	const onLoadMore = () =>
		setFilterParams((prev) => {
			prev.limit = (prev.limit || 0) + DEFAULT_PAGE_SIZE
		})

	const [renderData, setRenderData] = useState<getPetDetailOutput[]>([])

	useEffect(() => {
		if (!isFetching) {
			if (data?.data && isSuccess) {
				setRenderData(data.data)
			} else {
				setRenderData([])
			}
		}
	}, [data?.data, isSuccess, isFetching])

	const NoFusions = petInfo?.fusion?.numberEgg
		? petInfo.fusion.numberEgg > 9
			? 10
			: petInfo.fusion.numberEgg + 1
		: 1

	const maxDuration =
		(petInfo?.fusion?.numberEgg
			? petConfig?.timeToFusionInHour[NoFusions]
			: 0) || 0

	const nextTime = moment(petInfo?.fusion?.checkTime)
		.add(maxDuration, 'h')
		.toISOString()

	const { diffTime } = useDiffTime({ nextTime })

	return (
		<div className="py-4 bg-white h-1/2 overflow-auto">
			{petInfo?.fusion?.checkTime && diffTime ? (
				<div className="px-4 py-2 bg-white">
					<CountdownTime
						maxDuration={maxDuration}
						diffTime={diffTime}
						nextTime={nextTime}
					/>
				</div>
			) : null}
			{petInfo ? (
				<div
					className={cn(
						'h-[calc(100%-32px)] px-4',
						petInfo?.fusion?.checkTime ? 'h-[calc(100%-80px)]' : ''
					)}>
					{renderData.length ? (
						<>
							<div className="grid grid-cols-2 gap-4">
								{renderData.map((item) => (
									<FusionItem
										key={item._id}
										givePetInfo={item}
										receivePetInfo={petInfo}
										disabled={!!(diffTime && diffTime > 0)}
									/>
								))}
							</div>
							<div className="w-full flex justify-center pt-2 pb-6 z-10">
								{data?.total &&
								filterParams.limit &&
								filterParams.limit < data.total ? (
									<Button loading={isFetching} onClick={onLoadMore}>
										{'Load More'}
									</Button>
								) : null}
							</div>
						</>
					) : (
						<div className="flex h-full items-center w-full justify-center">
							<Empty text={'No data'} />
						</div>
					)}
				</div>
			) : null}
		</div>
	)
}

export default FusionList
