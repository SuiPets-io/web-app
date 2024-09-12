import useEditPet from '@/app/my-pets/_hooks/useEditPet'
import { Text } from '@/components/ui'
import { useBalance } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GiftAnimation } from './GiftAnimation'

interface GiftProps {
	petId: string
	reward: number
	onClose: () => void
}

const GrowthGift = ({ petId, reward, onClose }: GiftProps) => {
	const { refetch } = useBalance({})
	const [isShow, setShow] = useState(false)
	const { mutate } = useEditPet({ title: '' })

	useEffect(() => {
		setTimeout(() => {
			refetch()
			setShow(true)
		}, 2000)
	}, [refetch])

	useEffect(() => {
		setTimeout(() => {
			mutate({ petId, isReadGrowthBonus: true })
			onClose()
		}, 4000)
	}, [mutate, onClose, petId])

	return (
		<AnimatePresence>
			<motion.div
				className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
				exit={{ opacity: 0 }}>
				<div className="z-0 absolute top-0 left-0 w-full h-full bg-white/80" />

				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<GiftAnimation />
				</div>

				<div className="rounded-2xl relative flex justify-center items-center w-[200px] h-[200px]">
					{isShow ? (
						<motion.div
							className="mt-4 flex justify-center"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ ease: 'easeInOut' }}>
							{reward > 0 ? (
								<Text className="text-[12px] text-yellow-500">
									Congratulations, you have received{' '}
									<span className="text-green-500 font-bold">
										+{reward} SUI
									</span>
									!
								</Text>
							) : (
								<Text className="text-[12px] font-semibold text-yellow-500">
									{'Sorry, better luck next time! 😢'}
								</Text>
							)}
						</motion.div>
					) : null}
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default GrowthGift
