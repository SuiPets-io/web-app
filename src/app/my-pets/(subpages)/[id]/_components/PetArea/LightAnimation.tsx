'use client'
import animationData from '@/assets/lotties/light.json'
import Lottie from 'react-lottie'

export const LightAnimation = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	return (
		<div className="scale-125">
			<Lottie
				options={defaultOptions}
				height={60}
				width={60}
				isClickToPauseDisabled
			/>
		</div>
	)
}
