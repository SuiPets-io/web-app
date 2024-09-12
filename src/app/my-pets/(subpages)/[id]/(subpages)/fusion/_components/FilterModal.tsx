import { useModal } from '@/components/molecules'
import { Button, FilterIcon, Text } from '@/components/ui'
import { RARITY } from '@/constants'
import { cn } from '@/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { filterParamsAtom } from '../_store/fusionAtom'

const FilterOptions = [
	{
		label: 'Common',
		value: RARITY.COMMON,
	},
	{
		label: 'Rare',
		value: RARITY.RARE,
	},
	{
		label: 'Epic',
		value: RARITY.EPIC,
	},
	{
		label: 'Legendary',
		value: RARITY.LEGENDARY,
	},
]

const FilterModal = () => {
	const { closeModal } = useModal()
	const [filterParams, setFilterParams] = useAtom(filterParamsAtom)
	const [selectedOptions, setSelectedOptions] = useState(
		filterParams.rarities?.split(',') || []
	)

	const onFilter = () => {
		setFilterParams((prev) => {
			prev.rarities = selectedOptions.filter((item) => !!item).join(',')
		})
		closeModal()
	}

	const onSelect = (value: RARITY) => {
		setSelectedOptions((prev) => {
			if (prev.includes(value)) {
				const temp = prev.filter((item) => item !== value)
				return temp
			} else {
				const temp = [...prev, value]
				return temp
			}
		})
	}

	return (
		<div className="flex flex-col gap-4 px-4 pb-4 -mt-8">
			<div className="flex items-center gap-2">
				<Text className="font-bold text-2xl text-green-500">Filter</Text>
				<FilterIcon className="stroke-green-500" />
			</div>

			<div className="flex flex-col gap-2">
				<Text className="font-bold">Rarities</Text>
				<div className="flex flex-col gap-2 pl-2">
					{FilterOptions.map((item) => (
						<div
							key={item.value}
							onClick={() => onSelect(item.value)}
							className="flex gap-2 items-center">
							<Text
								className={cn(
									'font-medium text-base',
									selectedOptions?.includes(item.value)
										? 'text-green-500'
										: 'text-gray-400'
								)}>
								{item.label}
							</Text>
							{selectedOptions?.includes(item.value) ? (
								<CheckIcon className="text-green-500" />
							) : null}
						</div>
					))}
				</div>
			</div>

			<Button onClick={onFilter}>Confirm</Button>
		</div>
	)
}

export default FilterModal
