import MedalImg from '@/assets/images/svg/medal.svg'
import { Text } from '@/components/ui'
import { AVATAR_COLORS } from '@/constants'
import { addressShorten, balanceDisplayer } from '@/utils'
import Avatar from 'boring-avatars'
import Image from 'next/image'

export interface ILeaderboardUser {
	rank: number
	publicAddress: string
	seasonNumber: number
	seasonType: string
	pps: number
}

const UserItem = ({
	rank,
	publicAddress,
	pps,
}: {
	rank: number
	publicAddress: string
	pps: number
}) => {
	return (
		<div className="flex flex-col items-center gap-2 h-full w-1/3">
			{rank !== 1 && (
				<Text className="text-green-[#13D4A3] text-stroke-green-800 font-bold text-xl leading-5 tracking-tighter">
					{rank}
				</Text>
			)}

			<div className="border-[2px] border-green-500 rounded-full relative">
				{rank === 1 && (
					<Image
						src={MedalImg}
						alt="medal"
						className="w-8 h-8 absolute -top-4 left-1/2 -translate-x-1/2"
					/>
				)}
				<Avatar
					size={rank !== 1 ? 60 : 80}
					name={publicAddress}
					variant="marble"
					colors={AVATAR_COLORS}
				/>
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
	)
}

const Top3Users = ({ data }: { data: ILeaderboardUser[] }) => {
	return data.length ? (
		<div className="flex gap-2 mt-6 items-end w-full justify-center">
			{data[2] && <UserItem {...data[2]} />}
			{data[0] && <UserItem {...data[0]} />}
			{data[1] && <UserItem {...data[1]} />}
		</div>
	) : null
}

export default Top3Users
