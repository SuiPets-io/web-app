import { useProfile } from '@/hooks'
import PPSBalance from './PPSBalance'
import SUIBalance from './SUIBalance'

const BalanceInfo = () => {
	const { data: userInfo } = useProfile()

	return userInfo ? (
		<div className="flex items-center gap-1">
			<SUIBalance />
			<PPSBalance />
		</div>
	) : null
}

export default BalanceInfo
