'use client'
import { GlobalLoader, GlobalModal, Toaster } from '@/components/molecules'
import { GlobalSheet } from '@/components/molecules/GlobalSheet'
import { Sonner } from '@/components/ui'
import { queryClient } from '@/configs'
import TelegramAuthorizationProvider from '@/providers/TelegramAuthorizationProvider'
import { TelegramProvider } from '@/providers/TelegramProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { createStore, Provider } from 'jotai'

const mainAppStore = createStore()

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={mainAppStore}>
			<QueryClientProvider client={queryClient}>
				<TelegramProvider>
					<TelegramAuthorizationProvider>
						{children}
						<GlobalLoader />
					</TelegramAuthorizationProvider>
					<Sonner />
					<Toaster />
					<GlobalModal />
					<GlobalSheet />
				</TelegramProvider>
			</QueryClientProvider>
		</Provider>
	)
}
