'use client'
import { useParams } from 'next/navigation'
import useGetPetDetail from '../../../_hooks/useGetPetDetail'
import FusionList from '../_components/FusionList'
import MyPet from '../_components/MyPet'

const FusionContainer = () => {
	const { id } = useParams<{ id: string }>()
	const { data: petInfo } = useGetPetDetail({ petId: id })

	return (
		<div className="max-h-[calc(100vh)] h-[calc(100vh)] w-full">
			<MyPet petInfo={petInfo} />
			<FusionList petInfo={petInfo} />
		</div>
	)
}

export default FusionContainer
