'use client'
import { PET_STATUS } from '@/constants'
import { useAtomValue } from 'jotai'
import { petDetailAtom } from '../../_store/petDetailAtom'
import EggIllustration from './EggIllustration'
import PetAnimation from './PetAnimation'
import RIPIllustration from './RIPIllustration/RIPIllustration'

const PetArea = () => {
	const petInfo = useAtomValue(petDetailAtom)

	return petInfo ? (
		<div className="z-[10] absolute bottom-[18%] left-1/2 -translate-x-1/2">
			{petInfo?.status === PET_STATUS.EGG && petInfo.type && petInfo.status ? (
				<EggIllustration
					petType={petInfo.type}
					status={petInfo.status}
					growthTime={petInfo.growthTime}
					rarity={petInfo.rarity}
					origin={petInfo.origin}
				/>
			) : petInfo?.status === PET_STATUS.PET ? (
				<PetAnimation data={petInfo} />
			) : petInfo?.status === PET_STATUS.DIE ? (
				<RIPIllustration petInfo={petInfo} />
			) : null}
		</div>
	) : null
}

export default PetArea
