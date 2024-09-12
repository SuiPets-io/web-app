import { Empty } from '@/components/ui'
import { MarketItemType } from '@/external/api/egg/get-market'
import EggItem from './EggItem'

const EggList = ({ data }: { data: MarketItemType[] }) => {
	return data.length ? (
		<div className="grid grid-cols-2 gap-4">
			{data.map((item) => (
				<EggItem key={item._id} data={item} />
			))}
		</div>
	) : (
		<div className="flex h-full items-center w-full justify-center">
			<Empty text={'No data'} />
		</div>
	)
}

export default EggList
