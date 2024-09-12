import PutEggsSheet from '@/app/my-pets/_components/PutEggSheet/PutEggSheet'
import { useSheet } from '@/components/molecules/GlobalSheet'
import { Button } from '@/components/ui'

const PutEggAction = () => {
	const { openSheet } = useSheet()
	const onOpenPutSheet = () => {
		openSheet({
			view: <PutEggsSheet />,
			title: 'Put Egg',
		})
	}

	return (
		<Button onClick={onOpenPutSheet} variant="orange">
			Put New Egg
		</Button>
	)
}

export default PutEggAction
