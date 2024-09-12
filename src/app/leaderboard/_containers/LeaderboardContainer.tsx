'use client'
import GameBg from '@/assets/images/background/game-bg.png'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useState } from 'react'
import OtherUsers from '../_components/OtherUsers'
import SelectTypeButtons from '../_components/SelectTypeButtons'
import Top3Users from '../_components/Top3Users'
import YourRank from '../_components/YourRank'
import useGetLeaderboard from '../_hooks/getLeaderboard'

const LeaderBoardContainer = () => {
	const [type, setType] = useState<'week' | 'month'>('week')

	const { data: leaderboard } = useGetLeaderboard()
	if (isEmpty(leaderboard)) {
		return null
	}

	return (
		<div className="w-full h-full relative">
			<div className="absolute top-0 left-0 w-full h-full">
				<div className="w-full h-full bg-white/50 absolute top-0 left-0 backdrop-blur-md" />
				<Image
					className="top-0 left-0 w-full h-auto object-cover"
					src={GameBg}
					alt="bg"
				/>
			</div>
			<div className="relative flex flex-col w-full h-full pt-[100px]">
				<div className="px-4">
					<SelectTypeButtons selectedType={type} onSetType={setType} />
					<YourRank type={type} leaderboard={leaderboard} />
					<Top3Users
						data={
							type === 'week'
								? leaderboard.weekLeaderBoard
										.slice(0, 3)
										.map((item, index) => ({ ...item, rank: ++index }))
								: leaderboard.monthLeaderBoard
										.slice(0, 3)
										.map((item, index) => ({ ...item, rank: ++index }))
						}
					/>
				</div>
				<OtherUsers
					data={
						type === 'week'
							? leaderboard.weekLeaderBoard
									.slice(3, leaderboard.weekLeaderBoard.length)
									.map((item, index) => ({ ...item, rank: index + 4 }))
							: leaderboard.monthLeaderBoard
									.slice(3, leaderboard.monthLeaderBoard.length)
									.map((item, index) => ({ ...item, rank: index + 4 }))
					}
				/>
			</div>
		</div>
	)
}

export default LeaderBoardContainer
