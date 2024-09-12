'use c'
import { Text } from '@/components/ui'
import { addressShorten } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'

function generateRandomHexString(length: number = 64): string {
	const hexChars = '0123456789abcdef'
	let randomHex = '0x'

	for (let i = 0; i < length; i++) {
		randomHex += hexChars[Math.floor(Math.random() * hexChars.length)]
	}

	return randomHex
}

function getRandomNumberByRate(): number {
	const rates = [
		{ value: 1, probability: 0.3 },
		{ value: 2, probability: 0.3 },
		{ value: 5, probability: 0.2 },
		{ value: 10, probability: 0.15 },
		{ value: 50, probability: 0.05 },
	]

	const randomValue = Math.random()
	let cumulativeProbability = 0

	for (const { value, probability } of rates) {
		cumulativeProbability += probability
		if (randomValue <= cumulativeProbability) {
			return value
		}
	}

	// Handle unexpected cases
	return 0
}

const LineAnnouncement = () => {
	const [isShow, setShow] = useState(false)
	const [address, setAddress] = useState('')
	const [intervalTime, setIntervalTime] = useState(10)

	const onCreateAnnouncement = useCallback(() => {
		const address = generateRandomHexString()
		setAddress(address)
		setShow(true)
		setTimeout(() => {
			setShow(false)
			setAddress('')
		}, 4000)
	}, [])

	useEffect(() => {
		/**setTimeout(() => {
			onCreateAnnouncement()
		}, 8000)**/

		const interval = setInterval(() => {
			onCreateAnnouncement()
			setTimeout(() => {
				const newIntervalTime = Math.floor(
					Math.random() * 40 + Math.random() * 20 + Math.random() * 10 + 40 * Math.random()  + 20 * Math.random() + 1
				)
				setIntervalTime(newIntervalTime)
			}, 4100)
		}, intervalTime * 1000)

		return () => clearInterval(interval)
	}, [intervalTime, onCreateAnnouncement])

	return (
		<AnimatePresence>
			{isShow && address ? (
				<motion.div
					className="absolute top-0 right-0 w-full bg-green-200"
					exit={{ opacity: 0 }}
					transition={{ ease: 'easeOut' }}>
					<Marquee speed={100}>
						<Text variant="caption" className="font-normal">
							Lucky player <b>{addressShorten(address, 6, 4)}</b> has just
							received{' '}
							<span className="text-green-500 font-semibold">
								+{getRandomNumberByRate()} SUI
							</span>
						</Text>
					</Marquee>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}

export default LineAnnouncement
