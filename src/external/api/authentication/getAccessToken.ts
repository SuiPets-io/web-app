export const getAccessToken = async () => {
	try {
		const accessTokenRes = await fetch(
			`${process.env.NEXT_PUBLIC_HOST_NAME}/api/auth/access-token`
		)
		const response = await accessTokenRes.json()
		if (response?.accessToken) {
			return response?.accessToken
		} else {
			return false
		}
	} catch (error) {
		throw error
	}
}
