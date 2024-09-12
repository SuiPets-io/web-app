import type { IncomingMessage } from 'http'

export function isAndroid(): boolean {
	return (
		typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
	)
}

export function isIphone(): boolean {
	return typeof navigator !== 'undefined' && /iPhone/.test(navigator.userAgent)
}

export function isIPad(): boolean {
	return typeof navigator !== 'undefined' && /iPad/.test(navigator.userAgent)
}

export function isIOS(): boolean {
	return isIphone() || isIPad()
}

export function isMobile(): boolean {
	return isAndroid() || isIphone()
}

export function checkMobileSSR(req: IncomingMessage) {
	const UA = req.headers['user-agent']
	return Boolean(
		UA?.match(
			/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
		)
	)
}
