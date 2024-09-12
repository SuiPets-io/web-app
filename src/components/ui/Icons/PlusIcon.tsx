import { type SVGProps } from 'react'
export const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M21 9H15V3C15 2.20435 14.6839 1.44129 14.1213 0.87868C13.5587 0.31607 12.7956 0 12 0C11.2044 0 10.4413 0.31607 9.87868 0.87868C9.31607 1.44129 9 2.20435 9 3L9.1065 9H3C2.20435 9 1.44129 9.31607 0.87868 9.87868C0.31607 10.4413 0 11.2044 0 12C0 12.7956 0.31607 13.5587 0.87868 14.1213C1.44129 14.6839 2.20435 15 3 15L9.1065 14.8935L9 21C9 21.7956 9.31607 22.5587 9.87868 23.1213C10.4413 23.6839 11.2044 24 12 24C12.7956 24 13.5587 23.6839 14.1213 23.1213C14.6839 22.5587 15 21.7956 15 21V14.8935L21 15C21.7956 15 22.5587 14.6839 23.1213 14.1213C23.6839 13.5587 24 12.7956 24 12C24 11.2044 23.6839 10.4413 23.1213 9.87868C22.5587 9.31607 21.7956 9 21 9Z"
				fill="inherit"
			/>
		</svg>
	)
}