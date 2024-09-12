import { Button } from '@/components/ui'
import { useAccount } from '@/hooks'
import { addressShorten, cn } from '@/utils'
import { useModal } from '../GlobalModal'
import AccountInfoModal from './AccountInfoModal'

export const Web3ConnectButton = () => {
	const { address } = useAccount()
	const { openModal } = useModal()

	const onOpenAccountInfo = () => {
		openModal({
			view: <AccountInfoModal />,
			customSize: 'md:max-w-[320px]',
		})
	}

	return (
		<Button
			variant="secondary"
			className={cn('font-medium font-sm font-poppins flex gap-2')}
			onClick={onOpenAccountInfo}>
			{addressShorten(address, 5, 4)}
		</Button>
	)
}
