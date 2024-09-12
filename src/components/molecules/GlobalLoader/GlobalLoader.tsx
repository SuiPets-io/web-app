'use client'
import { globalSettingAtom } from '@/app/_store/globalSettingAtom'
import { Loader } from '@/components/ui'
import { cn } from '@/utils'
import { useAtomValue } from 'jotai'

export const GlobalLoader = () => {
	const { loading } = useAtomValue(globalSettingAtom)

	return (
		<div
			className={cn(
				'fixed top-0 left-0 min-h-screen w-full flex justify-center items-center bg-gray-50/60 z-[60] global-loader',
				loading ? '' : 'fade-out'
			)}>
			<Loader />
		</div>
	)
}
