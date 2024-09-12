import { useModal } from '@/components/molecules'
import { Form } from '@/components/ui'
import { useGlobalLoading } from '@/hooks'
import { useParams } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import useHarvest from '../../../../_hooks/useHarvest'
import ClaimPPSFields from './ClaimPPSFields'
import { claimPPSSchema, TClaimPPSSchema } from './claimPPSSchema'

const ClaimPPSModal = ({ ppsPoint }: { ppsPoint: number }) => {
	const { id: petId } = useParams<{ id: string }>()
	const { mutate, isPending } = useHarvest({ onSuccess: () => {} })
	const { closeModal } = useModal()

	useGlobalLoading(isPending)

	const onSubmit: SubmitHandler<TClaimPPSSchema> = async (data) => {
		mutate({ petId, pps: data.pps })
		closeModal()
	}

	return (
		<Form
			validationSchema={claimPPSSchema}
			onSubmit={onSubmit}
			className="flex flex-col gap-4 px-4 pb-4">
			<ClaimPPSFields ppsPoint={ppsPoint} />
		</Form>
	)
}

export default ClaimPPSModal
