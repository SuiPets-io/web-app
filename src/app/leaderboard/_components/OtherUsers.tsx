import { Text } from '@/components/ui'
import { AVATAR_COLORS } from '@/constants'
import { addressShorten, balanceDisplayer } from '@/utils'
import Avatar from 'boring-avatars'
import { Children } from 'react'
import { ILeaderboardUser } from './Top3Users'

const UserItem = ({ rank, publicAddress, pps }: ILeaderboardUser) => {
	return (
		<div className="border border-[#A2F0A6] shadow bg-white px-6 py-2 flex justify-between items-center gap-2 rounded-lg">
			<div className="flex gap-4 items-center">
				<div className="border-[2px] border-green-500 rounded-full relative">
					{publicAddress ? (
						<Avatar
							size={48}
							name={publicAddress}
							variant="marble"
							colors={AVATAR_COLORS}
						/>
					) : null}
				</div>
				<div>
					<Text className="text-green-500 font-semibold">
						{addressShorten(publicAddress, 5, 4)}
					</Text>
					<div className="flex gap-1">
						<Text className="text-[#F79857]">{balanceDisplayer(pps)}</Text>
						<Text className="text-[#F79857] font-bold">PPS</Text>
					</div>
				</div>
			</div>
			<Text className="text-green-[#13D4A3] text-stroke-green-800 font-bold text-xl leading-5 tracking-tighter">
				{rank}
			</Text>
		</div>
	)
}

const OtherUsers = ({ data }: { data: ILeaderboardUser[] }) => {
	return data.length ? (
		<div className="border-[2px] border-b-0 border-[#009E87] rounded-t-3xl p-4 bg-[#F4FCF8] flex flex-col overflow-auto gap-2 mt-6 h-full max-h-[calc(100vh-320px)]">
			{Children.toArray(data.map((item) => <UserItem {...item} />))}
		</div>
	) : null
}

export default OtherUsers
