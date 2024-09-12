import { TPet, TRarity } from '@/types'

export type TActivity = {
	event: string
	from: `0x${string}`
	to: `0x${string}`
	amount: number
	trxHash: string
	date: string
}

export type TEggDetail = {
	id: number
	rarity: TRarity
	petType: TPet
	owner: `0x${string}`
	price: number
	activities: TActivity[]
}

export const mockEggDetailData: TEggDetail = {
	id: 1,
	rarity: 'legendary',
	petType: 'dog',
	owner: '0x1234567890abcdef1234567890abcdef12345678',
	price: 500,
	activities: [
		{
			event: 'Hatched',
			from: '0x1234567890abcdef1234567890abcdef12345678',
			to: '0xabcdef1234567890abcdef1234567890abcdef12',
			amount: 500,
			trxHash: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
			date: '2024-07-21T10:00:00Z',
		},
		{
			event: 'Transferred',
			from: '0xabcdef1234567890abcdef1234567890abcdef12',
			to: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
			amount: 0,
			trxHash: '0x1234567890abcdef1234567890abcdef12345678',
			date: '2024-07-22T11:00:00Z',
		},
	],
}
