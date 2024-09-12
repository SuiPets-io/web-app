import { useToast } from '@/components/molecules'
import { telegramApi } from '@/external/api/telegram'
import { createAccountTeleInput } from '@/external/api/telegram/createAccountTelegram'
import {
	loginTeleInput,
	loginTeleOutput,
} from '@/external/api/telegram/loginTelegram'
import { useMutation } from '@tanstack/react-query'

const useLoginTelegram = ({
	onSuccess,
}: {
	onSuccess: (data: loginTeleOutput, params: loginTeleInput) => void
}) => {
	const { toast } = useToast()

	const returnedAction = useMutation({
		mutationFn: (params: createAccountTeleInput) =>
			telegramApi.createAccountTelegram(params),
		onSuccess: async (data, variables) => {
			onSuccess(data, variables)
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

export default useLoginTelegram
