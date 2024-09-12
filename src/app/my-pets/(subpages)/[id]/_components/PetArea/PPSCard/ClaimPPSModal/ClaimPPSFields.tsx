import { NumberInputWithLabel } from '@/components/molecules'
import { Button } from '@/components/ui'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSlider from 'react-slider'
import { TClaimPPSSchema } from './claimPPSSchema'

const ClaimPPSFields = ({ ppsPoint }: { ppsPoint: number }) => {
	const {
		control,
		formState: { errors },
		setValue,
		trigger,
		watch,
	} = useFormContext<TClaimPPSSchema>()

	const totalPPSBalance = ppsPoint
	const ppsAmount = watch('pps')

	return (
		<>
			<Controller
				control={control}
				name={'pps'}
				render={({ field: { onChange, value, onBlur } }) => {
					return (
						<NumberInputWithLabel
							label={'Amount (PPS)'}
							placeholder={'Enter amount'}
							value={value || ''}
							onValueChange={(v) => {
								onChange(v.floatValue)
							}}
							allowNegative={false}
							onBlur={onBlur}
							error={errors.pps?.message}
							readOnly
						/>
					)
				}}
			/>
			<div className="h-4">
				<ReactSlider
					className="horizontal-slider w-full h-1 bg-neutral-300 rounded-full"
					marks={[0, 31, 56, 81, 106]}
					markClassName="slider-mark"
					min={0}
					max={100}
					thumbClassName="text-white bg-neutral-500 px-1 rounded-md text-sm -top-2"
					trackClassName="slider-track"
					renderThumb={(props, state) => (
						<div {...props}>{state.valueNow}%</div>
					)}
					onChange={(val) => {
						const amount = Number(((val * totalPPSBalance) / 100).toFixed(4))
						setValue('pps', amount)
						trigger('pps')
					}}
				/>
			</div>
			<Button disabled={!ppsAmount || !!errors.pps?.message} type="submit">
				Claim
			</Button>
		</>
	)
}

export default ClaimPPSFields
