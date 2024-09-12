import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { listingInput } from '@/external/api/egg/listing'
import { useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

const useListing = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { toast } = useToast()

	const { onDisconnect } = useDisconnectWallet()

	const returnedAction = useMutation({
		mutationFn: async (body: listingInput) => {
			return eggApi.listing(body)
		},
		onMutate: () => {
			toast({
				title: 'List egg',
				description: `Listing...`,
			})
		},
		onSuccess: () => {
			onSuccess && onSuccess()
			toast({
				title: 'List egg',
				description: `Success`,
				variant: 'success',
			})
			queryClient.invalidateQueries({
				queryKey: queryKeys.privateQuery,
				refetchType: 'active',
			})
		},
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'List egg',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useListing
