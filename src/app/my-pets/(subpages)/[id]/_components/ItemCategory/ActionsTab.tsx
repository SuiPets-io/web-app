import { ORIGIN, PET_STATUS } from '@/constants'
import { PetType } from '@/external/api/pet/get-my-pet'
import BuyAutoFeedAction from './BuyAutoFeedAction'
import BuyFusionAction from './BuyFusionAction'
import BuyResetAction from './BuyResetAction'

const FUSION_LEVEL = 5

const ActionsTab = ({ petInfo }: { petInfo?: PetType | null }) => {
	return petInfo && petInfo.status === PET_STATUS.PET ? (
		<div className="grid grid-cols-3 gap-4">
			{!petInfo.isActiveAuto ? <BuyAutoFeedAction /> : null}
			{petInfo.level &&
			petInfo.origin === ORIGIN.GENESIS &&
			petInfo.level >= FUSION_LEVEL &&
			!petInfo.fusion?.isActive ? (
				<BuyFusionAction />
			) : null}

			{petInfo.origin === ORIGIN.GENESIS ? <BuyResetAction /> : null}
		</div>
	) : null
}

export default ActionsTab
