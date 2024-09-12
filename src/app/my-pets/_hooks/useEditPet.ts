import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { editPetInput } from '@/external/api/pet/edit-pet'
import { useAccount, useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

const useEditPet = ({
	title,
	onSuccess,
}: {
	title?: string
	onSuccess?: () => void
}) => {
	const { address } = useAccount()
	const { toast } = useToast()

	const { onDisconnect } = useDisconnectWallet()
	const returnedAction = useMutation({
		mutationFn: async (body: editPetInput) => {
			return petApi.editPet(body)
		},
		onSuccess: (_, variables) => {
			onSuccess && onSuccess()
			title &&
				toast({
					title,
					description: `Success`,
					variant: 'success',
				})
			queryClient.invalidateQueries({
				queryKey: queryKeys.getMyPet(address),
				refetchType: 'active',
			})
			queryClient.invalidateQueries({
				queryKey: queryKeys.getPetDetail(variables.petId),
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
				title: title || 'Edit Name',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useEditPet
