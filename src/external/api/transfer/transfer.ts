import { axiosPrivate } from '@/http'

export const transferToken = async ({ txHash }: { txHash: `0x${string}` }) => {
	try {
		const resp = await axiosPrivate.post('/tokens/transfer', {
			txHash,
		})
		return resp
	} catch (error) {
		throw error
	}
}
