import { axiosPrivate } from '@/http'

export const claimPoint = async () => {
	try {
		const resp = await axiosPrivate.post('/users/claim-reward ')
		return resp
	} catch (error) {
		throw error
	}
}
