import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const GlobalEggsContainer = dynamic(
	() => import('./_containers/GlobalEggsContainer'),
	{
		ssr: false,
	}
)

export default function GlobalEggsContainerPage() {
	return (
		<MainLayout title="Global Eggs" isSubPage backRoute="/my-pets">
			<div className="flex flex-col pt-[100px]">
				<GlobalEggsContainer />
			</div>
		</MainLayout>
	)
}
