import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { registerFusionInput } from '@/external/api/pet/registerFusion'
import { useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

const useRegisterFusion = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { toast } = useToast()

	const { onDisconnect } = useDisconnectWallet()

	const returnedAction = useMutation({
		mutationFn: async (body: registerFusionInput) => {
			return petApi.registerFusion(body)
		},
		onMutate: () => {
			toast({
				title: 'Register Fusion',
				description: `Registering...`,
			})
		},
		onSuccess: () => {
			onSuccess && onSuccess()
			toast({
				title: 'Register Fusion',
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
				title: 'Register Fusion',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useRegisterFusion
