import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { cancelFusionInput } from '@/external/api/pet/cancelFusion'
import { useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

const useCancelFusion = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { toast } = useToast()

	const { onDisconnect } = useDisconnectWallet()

	const returnedAction = useMutation({
		mutationFn: async (body: cancelFusionInput) => {
			return petApi.cancelFusion(body)
		},
		onMutate: () => {
			toast({
				title: 'Cancel Fusion',
				description: `Canceling...`,
			})
		},
		onSuccess: () => {
			onSuccess && onSuccess()
			toast({
				title: 'Cancel Fusion',
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
				title: 'Cancel Fusion',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useCancelFusion
