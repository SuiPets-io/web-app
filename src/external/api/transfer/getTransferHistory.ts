import { axiosPrivate } from '@/http'
import { z } from 'zod'

export type getTransferHistoryInput = {
	offset?: number
	limit?: number
	status?: string
}

const getTransferHistoryOutputSchema = z.array(
	z.object({
		_id: z.string(),
		publicAddress: z.string(),
		pointReward: z.number(),
		valueNum: z.number(),
		status: z.string(),
		txHash: z.string(),
		createdAt: z.string(),
		from: z.string(),
		to: z.string(),
	})
)

export type getTransferHistoryOutput = z.infer<
	typeof getTransferHistoryOutputSchema
>

export const getTransferHistory = async (params: getTransferHistoryInput) => {
	try {
		const resp = await axiosPrivate.get('/tokens/history', {
			params,
		})
		if (resp?.data?.data) {
			return getTransferHistoryOutputSchema.parse(resp.data.data)
		}
		return []
	} catch (error) {
		throw error
	}
}
