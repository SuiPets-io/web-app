import { useModal } from '@/components/molecules'
import { Button, FilterIcon, SortIcon } from '@/components/ui'
import FilterModal from './FilterModal'
import SortModal from './SortbyModal'

const GlobalEggsFilters = () => {
	const { openModal } = useModal()

	const onOpenFilter = () => {
		openModal({
			view: <FilterModal />,
		})
	}

	const onOpenSortBy = () => {
		openModal({
			view: <SortModal />,
		})
	}

	return (
		<div className="grid grid-cols-2 gap-4 px-4 w-full">
			<Button
				variant="outline"
				className="justify-between bg-[#DDF0E7] rounded-xl"
				onClick={onOpenFilter}>
				Filter <FilterIcon className="stroke-green-500" />
			</Button>
			<Button
				variant="outline"
				className="justify-between bg-[#DDF0E7] rounded-xl"
				onClick={onOpenSortBy}>
				Sort by <SortIcon className="stroke-green-500" />
			</Button>
		</div>
	)
}

export default GlobalEggsFilters
