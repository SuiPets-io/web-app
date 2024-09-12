import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const LeaderboardContainer = dynamic(
	() => import('./_containers/LeaderboardContainer'),
	{
		ssr: false,
	}
)

export default function LeaderboardPage() {
	return (
		<MainLayout title="Leaderboard" isSubPage backRoute="/my-pets">
			<div className="flex flex-col bg-green-200 w-full h-[100vh] max-h-[calc(100vh)]">
				<LeaderboardContainer />
			</div>
		</MainLayout>
	)
}
