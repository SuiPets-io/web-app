import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { cancelInput } from '@/external/api/egg/cancel'
import { useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

const useUnlisting = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { toast } = useToast()

	const { onDisconnect } = useDisconnectWallet()

	const returnedAction = useMutation({
		mutationFn: async (body: cancelInput) => {
			return eggApi.unlisting(body)
		},
		onMutate: () => {
			toast({
				title: 'Unlist egg',
				description: `Unlisting...`,
			})
		},
		onSuccess: () => {
			onSuccess && onSuccess()
			toast({
				title: 'Unlist egg',
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
				title: 'Unlist egg',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useUnlisting
