import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const MysteryBoxContainer = dynamic(
	() => import('./_containers/MysteryBoxContainer'),
	{
		ssr: false,
	}
)

export default function MysteryBoxPage() {
	return (
		<MainLayout title="Mystery Box" isSubPage backRoute="/my-pets">
			<div className="flex flex-col pt-[100px]">
				<MysteryBoxContainer />
			</div>
		</MainLayout>
	)
}
