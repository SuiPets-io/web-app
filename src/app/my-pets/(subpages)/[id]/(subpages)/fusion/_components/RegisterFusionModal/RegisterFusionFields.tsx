import useGetPetConfig from '@/app/my-pets/_hooks/useGetPetConfig'
import { NumberInputWithLabel } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { balanceDisplayer } from '@/utils'
import { Controller, useFormContext } from 'react-hook-form'
import { TRegisterFusion } from './RegisterFusionSchema'

const RegisterFusionFields = ({ isGiveMode }: { isGiveMode?: boolean }) => {
	const { data: petConfig } = useGetPetConfig()
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext<TRegisterFusion>()

	const price = watch('price')

	const feeRate = petConfig?.fusionFeeRate || 0

	return (
		<div className="flex flex-col gap-4">
			<Controller
				control={control}
				name={'price'}
				render={({ field: { onChange, value, onBlur } }) => {
					return (
						<NumberInputWithLabel
							label={''}
							placeholder={'Enter price'}
							value={value || ''}
							onValueChange={(v) => {
								onChange(v.floatValue)
							}}
							allowNegative={false}
							onBlur={onBlur}
							error={errors.price?.message}
							suffix="SUI"
							disabled={isGiveMode}
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
				{isGiveMode ? 'Cancel' : 'Register'}
			</Button>
		</div>
	)
}

export default RegisterFusionFields
