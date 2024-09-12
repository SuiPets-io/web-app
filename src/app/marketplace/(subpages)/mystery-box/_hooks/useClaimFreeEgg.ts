import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { eggApi } from '@/external/api/egg'
import { EggType } from '@/external/api/egg/get-my-egg'
import { useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

const useClaimFreeEgg = ({
	onSuccess,
}: {
	onSuccess?: (data: EggType) => void
}) => {
	const { toast } = useToast()

	const { onDisconnect } = useDisconnectWallet()

	const returnedAction = useMutation({
		mutationFn: async () => {
			return eggApi.claimFreeEgg()
		},
		onMutate: () => {
			toast({
				title: 'Claim Free Egg',
				description: `Claiming...`,
			})
		},
		onSuccess: (data) => {
			onSuccess && onSuccess(data)
			toast({
				title: 'Claim Free Egg',
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
				title: 'Claim Free Egg',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useClaimFreeEgg
