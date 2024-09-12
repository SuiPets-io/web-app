import { useSheet } from '@/components/molecules/GlobalSheet'
import { EditIcon, Text } from '@/components/ui'
import EditPetSheet from '../EditNameModal/EditNameSheet'

const NameBadge = ({ petId, name }: { petId: string; name: string }) => {
	const { openSheet } = useSheet()

	const onOpenEditPet = () => {
		openSheet({
			view: <EditPetSheet initialValue={{ petName: name, petId }} />,
			title: 'Edit Pet Name',
		})
	}

	return (
		<div
			className="flex border border-green-500 bg-white rounded-md px-2 py-1 w-full gap-2 items-center cursor-pointer"
			onClick={(e) => {
				e.stopPropagation()
				onOpenEditPet()
			}}>
			<Text className="text-xs font-semibold text-green-500 border-r border-green-500 leading-5 w-full text-center">
				{name}
			</Text>
			<EditIcon className="stroke-green-500 min-w-[14px]" />
		</div>
	)
}

export default NameBadge
