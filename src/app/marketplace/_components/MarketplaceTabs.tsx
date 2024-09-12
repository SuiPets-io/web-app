import { cn } from '@/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const MarketplaceTabs = () => {
	const pathname = usePathname()

	const MarketplaceTabs = useMemo(
		() => [
			{
				title: 'My Eggs',
				link: '/marketplace/my-eggs',
				isActive: pathname.startsWith('/marketplace/my-eggs'),
			},
			{
				title: 'Mystery Box',
				link: '/marketplace/mystery-box',
				isActive: pathname.startsWith('/marketplace/mystery-box'),
			},
			{
				title: 'Global Eggs',
				link: '/marketplace/global-eggs',
				isActive: pathname.startsWith('/marketplace/global-eggs'),
			},
			{
				title: 'Sold Eggs',
				link: '/marketplace/sold-eggs',
				isActive: pathname.startsWith('/marketplace/sold-eggs'),
			},
		],
		[pathname]
	)

	return (
		<div className="flex gap-2 overflow-auto no-scrollbar px-4">
			{MarketplaceTabs.map((item) => (
				<Link
					key={item.link}
					href={item.link}
					className={cn(
						'border border-green-400 rounded-full px-4 py-1 text-green-500 text-sm leading-5 font-bold min-w-fit',
						item.isActive ? 'bg-green-500 text-white' : ''
					)}>
					{item.title}
				</Link>
			))}
		</div>
	)
}

export default MarketplaceTabs
