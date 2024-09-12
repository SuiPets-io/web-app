import { axiosPrivate } from '@/http'
import { z } from 'zod'

const getLeaderboardOutputSchema = z.object({
	weekLeaderBoard: z.array(
		z.object({
			publicAddress: z.string(),
			seasonNumber: z.number(),
			seasonType: z.string(),
			pps: z.number(),
		})
	),
	monthLeaderBoard: z.array(
		z.object({
			publicAddress: z.string(),
			seasonNumber: z.number(),
			seasonType: z.string(),
			pps: z.number(),
		})
	),
	weekSeason: z.object({
		seasonNumber: z.number(),
		type: z.string(),
		startDate: z.string(),
		endDate: z.string(),
	}),
	monthSeason: z.object({
		seasonNumber: z.number(),
		type: z.string(),
		startDate: z.string(),
		endDate: z.string(),
	}),
	myWeekRank: z.number(),
	myMonthRank: z.number(),
	myWeekPps: z.number(),
	myMonthPps: z.number(),
})

export type getLeaderboardOutput = z.infer<typeof getLeaderboardOutputSchema>

export const getLeaderBoard = async () => {
	try {
		const resp = await axiosPrivate.get('/pets/leaderboard')
		return getLeaderboardOutputSchema.parse(resp?.data?.data)
	} catch (error) {
		throw error
	}
}
