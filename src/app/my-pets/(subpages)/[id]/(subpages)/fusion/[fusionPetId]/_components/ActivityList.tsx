import { Empty, Text } from '@/components/ui'
import { FusionHistoryItemType } from '@/external/api/pet/getFusionDetail'
import ActivityItem from './ActivityItem'

const ActivityList = ({ data }: { data: FusionHistoryItemType[] }) => {
	return (
		<div className="border border-green-500 rounded-3xl bg-[#F4FCF8] py-4 h-full overflow-auto">
			<Text className="font-bold text-base text-green-500 px-4">Activity</Text>
			<div className="w-full h-full">
				{data.length ? (
					data.map((item) => <ActivityItem key={item.txHash} {...item} />)
				) : (
					<div className="h-full w-full items-center justify-center flex">
						<Empty text={'No Data'} />
					</div>
				)}
			</div>
		</div>
	)
}

export default ActivityList
