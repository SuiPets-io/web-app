import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const EggDetailContainer = dynamic(
	() => import('./_containers/EggDetailContainer'),
	{
		ssr: false,
	}
)

export default function EggDetailContainerPage() {
	return (
		<MainLayout title="Egg Detail" isSubPage>
			<div className="flex flex-col pt-[100px]">
				<EggDetailContainer />
			</div>
		</MainLayout>
	)
}
