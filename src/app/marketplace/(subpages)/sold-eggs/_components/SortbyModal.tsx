import { useModal } from '@/components/molecules'
import { Button, SortIcon, Text } from '@/components/ui'
import { cn } from '@/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { filterParamsAtom } from '../_store/marketAtom'

const SortOptions = [
	{
		label: 'Low to High',
		value: 1,
	},
	{
		label: 'High to Low',
		value: -1,
	},
] as const

const SortModal = () => {
	const { closeModal } = useModal()
	const [filterParams, setFilterParams] = useAtom(filterParamsAtom)
	const [selectedOption, setSelectedOption] = useState(
		filterParams.priceSort || undefined
	)

	const onSort = () => {
		setFilterParams((prev) => {
			prev.priceSort = selectedOption
		})
		closeModal()
	}

	const onSelectSort = (value: 1 | -1) => {
		setSelectedOption((prev) => {
			return prev !== value ? value : undefined
		})
	}

	return (
		<div className="flex flex-col gap-4 px-4 pb-4 -mt-8">
			<div className="flex items-center gap-2">
				<Text className="font-bold text-2xl text-green-500">Sort</Text>
				<SortIcon className="stroke-green-500" />
			</div>

			<div className="flex flex-col gap-2">
				{SortOptions.map((item) => (
					<div
						key={item.value}
						onClick={() => onSelectSort(item.value)}
						className="flex gap-2 items-center">
						<Text
							className={cn(
								'font-medium text-base',
								selectedOption === item.value
									? 'text-green-500'
									: 'text-gray-400'
							)}>
							{item.label}
						</Text>
						{selectedOption === item.value ? (
							<CheckIcon className="text-green-500" />
						) : null}
					</div>
				))}
			</div>

			<Button onClick={onSort}>Confirm</Button>
		</div>
	)
}

export default SortModal
