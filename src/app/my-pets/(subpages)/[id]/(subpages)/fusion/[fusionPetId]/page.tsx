import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const FusionHistoryContainer = dynamic(
	() => import('./_containers/FusionHistoryContainer'),
	{
		ssr: false,
	}
)

export default function FusionHistoryContainerPage() {
	return (
		<MainLayout title="Pet Detail" isSubPage>
			<div className="flex flex-col pt-[100px]">
				<FusionHistoryContainer />
			</div>
		</MainLayout>
	)
}
