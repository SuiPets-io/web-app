import { InputWithLabel } from '@/components/molecules'
import { useFormContext } from 'react-hook-form'
import { TEditPetSchema } from './editNameSchema'

const EditPetFields = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<TEditPetSchema>()

	return (
		<>
			<InputWithLabel
				autoFocus={false}
				label="Pet name"
				placeholder="Enter your pet name"
				{...register('petName')}
				error={errors.petName?.message}
			/>
		</>
	)
}

export default EditPetFields
