import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { putEggInput } from '@/external/api/pet/put-egg'
import { useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

const usePutEgg = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { toast } = useToast()

	const { onDisconnect } = useDisconnectWallet()

	const returnedAction = useMutation({
		mutationFn: async (body: putEggInput) => {
			return await petApi.putEgg(body)
		},
		onMutate: () => {
			toast({
				title: 'Put egg',
				description: `Puting...`,
			})
		},
		onSuccess: () => {
			onSuccess && onSuccess()
			toast({
				title: 'Put egg',
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
				title: 'Put egg',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default usePutEgg
