import { useToast } from '@/components/molecules'
import { telegramApi } from '@/external/api/telegram'
import { createAccountTeleInput } from '@/external/api/telegram/createAccountTelegram'
import { useMutation } from '@tanstack/react-query'

const useCreateAccountTelegram = ({
	onSuccess,
}: {
	onSuccess?: (token: string) => void
}) => {
	const { toast } = useToast()

	const returnedAction = useMutation({
		mutationFn: (params: createAccountTeleInput) =>
			telegramApi.createAccountTelegram(params),
		onSuccess: (data) => {
			onSuccess && onSuccess(data.token)
		},
		onError: (e: any) => {
			const error =
				e?.response?.data?.data || 'Sorry, process has some problem. Try again!'
			toast({
				title: 'Create Account',
				description: JSON.stringify(error),
				variant: 'error',
			})
		},
	})

	return returnedAction
}

export default useCreateAccountTelegram
