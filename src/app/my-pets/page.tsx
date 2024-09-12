import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const YourPetsContainer = dynamic(
	() => import('./_containers/YourPetsContainer'),
	{
		ssr: false,
	}
)

export default function Wallet() {
	return (
		<MainLayout title="Your Pets">
			<div className="flex flex-col px-4">
				<YourPetsContainer />
			</div>
		</MainLayout>
	)
}
