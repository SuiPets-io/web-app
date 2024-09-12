import { type SVGProps } from 'react'

const HeaderBlur = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="375"
			height="116"
			viewBox="0 0 375 116"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<g filter="url(#filter0_f_2011_9949)">
				<rect
					x="56"
					y="-107"
					width="263"
					height="107"
					rx="53.5"
					fill="url(#paint0_linear_2011_9949)"
					fillOpacity="0.64"
				/>
				<rect
					x="55.8559"
					y="-107.144"
					width="263.288"
					height="107.288"
					rx="53.6441"
					stroke="#D4FFD6"
					strokeWidth="0.288194"
				/>
			</g>
			<defs>
				<filter
					id="filter0_f_2011_9949"
					x="-59.566"
					y="-222.566"
					width="494.132"
					height="338.132"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feGaussianBlur
						stdDeviation="57.6389"
						result="effect1_foregroundBlur_2011_9949"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_2011_9949"
					x1="214.303"
					y1="-74.5223"
					x2="13.5163"
					y2="-155.114"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="#08CDDA" />
					<stop offset="1" stopColor="#1AF7A8" />
				</linearGradient>
			</defs>
		</svg>
	)
}

export default HeaderBlur
