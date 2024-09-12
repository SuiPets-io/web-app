import { NumberInputWithLabel } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { EGG_STATUS } from '@/constants'
import { balanceDisplayer } from '@/utils'
import { Controller, useFormContext } from 'react-hook-form'
import useGetEggConfig from '../../_hooks/useGetEggConfig'
import { TListing } from './ListingSchema'

const ListingFields = ({ listingStatus }: { listingStatus: EGG_STATUS }) => {
	const { data: eggConfig } = useGetEggConfig()
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext<TListing>()

	const price = watch('price')

	const feeRate = eggConfig?.buyFeeRate || 0

	return (
		<div className="flex flex-col gap-4">
			<Controller
				control={control}
				name={'price'}
				render={({ field: { onChange, value, onBlur } }) => {
					return (
						<NumberInputWithLabel
							label={'Price'}
							placeholder={'Enter price'}
							value={value || ''}
							onValueChange={(v) => {
								onChange(v.floatValue)
							}}
							allowNegative={false}
							onBlur={onBlur}
							error={errors.price?.message}
							suffix="SUI"
							disabled={listingStatus === EGG_STATUS.ONSALE}
						/>
					)
				}}
			/>
			<div className="flex gap-2 items-center">
				<Text>Maker fee ({feeRate * 100}%):</Text>
				<Text>{price > 0 ? balanceDisplayer(price * feeRate) : 0} SUI</Text>
			</div>
			<div className="flex gap-2 items-center">
				<Text>You will receive:</Text>
				<Text>
					{price > 0 ? balanceDisplayer(price - price * feeRate) : 0} SUI
				</Text>
			</div>
			<Button
				disabled={!price || !!errors.price?.message}
				type="submit"
				className="capitalize">
				{listingStatus === EGG_STATUS.ONSALE ? 'unlist' : 'list'}
			</Button>
		</div>
	)
}

export default ListingFields
