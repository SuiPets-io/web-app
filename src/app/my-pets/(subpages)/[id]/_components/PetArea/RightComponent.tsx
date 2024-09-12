'use client'

import MarketplaceIcon from '@/assets/images/svg/marketplace.svg'

import { PET_STATUS } from '@/constants'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { petDetailAtom } from '../../_store/petDetailAtom'
import ClaimFreeItems from './ClaimFreeItems'
import FusionLink from './FusionLink'
import ToggleAutoCare from './ToggleAutoCare'

const RightComponent = () => {
	const petInfo = useAtomValue(petDetailAtom)

	return (
		<div className="absolute top-[52px] right-4 flex flex-col items-center gap-4 z-20">
			<Link href={'/marketplace'}>
				<Image
					src={MarketplaceIcon}
					alt="marketplace"
					className="w-[46px] h-auto"
				/>
			</Link>
			<ClaimFreeItems />
			{petInfo?.fusion?.isActive && petInfo.status === PET_STATUS.PET ? (
				<FusionLink />
			) : null}
			{petInfo?.status === PET_STATUS.PET && petInfo?.isActiveAuto ? (
				<ToggleAutoCare />
			) : null}
		</div>
	)
}

export default RightComponent
