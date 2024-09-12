'use client'

import MarketplaceTabs from '@/app/marketplace/_components/MarketplaceTabs'
import BoxGroup from '../_components/BoxGroup'

const MysteryBoxContainer = () => {
	return (
		<div className="flex flex-col gap-4">
			<MarketplaceTabs />
			<BoxGroup />
		</div>
	)
}

export default MysteryBoxContainer
