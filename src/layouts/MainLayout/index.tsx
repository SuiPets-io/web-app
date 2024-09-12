'use client'
import { useProfile } from '@/hooks'
import { cn } from '@/utils'
import type { Route } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import HeadBreadcrumb from './HeadBreadcrumb'

type MainLayout = React.PropsWithChildren<{
	title: string
	className?: string
	isSubPage?: boolean
	icon?: any
	backRoute?: Route
}>

const MainLayout = ({
	className,
	title,
	children,
	icon,
	isSubPage,
	backRoute,
}: MainLayout) => {
	useProfile()
	const searchParams = useSearchParams()
	const referralCode = searchParams.get('referralCode')

	useEffect(() => {
		if (referralCode) {
			sessionStorage.setItem('referralCode', referralCode.toString())
		}
	}, [referralCode])

	useEffect(() => {
		const interval = setInterval(() => {
			const isReloaded = sessionStorage.getItem('reloaded') === 'true'
			if (isReloaded !== true) {
				sessionStorage.setItem('reloaded', 'true')
				setTimeout(() => window.location.reload(), 200)
			} else clearInterval(interval)
		}, 500)

		return () => clearInterval(interval)
	}, [])

	return (
		<main className={cn(className)}>
			<HeadBreadcrumb
				title={title}
				isSubPage={isSubPage}
				icon={icon}
				backRoute={backRoute}
			/>
			<div
				className={cn(
					'overflow-auto overflow-x-hidden',
					isSubPage
						? 'h-[100vh]'
						: 'h-[calc(100vh-97px)] max-h-[calc(100vh-97px)]'
				)}>
				{children}
			</div>
		</main>
	)
}

export default MainLayout
