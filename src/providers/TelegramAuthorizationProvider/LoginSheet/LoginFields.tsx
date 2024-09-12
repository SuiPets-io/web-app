import { TextareaWithLabel } from '@/components/molecules'
import { useFormContext } from 'react-hook-form'
import { TLoginTelegramForm } from './loginTelegramFormSchema'

const LoginFields = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<TLoginTelegramForm>()

	return (
		<>
			<TextareaWithLabel
				autoFocus={false}
				label="Import"
				placeholder="Enter your Seedphrase or Private key to login"
				rows={3}
				{...register('seedOrPrivateKey')}
				error={errors.seedOrPrivateKey?.message}
			/>
		</>
	)
}

export default LoginFields
