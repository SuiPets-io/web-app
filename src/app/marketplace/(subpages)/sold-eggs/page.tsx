import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const SoldEggsContainer = dynamic(
	() => import('./_containers/SoldEggsContainer'),
	{
		ssr: false,
	}
)

export default function SoldEggsContainerPage() {
	return (
		<MainLayout title="Global Eggs" isSubPage backRoute="/my-pets">
			<div className="flex flex-col pt-[100px]">
				<SoldEggsContainer />
			</div>
		</MainLayout>
	)
}
