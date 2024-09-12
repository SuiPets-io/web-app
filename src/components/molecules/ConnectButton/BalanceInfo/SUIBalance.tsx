import SUIIcon from '@/assets/images/icons/sui.png'
import { Text } from '@/components/ui'
import { useBalance } from '@/hooks'
import { balanceDisplayer } from '@/utils'
import Image from 'next/image'
import { useModal } from '../../GlobalModal'
import SendSUIModal from './SendSUIModal/SendSUIModal'

const SUIBalance = () => {
	const SUIBalance = useBalance({})
	const { openModal } = useModal()

	const onOpenSendSui = () => {
		openModal({
			view: <SendSUIModal />,
		})
	}

	return (
		<div
			className="flex items-center gap-1 rounded-full px-2 py-1 border border-blue-500 min-w-[100px] bg-white cursor-pointer"
			onClick={onOpenSendSui}>
			<Image src={SUIIcon} alt="sui" className="w-5 h-5" />
			<Text textTag="span" variant="t2" className="text-neutral-400">
				{balanceDisplayer(SUIBalance?.data?.formatted, 4)}
			</Text>
		</div>
	)
}

export default SUIBalance
