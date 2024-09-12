'use client'
import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import CarpetImg from '@/assets/images/carpet.png'
import { HOUR_DURATION, PET_STAGE } from '@/constants'
import { getPetDetailOutput } from '@/external/api/pet/get-detail-pet'
import { useDiffTime } from '@/hooks'
import { getPetAnimation } from '@/utils/getAssets'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useEffect } from 'react'
import Lottie from 'react-lottie'
import { petStageAtom } from '../../_store/petDetailAtom'
import CountDownTime from './CountdownTime'

const DEAD_INCOMING_NOTI_TIME_RATE = 0.4

interface IPetAnimation {
	data: getPetDetailOutput
}

const PetAnimation = ({ data }: IPetAnimation) => {
	const [stage, setStage] = useAtom(petStageAtom)
	const { data: petConfig } = useGetPetConfig()
	const { diffTime } = useDiffTime({ nextTime: data.nextActionTime || '' })

	const animationConfigs =
		data.stage && data.type
			? getPetAnimation(data.type, data.rarity, stage, data.origin)
			: null

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationConfigs?.animation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	useEffect(() => {
		if (
			petConfig?.numberDayToDie &&
			diffTime !== null &&
			Math.abs(diffTime) >
				petConfig.numberDayToDie *
					DEAD_INCOMING_NOTI_TIME_RATE *
					24 *
					HOUR_DURATION
		) {
			setStage('sick')
			return
		}

		if (diffTime && diffTime < 1 && data?.stage === PET_STAGE.EAT) {
			setStage('hungry')
			return
		}

		if (diffTime && diffTime < 1 && data?.stage === PET_STAGE.TOILET) {
			setStage('dirty')
			return
		}

		if (diffTime && diffTime < 1 && data?.stage === PET_STAGE.ENTERTAINMENT) {
			setStage('sad')
			return
		}

		if (diffTime && diffTime > 1) {
			setStage('normal')
			return
		}
	}, [data?.stage, diffTime, setStage, petConfig?.numberDayToDie])

	return (
		<div className="relative min-w-[252px] flex flex-col items-center gap-2">
			{data.nextActionTime && petConfig?.growthEggTimeInHour ? (
				<div className="mb-2 flex justify-center">
					<CountDownTime
						nextTime={data.nextActionTime}
						maxDuration={petConfig?.activityTimeInHour}
					/>
				</div>
			) : null}
			<div className="relative z-[1]">
				<Lottie
					options={defaultOptions}
					height={animationConfigs?.height}
					width={animationConfigs?.width}
					isClickToPauseDisabled
				/>
			</div>
			<Image
				src={CarpetImg}
				alt="carpet"
				className="w-auto h-[74px] absolute bottom-[-25px]"
			/>
		</div>
	)
}

export default PetAnimation
