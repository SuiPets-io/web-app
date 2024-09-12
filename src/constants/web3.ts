import { globalEnv } from '@/configs'
import { MIST_PER_SUI } from '@mysten/sui/utils'
import { ECHAIN } from './enums'

export const SUI_DECIMAL = Number(MIST_PER_SUI)

export const PPS_DECIMAL = 1000

export const SUI_CHAIN_CONFIG = {
	decimals: SUI_DECIMAL,
	symbol: ECHAIN.SUI,
}

export const PPS_CHAIN_CONFIG = {
	decimals: SUI_DECIMAL,
	symbol: ECHAIN.PPS,
	contract: globalEnv.ppsContract,
}

export const CHAIN_CONFIGS: Record<
	ECHAIN,
	{
		decimals: number
		symbol: ECHAIN
		contract?: string
	}
> = {
	sui: SUI_CHAIN_CONFIG,
	pps: PPS_CHAIN_CONFIG,
}
