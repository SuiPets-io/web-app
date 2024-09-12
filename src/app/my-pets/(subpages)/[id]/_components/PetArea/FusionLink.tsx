import FusionIcon from '@/assets/images/svg/fusion.svg'
import { Text } from '@/components/ui'
import { cn } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const FusionLink = () => {
	const { id } = useParams<{ id: string }>()

	return (
		<Link
			href={`/my-pets/${id}/fusion`}
			className={cn(
				'relative border border-[#93F5E7] bg-gradient-to-r from-[#ADFCFF] to-[#F2FFFD] w-[54px] max-w-[54px]',
				'w-full px-2 py-1 rounded-[10px] flex flex-col items-center cursor-pointer'
			)}>
			<Image
				src={FusionIcon}
				alt={'auto'}
				className="h-[20px] w-auto max-w-[20px]"
				width={20}
				height={20}
			/>
			<Text className="text-xs capitalize text-[#55D0BF] font-semibold">
				Fusion
			</Text>
		</Link>
	)
}

export default FusionLink
