import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const GamePlayContainer = dynamic(
	() => import('./_containers/GamePlayContainer'),
	{
		ssr: false,
	}
)

export default function Wallet() {
	return (
		<MainLayout title="" isSubPage backRoute="/my-pets">
			<div className="flex flex-col bg-green-200 h-full">
				<GamePlayContainer />
			</div>
		</MainLayout>
	)
}
