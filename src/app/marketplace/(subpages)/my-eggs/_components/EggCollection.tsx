import { EggType } from '@/external/api/egg/get-my-egg'
import EggItem from './EggItem'

const EggCollection = ({ data }: { data: EggType[] }) => {
	return (
		<div className="relative grid grid-cols-3 gap-3">
			{data.map((item: any) => (
				<EggItem key={item.id} data={item} />
			))}
		</div>
	)
}

export default EggCollection
