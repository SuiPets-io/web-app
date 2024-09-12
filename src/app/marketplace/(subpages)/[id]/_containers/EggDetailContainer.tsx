'use client'
import { useGlobalLoading } from '@/hooks'
import { useParams } from 'next/navigation'
import ActivityList from '../_components/ActivityList'
import BasicEggInfo from '../_components/BasicEggInfo'
import useGetEggDetail from '../hooks/useGetEggDetail'

const EggDetailContainer = () => {
	const { id } = useParams<{ id: string }>()
	const { data, isLoading } = useGetEggDetail({ eggId: id })

	useGlobalLoading(isLoading)

	return data ? (
		<div className="flex flex-col gap-6 h-[calc(100vh-100px)] px-4 pb-4 overflow-auto">
			<BasicEggInfo {...data} />
			<ActivityList data={data?.saleHistory} />
		</div>
	) : null
}

export default EggDetailContainer
