'use client'
import { useGlobalLoading } from '@/hooks'
import { useParams } from 'next/navigation'
import ActivityList from '../_components/ActivityList'
import BasicPetInfo from '../_components/BasicPetInfo'
import useGetFusionHistory from '../hooks/useGetFusionHistory'

const FusionHistoryContainer = () => {
	const { fusionPetId } = useParams<{ fusionPetId: string }>()
	const { data, isLoading } = useGetFusionHistory({ petId: fusionPetId })

	useGlobalLoading(isLoading)

	return data ? (
		<div className="flex flex-col gap-6 h-[calc(100vh-100px)] px-4 pb-4 overflow-auto">
			<BasicPetInfo {...data} />
			<ActivityList data={data?.fusionHistory} />
		</div>
	) : null
}

export default FusionHistoryContainer
