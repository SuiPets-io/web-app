import { Button } from '@/components/ui'

const SelectTypeButtons = ({
	selectedType,
	onSetType,
}: {
	selectedType: 'week' | 'month'
	onSetType: (type: 'week' | 'month') => void
}) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Button
				variant={selectedType === 'week' ? 'default' : 'outline'}
				onClick={() => onSetType('week')}>
				Week
			</Button>
			<Button
				variant={selectedType === 'month' ? 'default' : 'outline'}
				onClick={() => onSetType('month')}>
				Month
			</Button>
		</div>
	)
}

export default SelectTypeButtons
