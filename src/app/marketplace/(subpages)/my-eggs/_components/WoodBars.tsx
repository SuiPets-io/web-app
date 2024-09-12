import WoodBarImg from '@/assets/images/wood-bar.png'
import Image from 'next/image'

const WoodBars = ({ length }: { length: number }) => {
	const barLength = Math.ceil(length / 3) > 3 ? Math.ceil(length / 3) : 3

	return (
		<>
			{Array.from({ length: barLength }, (_, index) => (
				<div
					key={`bar-${index}`}
					style={{
						top: index === 0 ? `111px` : `${index * (160 + 12) + 111}px`,
					}}
					className={'absolute left-0 w-full'}>
					<Image
						src={WoodBarImg}
						alt="woodbar"
						className="w-full h-[65px] object-cover"
					/>
				</div>
			))}
		</>
	)
}

export default WoodBars
