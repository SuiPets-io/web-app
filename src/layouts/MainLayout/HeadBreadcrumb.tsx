'use client'
import { Web3ConnectButton } from '@/components/molecules'
import BalanceInfo from '@/components/molecules/ConnectButton/BalanceInfo/BalanceInfo'
import { Button, Text } from '@/components/ui'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import type { Route } from 'next'
import { useRouter } from 'next-nprogress-bar'
import { useEffect } from 'react'
import LineAnnouncement from './LineAnnouncement'

interface HeadBreadcrumb {
	title: string
	isSubPage?: boolean
	icon?: any
	backRoute?: Route
}

const HeadBreadcrumb = ({
	title,
	isSubPage,
	icon,
	backRoute,
}: HeadBreadcrumb) => {
	const router = useRouter()

	useEffect(() => {
		if (backRoute) {
			router.prefetch(backRoute)
		}
	}, [backRoute, router])

	const onBack = () => {
		if (backRoute) {
			router.push(backRoute)
		} else router.back()
	}

	if (isSubPage) {
		return (
			<div className="fixed top-0 px-4 py-3 overflow-hidden z-10 w-full max-w-[560px]">
				<div className="flex items-center justify-between">
					<BalanceInfo />
					<Web3ConnectButton />
				</div>
				<div className="flex items-center justify-center relative min-h-[40px]">
					<Button
						variant="ghost"
						className="absolute left-0 top-1/2 -translate-y-1/2 p-0 h-fit bg-white border border-[#C3DFD1] rounded-md"
						onClick={onBack}>
						<ChevronLeftIcon width={24} height={24} />
					</Button>
					<Text textTag="h2" variant="t1" className="text-green-500">
						{title}
					</Text>
					{icon}
				</div>
			</div>
		)
	}

	return (
		<div className="sticky top-0 px-4 py-3 overflow-hidden">
			<LineAnnouncement />
			<div className="flex items-center justify-between pt-1">
				<BalanceInfo />
				<Web3ConnectButton />
			</div>
			<div className="flex justify-center mt-2">
				<Text className="text-green-500" textTag="h2" variant="t1">
					{title}
				</Text>
			</div>
		</div>
	)
}

export default HeadBreadcrumb
