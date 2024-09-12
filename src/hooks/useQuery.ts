import {
	DefaultError,
	QueryClient,
	QueryKey,
	UseQueryOptions,
	useQuery as useTanstackQuery,
} from '@tanstack/react-query'

export function useQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	{
		throwOnError,
		...options
	}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
	queryClient?: QueryClient
) {
	return useTanstackQuery(
		{ throwOnError: throwOnError || true, ...options },
		queryClient
	)
}
