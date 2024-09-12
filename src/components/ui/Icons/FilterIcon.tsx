import { type SVGProps } from 'react'
export const FilterIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="16"
			height="14"
			viewBox="0 0 16 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M15 1H1L6.6 7.30667V11.6667L9.4 13V7.30667L15 1Z"
				stroke="inherit"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	)
}
