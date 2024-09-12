'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function ProgressLoader() {
	return (
		<ProgressBar
			height="4px"
			color="#13D4A3"
			options={{ showSpinner: false }}
			shallowRouting
		/>
	)
}
