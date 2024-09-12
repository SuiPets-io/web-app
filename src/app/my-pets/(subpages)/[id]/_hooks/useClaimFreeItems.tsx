import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { claimFreeItemsInput } from '@/external/api/pet/claimFreeItems'
import { useAccount, useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const useClaimFreeItems = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { toast } = useToast()
	const { id: petId } = useParams<{ id: string }>()
	const { address } = useAccount()

	const { onDisconnect } = useDisconnectWallet()
	const returnedAction = useMutation({
		mutationFn: async (body: claimFreeItemsInput) => {
			return await petApi.claimFreeItems(body)
		},
		onMutate: () => {
			toast({
				title: 'Claim Free Items',
				description: `Claiming...`,
			})
		},
		onSuccess: () => {
			onSuccess && onSuccess()
			toast({
				title: 'Claim Free Items',
				description: `Congratulations! You have received free items`,
				variant: 'success',
			})
			queryClient.invalidateQueries({
				queryKey: queryKeys.getPetDetail(petId),
				refetchType: 'active',
			})
			queryClient.invalidateQueries({
				queryKey: queryKeys.getProfile(address),
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
				title: 'Claim Free Items',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useClaimFreeItems
