'use client'

import RankingIcon from '@/assets/images/ranking.png'
import MarketplaceIcon from '@/assets/images/svg/marketplace.svg'
import { useGlobalLoading } from '@/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { Children } from 'react'
import PetCard from '../_components/PetCard/PetCard'
import useGetMyPet from '../_hooks/useGetMyPet'

const YourPetsContainer = () => {
	const { myPet, isLoading } = useGetMyPet()

	useGlobalLoading(isLoading)

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-end items-center gap-4">
				<Link href={'/leaderboard'}>
					<Image src={RankingIcon} alt="ranking" className="w-auto h-[46px]" />
				</Link>
				<Link href={'/marketplace'}>
					<Image
						src={MarketplaceIcon}
						alt="marketplace"
						className="w-auto h-[46px]"
					/>
				</Link>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{Children.toArray(
					Array.from({ length: 4 }, (_, index) => (
						<PetCard data={myPet[index]} position={index} />
					))
				)}
			</div>
		</div>
	)
}

export default YourPetsContainer
