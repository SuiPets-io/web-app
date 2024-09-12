import axios from 'axios'

export const updateAccessToken = async ({
	accessToken,
}: {
	accessToken: string
}) => {
	try {
		const response = await await axios.post(
			`${process.env.NEXT_PUBLIC_HOST_NAME}/api/auth/access-token`,
			{
				accessToken,
			}
		)
		if (response?.status === 200) {
			return true
		} else {
			return false
		}
	} catch (error) {
		throw error
	}
}
