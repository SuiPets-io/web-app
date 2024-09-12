import { Text } from '@/components/ui'
import { SaleHistoryItemType } from '@/external/api/egg/getEggDetail'
import { addressShorten, balanceDisplayer } from '@/utils'
import moment from 'moment'

const ActivityItem = (data: SaleHistoryItemType) => {
	return (
		<div className="flex flex-col gap-2 p-4 border-b border-green-500 last:border-none">
			<div className="grid grid-cols-2">
				<Text className="text-[#ACCABB] font-semibold text-[14px]">Buyer</Text>
				<Text className="text-[#ACCABB] font-normal text-[14px]">
					{addressShorten(data.buyer, 3, 3)}
				</Text>
			</div>
			<div className="grid grid-cols-2">
				<Text className="text-[#ACCABB] font-semibold text-[14px]">Seller</Text>
				<Text className="text-[#ACCABB] font-normal text-[14px]">
					{addressShorten(data.seller, 3, 3)}
				</Text>
			</div>
			<div className="grid grid-cols-2">
				<Text className="text-[#ACCABB] font-semibold text-[14px]">Amount</Text>
				<Text className="text-[#ACCABB] font-normal text-[14px]">
					{balanceDisplayer(data.price)} SUI
				</Text>
			</div>
			<div className="grid grid-cols-2">
				<Text className="text-[#ACCABB] font-semibold text-[14px]">
					TX Hash
				</Text>
				<Text className="text-[#ACCABB] font-normal text-[14px]">
					{addressShorten(data.txHash, 3, 4)}
				</Text>
			</div>
			<div className="grid grid-cols-2">
				<Text className="text-[#ACCABB] font-semibold text-[14px]">Date</Text>
				<Text className="text-[#ACCABB] font-normal text-[14px]">
					{moment(data.createdAt).format('DD/MM/YYYY')}
				</Text>
			</div>
		</div>
	)
}

export default ActivityItem
