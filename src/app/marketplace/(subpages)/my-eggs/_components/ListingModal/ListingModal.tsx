import { useModal } from '@/components/molecules'
import { Form, Text } from '@/components/ui'
import { EGG_STATUS } from '@/constants'
import { EggType } from '@/external/api/egg/get-my-egg'
import { useGlobalLoading } from '@/hooks'
import { SubmitHandler } from 'react-hook-form'
import useListing from '../../_hooks/useListing'
import useUnlisting from '../../_hooks/useUnlisting'
import ListingFields from './ListingFields'
import { ListingSchema, TListing } from './ListingSchema'

const ListModal = ({ eggInfo }: { eggInfo: EggType }) => {
	const { closeModal } = useModal()

	const onSuccess = () => closeModal()

	const { mutate: onListing, isPending: isListLoading } = useListing({
		onSuccess,
	})

	const { mutate: onUnlisting, isPending: isUnlistLoading } = useUnlisting({
		onSuccess,
	})

	useGlobalLoading(isListLoading || isUnlistLoading)

	const onSubmit: SubmitHandler<TListing> = async (data) => {
		if (eggInfo.status === EGG_STATUS.ONSALE) {
			onUnlisting({ eggId: eggInfo._id })
		} else {
			onListing({
				eggId: eggInfo._id,
				price: data.price,
			})
		}
	}

	return (
		<Form
			validationSchema={ListingSchema}
			onSubmit={onSubmit}
			useFormProps={{
				defaultValues: {
					price: eggInfo.price,
				},
			}}
			className="flex flex-col gap-4 px-4 pb-4">
			<div className="grid grid-cols-2 gap-2">
				{eggInfo.origin ? (
					<Text className="capitalize">
						<b>Origin:</b> {eggInfo.origin}
					</Text>
				) : null}
				<Text className="capitalize">
					<b>Rarity:</b> {eggInfo.rarity}
				</Text>
				<Text className="capitalize">
					<b>Pet:</b> {eggInfo.petType}
				</Text>
			</div>
			<hr />
			<ListingFields listingStatus={eggInfo.status} />
		</Form>
	)
}

export default ListModal
