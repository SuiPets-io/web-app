import SUILogo from '@/assets/images/icons/sui.png'
import { Text } from '@/components/ui'
import { useBalance } from '@/hooks'
import { balanceDisplayer } from '@/utils'
import Image from 'next/image'

const SUIBalance = () => {
	const balance = useBalance({})
	return (
		<div className="border border-[#C3DFD1] bg-white rounded-lg p-1 flex gap-2 items-center">
			<Image src={SUILogo} alt="sui" className="min-w-[22px] w-[22px] h-auto" />
			<Text className="text-xs">
				{balanceDisplayer(balance?.data?.formatted, 3)} SUI
			</Text>
		</div>
	)
}

export default SUIBalance
