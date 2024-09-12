import useEditPet from '@/app/my-pets/_hooks/useEditPet'
import AutoIcon from '@/assets/images/svg/auto.svg'
import { Text } from '@/components/ui'
import { useGlobalLoading } from '@/hooks'
import { cn } from '@/utils'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { petDetailAtom } from '../../_store/petDetailAtom'

const ToggleAutoCare = () => {
	const petInfo = useAtomValue(petDetailAtom)

	const { mutate: editPet, isPending } = useEditPet({
		title: `Auto-care ${petInfo?.isOpenAuto ? 'OFF' : 'ON'}`,
	})

	useGlobalLoading(isPending)

	const onConfirm = () => {
		if (petInfo) {
			editPet({ petId: petInfo?._id, isOpenAuto: !petInfo?.isOpenAuto })
		}
	}

	return (
		<>
			<button
				className={cn(
					'relative px-1 py-1 rounded-[10px] flex flex-col items-center cursor-pointer border w-[54px] max-w-[54px]',
					'border-[#F79857] bg-gradient-to-r from-[#F79F5C] to-[#FCE995]',
					!petInfo?.isOpenAuto ? 'grayscale' : ''
				)}
				onClick={onConfirm}>
				<Image
					src={AutoIcon}
					alt={'auto'}
					className="h-[20px] w-auto max-w-[20px]"
					width={20}
					height={20}
				/>
				<Text className="text-[9px] capitalize text-[#9E4A00] font-semibold">
					Auto Care
				</Text>
				<Text
					className={cn(
						'text-xs uppercase font-bold bg-white border px-1 rounded-full',
						petInfo?.isOpenAuto
							? 'border-green-500 text-green-500'
							: 'border-red-500 text-red-500'
					)}>
					{petInfo?.isOpenAuto ? 'On' : 'Off'}
				</Text>
			</button>
		</>
	)
}

export default ToggleAutoCare
