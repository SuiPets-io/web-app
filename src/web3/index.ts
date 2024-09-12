import { globalEnv } from '@/configs'
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'

// use getFullnodeUrl to define RPC location
const rpcUrl = globalEnv.rpcSui ? globalEnv.rpcSui : getFullnodeUrl(globalEnv.suiEnv)

// create a new SuiClient object pointing to the network you want to use
export const suiClient = new SuiClient({
	url: rpcUrl,
})
