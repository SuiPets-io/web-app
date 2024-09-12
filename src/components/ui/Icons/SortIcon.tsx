import { type SVGProps } from 'react'
export const SortIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="10"
			height="18"
			viewBox="0 0 10 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M5 17L1 11.2222H9L5 17ZM5 1L1 6.77778H9L5 1Z"
				stroke="inherit"
				stroke-width="2"
				stroke-linejoin="round"
			/>
		</svg>
	)
}
