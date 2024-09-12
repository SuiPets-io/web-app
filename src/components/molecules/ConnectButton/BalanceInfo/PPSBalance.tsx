import { claimPpsAtom } from '@/app/_store/claimPpsAtom'
import PPSIcon from '@/assets/images/icons/pps.png'
import { Text } from '@/components/ui'
import { useProfile } from '@/hooks'
import { balanceDisplayer, shortenNumber } from '@/utils'
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { CongratulationsAnimation } from '../../Animations'
import { useModal } from '../../GlobalModal'
import ClaimPPSToOnchainModal from './ClaimPPSModal/ClaimPPSModal'

const PPSBalance = () => {
	const { data: userInfo } = useProfile()
	const claimPpsAmount = useAtomValue(claimPpsAtom)

	const price = userInfo
		? balanceDisplayer(shortenNumber(userInfo.pps, 7)[0], 4) +
			shortenNumber(userInfo.pps, 7)[1]
		: 0

	const { openModal } = useModal()

	const onOpenClaimPPS = () => {
		openModal({
			view: <ClaimPPSToOnchainModal />,
			title: 'Claim PPS',
		})
	}

	return (
		<div
			className="flex items-center gap-1 rounded-full px-2 py-1 border border-green-500 min-w-[100px] bg-white relative cursor-pointer"
			onClick={onOpenClaimPPS}>
			<Image src={PPSIcon} alt="pps" className="w-5 h-5" />
			<Text textTag="span" variant="t2" className="text-neutral-400">
				{price}
			</Text>
			{claimPpsAmount?.pps ? (
				<>
					<motion.div
						className="absolute text-green-500 font-semibold text-xs min-w-max"
						initial={{ opacity: 0, top: '50%', right: '8px' }}
						animate={{ opacity: [1, 1, 1, 0], top: '-50%' }}
						transition={{ duration: 1.5, ease: 'easeOut' }}>
						+{balanceDisplayer(claimPpsAmount?.pps)} PPS
					</motion.div>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<CongratulationsAnimation width={50} height={50} />
					</div>
				</>
			) : null}
		</div>
	)
}

export default PPSBalance
