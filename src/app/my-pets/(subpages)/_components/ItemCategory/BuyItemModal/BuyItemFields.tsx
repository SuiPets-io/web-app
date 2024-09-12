import { NumberInputWithLabel } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { useProfile } from '@/hooks'
import { balanceDisplayer } from '@/utils'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSlider from 'react-slider'
import { TItem } from '../../../_store/types'
import { TBuyItem } from './BuyItemSchema'

const BuyItemFields = ({ itemInfo }: { itemInfo: TItem }) => {
	const { data: userInfo } = useProfile()
	const {
		control,
		formState: { errors },
		watch,
		setValue,
		trigger,
	} = useFormContext<TBuyItem>()

	const itemNumber = watch('itemNumber')

	const onIncreaseItem = () => {
		setValue('itemNumber', itemNumber + 1, {
			shouldDirty: true,
			shouldValidate: true,
		})
	}

	const onDecreaseItem = () => {
		setValue('itemNumber', itemNumber - 1, {
			shouldDirty: true,
			shouldValidate: true,
		})
	}

	return (
		<div className="flex flex-col gap-4 items-center w-full">
			<div className="w-full">
				<Controller
					control={control}
					name={'itemNumber'}
					render={({ field: { onChange, value, onBlur } }) => {
						return (
							<NumberInputWithLabel
								innerInputClassName="text-center"
								label={'Quantity of Item'}
								placeholder={'0'}
								value={value || ''}
								onValueChange={(v) => {
									onChange(v.floatValue)
								}}
								allowNegative={false}
								onBlur={onBlur}
								decimalScale={0}
								thousandSeparator
								suffix={
									<button
										className="w-7 h-7 bg-gray-100 active:bg-green-100 flex items-center justify-center rounded-full"
										onClick={(e) => {
											e.preventDefault()
											onIncreaseItem()
										}}>
										<PlusIcon />
									</button>
								}
								prefix={
									<button
										className="w-7 h-7 bg-gray-100 active:bg-green-100 flex items-center justify-center rounded-full"
										onClick={(e) => {
											e.preventDefault()
											onDecreaseItem()
										}}
										disabled={itemNumber < 1}>
										<MinusIcon />
									</button>
								}
								readOnly
								autoFocus
							/>
						)
					}}
				/>
			</div>
			<ReactSlider
				className="horizontal-slider w-full h-1 bg-neutral-300 rounded-full"
				marks={[0, 55, 105, 155, 205]}
				value={itemNumber}
				markClassName="slider-mark"
				min={0}
				max={200}
				thumbClassName="text-white bg-neutral-500 px-1 rounded-md text-sm -top-2"
				trackClassName="slider-track"
				renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
				onChange={(val) => {
					setValue('itemNumber', val)
					trigger('itemNumber')
				}}
			/>
			<hr className="w-full" />
			<div className="flex gap-2 items-center w-full justify-between">
				<Text className="font-semibold">Price:</Text>
				<Text className="text-green-500 font-semibold">
					{balanceDisplayer((itemInfo.price * itemNumber || 0).toFixed(1))} PPS
				</Text>
			</div>
			<Button
				disabled={
					!itemNumber ||
					!!errors.itemNumber?.message ||
					!!(userInfo?.pps && userInfo.pps < itemInfo.price * itemNumber)
				}
				type="submit"
				className="capitalize w-full">
				Buy{' '}
				{!!(userInfo?.pps && userInfo.pps < itemInfo.price * itemNumber)
					? '(Not enough PPS)'
					: ''}
			</Button>
		</div>
	)
}

export default BuyItemFields
