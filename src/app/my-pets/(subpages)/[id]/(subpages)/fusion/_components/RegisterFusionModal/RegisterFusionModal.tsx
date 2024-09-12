import { useModal } from '@/components/molecules'
import { Form, Text } from '@/components/ui'
import { PetType } from '@/external/api/pet/get-my-pet'
import { useGlobalLoading } from '@/hooks'
import { SubmitHandler } from 'react-hook-form'
import useCancelFusion from '../../hooks/useCancelFusion'
import useRegisterFusion from '../../hooks/useRegisterFusion'
import RegisterFusioningFields from './RegisterFusionFields'
import {
	RegisterFusioningSchema,
	TRegisterFusion,
} from './RegisterFusionSchema'

const RegisterFusionModal = ({ petInfo }: { petInfo: PetType }) => {
	const { closeModal } = useModal()

	const onSuccess = () => closeModal()

	const { mutate: onRegisterFusion, isPending: isRegisterFusionLoad } =
		useRegisterFusion({
			onSuccess,
		})

	const { mutate: onCancelFusion, isPending: isCancelFusionLoading } =
		useCancelFusion({
			onSuccess,
		})

	useGlobalLoading(isRegisterFusionLoad || isCancelFusionLoading)

	const onSubmit: SubmitHandler<TRegisterFusion> = async (data) => {
		if (petInfo.fusion?.isGiveMode) {
			onCancelFusion({ position: petInfo.position })
		} else {
			onRegisterFusion({
				position: petInfo.position,
				amount: data.price,
			})
		}
	}

	return (
		<Form
			validationSchema={RegisterFusioningSchema}
			onSubmit={onSubmit}
			useFormProps={{
				defaultValues: {
					price: petInfo.fusion?.amount,
				},
			}}
			className="flex flex-col gap-4 px-4 pb-4">
			<div className="grid grid-cols-2 gap-2">
				{petInfo.origin ? (
					<Text className="capitalize">
						<b>Origin:</b> {petInfo.origin}
					</Text>
				) : null}
				<Text className="capitalize">
					<b>Rarity:</b> {petInfo.rarity}
				</Text>
				<Text className="capitalize">
					<b>Pet:</b> {petInfo.type}
				</Text>
			</div>
			<hr />
			<RegisterFusioningFields isGiveMode={petInfo.fusion?.isGiveMode} />
		</Form>
	)
}

export default RegisterFusionModal
