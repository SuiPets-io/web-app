'use client'
import animationData from '@/assets/lotties/loading.json'
import Lottie from 'react-lottie'

export const Loader = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	return (
		<div className="scale-50">
			<Lottie
				options={defaultOptions}
				height={200}
				width={200}
				isClickToPauseDisabled
			/>
		</div>
	)
}
