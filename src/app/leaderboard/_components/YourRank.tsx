import { Text } from '@/components/ui'
import { getLeaderboardOutput } from '@/external/api/pet/get-leaderboard'
import { balanceDisplayer } from '@/utils'

const YourRank = ({
	type,
	leaderboard,
}: {
	type: 'week' | 'month'
	leaderboard: getLeaderboardOutput
}) => {
	return (
		<div className="flex items-center gap-2 mt-4">
			<Text className="font-bold text-neutral-400 text-sm">Your Rank:</Text>
			<div className="flex items-center gap-1">
				<Text className="text-green-[#13D4A3] text-stroke-green-800 font-bold text-base leading-5 tracking-tighter">
					{(type === 'week'
						? leaderboard.myWeekRank
						: leaderboard.myMonthRank) + 1}
				</Text>
				<div className="flex gap-1">
					<Text className="text-[#F79857]">
						(
						{balanceDisplayer(
							type === 'week' ? leaderboard.myWeekPps : leaderboard.myMonthPps
						)}{' '}
						<b>PPS</b>)
					</Text>
				</div>
			</div>
		</div>
	)
}

export default YourRank
