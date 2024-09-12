import { cn } from '@/utils'
import { motion, useAnimate } from 'framer-motion'
import { ReactNode, useEffect } from 'react'

const TabItem = ({
	children,
	active,
	onClick,
}: {
	children: ReactNode
	active: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	const [scope, animate] = useAnimate()

	useEffect(() => {
		if (active) {
			animate(scope.current, { y: 16, paddingTop: 8 })
		} else {
			animate(scope.current, { y: 26, paddingTop: 4 })
		}
	}, [active, animate, scope])

	return (
		<motion.button
			ref={scope}
			initial={{ y: 20, height: 60, paddingTop: 4 }}
			className={cn(
				'border-[1.2px] border-green-600 bg-green-500 rounded-t-md px-4 pb-3 flex items-start',
				active ? 'bg-[#F4FCF8]' : 'h-[50px]'
			)}
			onClick={onClick}>
			{children}
		</motion.button>
	)
}

export default TabItem
