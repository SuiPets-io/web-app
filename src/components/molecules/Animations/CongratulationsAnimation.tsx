import animationData from '@/assets/lotties/congratulations.json'
import Lottie from 'react-lottie'

interface CongratulationsAnimationProps {
	width?: number
	height?: number
}

export const CongratulationsAnimation = ({
	width,
	height,
}: CongratulationsAnimationProps) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}
	return (
		<Lottie
			options={defaultOptions}
			height={width || 400}
			width={height || 400}
			isClickToPauseDisabled
		/>
	)
}
