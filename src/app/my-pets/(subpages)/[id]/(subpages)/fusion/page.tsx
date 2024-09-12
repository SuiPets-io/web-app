import MainLayout from '@/layouts/MainLayout'
import dynamic from 'next/dynamic'

const FusionContainer = dynamic(() => import('./_containers/FusionContainer'), {
	ssr: false,
})

export default function FusionPage() {
	return (
		<MainLayout title="Fusion" isSubPage>
			<div className="flex flex-col bg-green-200 h-full">
				<FusionContainer />
			</div>
		</MainLayout>
	)
}
