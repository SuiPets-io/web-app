// import { useToast } from '@/components/molecules'
// import { queryClient } from '@/configs'
// import { queryKeys } from '@/constants'
// import { petApi } from '@/external/api/pet'
// import { tapInput } from '@/external/api/pet/tap'
// import { useAccount, useDisconnectWallet } from '@/hooks'
// import { useMutation } from '@tanstack/react-query'
// import { useParams } from 'next/navigation'

// const useTap = ({ onSuccess }: { onSuccess?: () => void }) => {
// 	const { address } = useAccount()
// 	const { toast } = useToast()
// 	const { id: petId } = useParams<{ id: string }>()
// 	const { onDisconnect } = useDisconnectWallet()
// 	const returnedAction = useMutation({
// 		mutationFn: (params: tapInput) => petApi.tap(params),
// 		onMutate: () =>
// 			toast({
// 				title: 'Tap',
// 				description: 'Executing...',
// 				duration: 10000,
// 			}),
// 		onSuccess: () => {
// 			toast({
// 				title: 'Tap',
// 				description: 'Tap successful',
// 				variant: 'success',
// 			})

// 			setTimeout(() => {
// 				queryClient.invalidateQueries({
// 					queryKey: queryKeys.getPetDetail(JSON.stringify([address, petId])),
// 					refetchType: 'active',
// 				})
// 			}, 1000)
// 			onSuccess && onSuccess()
// 		},
// 		onError: (e: any) => {
// 			const error =
// 				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
// 			if (error?.response?.data?.status === 5) {
// 				onDisconnect()
// 			}
// 			toast({
// 				title: 'Tap',
// 				description: JSON.stringify(error),
// 				variant: 'error',
// 			})
// 		},
// 	})
// 	return returnedAction
// }

// export default useTap
