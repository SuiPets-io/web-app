'use client'
// TelegramProvider
import type { ITelegramUser, IWebApp } from '@/types'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface ITelegramContext {
	webApp?: IWebApp
	user?: ITelegramUser
	ref?: string
	unsafeData?: any
}

export const TelegramContext = createContext<ITelegramContext>({})

export const TelegramProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [webApp, setWebApp] = useState<IWebApp | null>(null)

	useEffect(() => {
		const app = (window as any).Telegram?.WebApp
		if (app) {
			app.ready()
			app.expand()
			setWebApp(app)
		}
	}, [])

	const value = useMemo(() => {
		return webApp
			? {
					webApp,
					unsafeData: webApp.initDataUnsafe,
					user:
						webApp.initDataUnsafe.user ||
						(process.env.NEXT_PUBLIC_EXAMPLE_USER &&
							JSON.parse(process.env.NEXT_PUBLIC_EXAMPLE_USER)),
					ref: webApp.initDataUnsafe.start_param,
				}
			: {}
	}, [webApp])

	return (
		<TelegramContext.Provider value={value}>
			<div className="min-h-[100vh] h-[100vh] max-w-[560px] mx-auto relative">
				{children}
			</div>
		</TelegramContext.Provider>
	)
}

export const useTelegram = () => useContext(TelegramContext)
