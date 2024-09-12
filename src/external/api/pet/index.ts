import { activeAuto } from './active-auto'
import { activeFusion } from './active-fusion'
import { activeReset } from './activeReset'
import { buyItem } from './buy-item'
import { buyPetSlot } from './buy-pet-slot'
import { cancelFusion } from './cancelFusion'
import { claimFreeItems } from './claimFreeItems'
import { doActivity } from './do-activity'
import { editPet } from './edit-pet'
import { fusion } from './fusion'
import { getPetDetail } from './get-detail-pet'
import { getLeaderBoard } from './get-leaderboard'
import { getMyPet } from './get-my-pet'
import { getPetConfig } from './get-pet-config'
import { getPriceConfig } from './get-price-config'
import { getFusionDetail } from './getFusionDetail'
import { getFusionList } from './getFusionList'
import { harvest } from './harvest'
import { putEgg } from './put-egg'
import { registerFusion } from './registerFusion'

export const petApi = {
	activeAuto,
	activeFusion,
	buyItem,
	buyPetSlot,
	doActivity,
	editPet,
	getPetDetail,
	getLeaderBoard,
	getMyPet,
	getPetConfig,
	getPriceConfig,
	harvest,
	registerFusion,
	putEgg,
	claimFreeItems,
	activeReset,
	cancelFusion,
	getFusionDetail,
	getFusionList,
	fusion,
}
