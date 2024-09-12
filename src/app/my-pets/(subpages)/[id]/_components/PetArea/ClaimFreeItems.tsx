import GiftIcon from '@/assets/images/svg/gift.svg'
import { FREE_ITEM_LEVEL, PET_STATUS } from '@/constants'
import { useGlobalLoading } from '@/hooks'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import useClaimFreeItems from '../../_hooks/useClaimFreeItems'
import { petDetailAtom } from '../../_store/petDetailAtom'
import { LightAnimation } from './LightAnimation'

const ClaimFreeItems = () => {
	const petInfo = useAtomValue(petDetailAtom)
	const { mutate: onClaimFreeItems, isPending } = useClaimFreeItems({})

	useGlobalLoading(isPending)

	return petInfo &&
		petInfo.status === PET_STATUS.PET &&
		petInfo.isFreeItemTime &&
		petInfo.level !== undefined &&
		petInfo.level < FREE_ITEM_LEVEL ? (
		<button
			className="relative egg-shake h-[50px] flex items-center justify-center w-[54px] max-w-[54px]"
			onClick={() => onClaimFreeItems({ petId: petInfo?._id })}>
			<div>
				<LightAnimation />
			</div>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px]">
				<Image src={GiftIcon} alt="gift" className="w-[46px] h-auto" />
			</div>
		</button>
	) : null
}

export default ClaimFreeItems
