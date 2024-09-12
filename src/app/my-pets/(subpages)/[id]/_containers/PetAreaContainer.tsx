'use client'
import GameBg from '@/assets/images/background/game-bg.png'
import { PET_STATUS } from '@/constants'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import GrowthGift from '../_components/PetArea/GrowthGift/GrowthGift'
import LeftComponents from '../_components/PetArea/LeftComponents'
import PetArea from '../_components/PetArea/PetArea'
import RightComponent from '../_components/PetArea/RightComponent'
import useGetPetDetail from '../_hooks/useGetPetDetail'
import { petDetailAtom } from '../_store/petDetailAtom'

const PetAreaContainer = () => {
	const { id } = useParams<{ id: string }>()
	const setPetDetail = useSetAtom(petDetailAtom)
	const { data: petInfo } = useGetPetDetail({ petId: id })
	const [isShowGift, setShowGift] = useState(false)

	useEffect(() => {
		if (petInfo) {
			setPetDetail(petInfo)
		}
		return () => setPetDetail(null)
	}, [petInfo, setPetDetail])

	useEffect(() => {
		setShowGift(petInfo?.growthBonus?.isRead === false)
	}, [petInfo?.growthBonus?.isRead])

	return (
		<div className="relative h-[65vh] min-h-[350px]">
			<Image
				className="absolute top-4 left-0 w-full h-full object-cover"
				src={GameBg}
				alt="bg"
			/>
			<LeftComponents />
			<RightComponent />
			<PetArea />
			{petInfo?.status === PET_STATUS.PET &&
			petInfo?.growthBonus?.value !== undefined &&
			isShowGift ? (
				<GrowthGift
					petId={petInfo._id}
					reward={petInfo.growthBonus.value}
					onClose={() => setShowGift(false)}
				/>
			) : null}
		</div>
	)
}

export default PetAreaContainer
