'use client'
import { useTelegramAccessToken } from '@/app/_store/authenStore'
import { useInfoCloudStorage } from '@/app/_store/telegramStore'
import { useEffect, useState } from 'react'
import TelegramLoginScreen from './TelegramLoginScreen'

const TelegramAuthorizationProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { privateKey } = useInfoCloudStorage()
	const { accessToken } = useTelegramAccessToken()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setIsLoading(false), 500)
	}, [])

	if (isLoading) {
		return null
	}

	return privateKey && accessToken ? <>{children}</> : <TelegramLoginScreen />
}

export default TelegramAuthorizationProvider
