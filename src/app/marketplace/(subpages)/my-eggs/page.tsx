import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const MyEggsContainer = dynamic(() => import('./_containers/MyEggsContainer'), {
	ssr: false,
})

export default function MyEggsPage() {
	return (
		<MainLayout title="My Eggs" isSubPage backRoute="/my-pets">
			<div className="flex flex-col pt-[100px]">
				<MyEggsContainer />
			</div>
		</MainLayout>
	)
}
