import RipImage from '@/assets/images/animals/rip.png'
import { useSheet } from '@/components/molecules/GlobalSheet'
import { PlusIcon } from '@/components/ui'
import { PET_STATUS } from '@/constants'
import { PetType } from '@/external/api/pet/get-my-pet'
import { cn } from '@/utils'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next-nprogress-bar'
import Image from 'next/image'
import { useEffect } from 'react'
import { positionAtom } from '../../_store/positionAtom'
import PutEggsSheet from '../PutEggSheet/PutEggSheet'
import AnimalIllustration from './AnimalIllustration'
import EggIllustration from './EggIllustration'
import LockSlot from './LockSlot'

const PetCard = ({
	data,
	position,
}: {
	data: PetType | undefined
	position: number
}) => {
	const router = useRouter()
	const setPosition = useSetAtom(positionAtom)
	const { openSheet } = useSheet()

	useEffect(() => {
		router.prefetch(`/my-pets/${data?._id}`)
	}, [data?._id, router])

	const onOpenPutSheet = () => {
		setPosition(position)
		openSheet({
			view: <PutEggsSheet />,
			title: 'Put Egg',
		})
	}

	return data?.status !== PET_STATUS.NEED_TO_BUY ? (
		data && data?.status !== PET_STATUS.AVAILABLE ? (
			<div
				className={cn(
					'pb-2 w-full relative min-h-[150px] flex items-end px-3 justify-center cursor-pointer'
				)}
				onClick={() => {
					setPosition(position)
					router.push(`/my-pets/${data?._id}`)
				}}>
				<div className="absolute border border-[#C3DFD1] bg-[#DDF0E7] w-full h-[150px] bottom-0 rounded-xl" />
				<div className="w-full relative flex flex-col gap-2">
					<div className="flex justify-center">
						{data.status === PET_STATUS.PET &&
						data.type &&
						data.rarity &&
						data.level !== undefined && data.origin ? (
							<AnimalIllustration
								petType={data.type}
								level={data.level}
								point={data.point}
								rarity={data.rarity}
                origin={data.origin}
							/>
						) : data.status === PET_STATUS.EGG &&
						  data.type &&
						  data.rarity &&
						  data.origin ? (
							<EggIllustration
								petType={data.type}
								rarity={data.rarity}
								status={data.status}
								growthTime={data.growthTime}
								origin={data.origin}
							/>
						) : data.status === PET_STATUS.DIE ? (
							<div>
								<Image src={RipImage} alt="rip" className="w-[120px] h-auto" />
							</div>
						) : null}
					</div>
				</div>
			</div>
		) : (
			<div className={cn('flex items-end')}>
				<div
					className={cn(
						'border border-[#C3DFD1] bg-[#DDF0E7] h-[150px] rounded-xl w-full cursor-pointer'
					)}>
					<div
						className={cn(
							'h-full w-full flex flex-col justify-center items-center'
						)}
						onClick={onOpenPutSheet}>
						<PlusIcon className={'fill-green-500'} />
					</div>
				</div>
			</div>
		)
	) : (
		<LockSlot position={position} />
	)
}

export default PetCard
