import animationData from '@/assets/lotties/gift.json'
import Lottie from 'react-lottie'

interface GiftAnimationProps {
	width?: number
	height?: number
}

export const GiftAnimation = ({ width, height }: GiftAnimationProps) => {
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}
	return (
		<Lottie
			options={defaultOptions}
			height={width || 200}
			width={height || 200}
			isClickToPauseDisabled
		/>
	)
}
