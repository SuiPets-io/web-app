import RipImage from '@/assets/images/animals/rip.png'
import { ORIGIN } from '@/constants'
import { PetType } from '@/external/api/pet/get-my-pet'
import Image from 'next/image'
import BuyResetAction from './BuyResetAction'
import PutEggAction from './PutEggAction'

const RIPIllustration = ({ petInfo }: { petInfo: PetType }) => {
	return (
		<div className="flex flex-col gap-1 items-center -mb-3">
			<Image src={RipImage} alt="rip" className="w-[160px] h-auto" />
			{petInfo.origin === ORIGIN.GENESIS ? <BuyResetAction /> : null}

			{petInfo.origin === ORIGIN.NORMAL ? <PutEggAction /> : null}
		</div>
	)
}

export default RIPIllustration
