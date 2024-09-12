import { buyEgg } from './buy-egg'
import { buyMysteryBox } from './buy-mystery-box'
import { cancel } from './cancel'
import { checkClaimFreeEgg } from './checkClaimFreeEgg'
import { checkTx } from './checkTx'
import { claimFreeEgg } from './claimFreeEgg'
import { getMarket } from './get-market'
import { getMyEgg } from './get-my-egg'
import { getRecentSold } from './get-recent-sold'
import { getEggConfig } from './getEggConfig'
import { getEggDetail } from './getEggDetail'
import { listing } from './listing'

export const eggApi = {
	buyMysteryBox,
	buyEgg,
	unlisting: cancel,
	getMarket,
	getMyEgg,
	getRecentSold,
	listing,
	checkTx,
	getEggDetail,
	getEggConfig,
	checkClaimFreeEgg,
	claimFreeEgg,
}
