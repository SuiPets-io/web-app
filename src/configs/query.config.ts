import { QueryClient } from '@tanstack/react-query'

export const queryClientConfig = {
	staleTime: 1 * 60 * 1000,
	gcTime: 5 * 60 * 1000,
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: queryClientConfig.staleTime,
			gcTime: queryClientConfig.gcTime,
		},
	},
})
