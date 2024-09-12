import { useSheet } from '@/components/molecules/GlobalSheet'
import { Button, Form } from '@/components/ui'
import { SubmitHandler } from 'react-hook-form'
import useEditPet from '../../_hooks/useEditPet'
import EditPetFields from './EditNameFields'
import { editPetSchema, TEditPetSchema } from './editNameSchema'

const EditPetSheet = ({ initialValue }: { initialValue: TEditPetSchema }) => {
	const { mutate } = useEditPet({ onSuccess: () => {} })
	const { closeSheet } = useSheet()

	const onSubmit: SubmitHandler<TEditPetSchema> = async (data) => {
		mutate({ name: data.petName, petId: data.petId })
		closeSheet()
	}

	return (
		<Form
			validationSchema={editPetSchema}
			onSubmit={onSubmit}
			useFormProps={{
				defaultValues: initialValue,
			}}
			className="flex flex-col gap-4 pt-4">
			<EditPetFields />
			<Button type="submit">Submit</Button>
		</Form>
	)
}

export default EditPetSheet
