import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { doActivityInput } from '@/external/api/pet/do-activity'
import { useAccount, useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const useCarePet = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { toast } = useToast()
	const { id: petId } = useParams<{ id: string }>()
	const { address } = useAccount()

	const { onDisconnect } = useDisconnectWallet()
	const returnedAction = useMutation({
		mutationFn: async (body: doActivityInput) => {
			return await petApi.doActivity(body)
		},
		onSuccess: () => {
			onSuccess && onSuccess()

			queryClient.invalidateQueries({
				queryKey: queryKeys.getProfile(address),
				refetchType: 'active',
			})

			setTimeout(() => {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getPetDetail(petId),
					refetchType: 'active',
				})
			}, 5000)
		},
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'Care Pet',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useCarePet
