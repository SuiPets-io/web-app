import { claimPpsAtom } from '@/app/_store/claimPpsAtom'
import { useToast } from '@/components/molecules'
import { queryClient } from '@/configs'
import { queryKeys } from '@/constants'
import { petApi } from '@/external/api/pet'
import { harvestInput, harvestOutput } from '@/external/api/pet/harvest'
import { useAccount, useBalance, useDisconnectWallet } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useParams } from 'next/navigation'

const useHarvest = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { address } = useAccount()
	const { refetch } = useBalance({})
	const { toast } = useToast()
	const { id: petId } = useParams<{ id: string }>()
	const setClaimPps = useSetAtom(claimPpsAtom)

	const { onDisconnect } = useDisconnectWallet()
	const returnedAction = useMutation({
		mutationFn: async (body: harvestInput) => {
			return await petApi.harvest(body)
		},
		onSuccess: (data: harvestOutput) => {
			onSuccess && onSuccess()
			setClaimPps({ pps: data.pps })
			refetch()
			setTimeout(() => {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getProfile(address),
					refetchType: 'active',
				})

				queryClient.invalidateQueries({
					queryKey: queryKeys.getPetDetail(petId),
					refetchType: 'active',
				})

				setClaimPps(null)
			}, 1500)
		},
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			if (error?.response?.data?.status === 5) {
				onDisconnect()
			}
			toast({
				title: 'Collect PPS',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useHarvest
