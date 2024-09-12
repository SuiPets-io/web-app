import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

const TabContent = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className={cn(
				'relative overflow-auto h-[calc(35vh+4px)] max-h-[calc(100vh-348px)]',
				'bg-[#F4FCF8] border-t border-green-600 px-4 py-3 z-[1]'
			)}>
			<AnimatePresence>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default TabContent
