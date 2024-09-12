'use client'

import useGetUserConfig from '@/app/my-pets/(subpages)/_hooks/useGetUserConfig'
import { NumberInputWithLabel } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { useProfile } from '@/hooks'
import { balanceDisplayer } from '@/utils'
import { Controller, useFormContext } from 'react-hook-form'
import { TSendToken } from './sendSchema'

const TransferBlock = () => {
	const { data: userInfo } = useProfile()
	const { data: userConfig } = useGetUserConfig()

	const {
		control,
		setValue,
		formState: { errors, isDirty, isValid },
		trigger,
	} = useFormContext<TSendToken>()

	const onMaxAmount = async () => {
		setValue('amount', Number(userInfo?.pps))
		trigger('amount')
	}

	return (
		<div className="gap-4 flex flex-col">
			<Controller
				control={control}
				name={'amount'}
				render={({ field: { onChange, value, onBlur } }) => {
					return (
						<NumberInputWithLabel
							inputClassName="outline outline-[1px]"
							label={'Amount'}
							placeholder={'Enter amount'}
							value={value || ''}
							onValueChange={(v) => {
								onChange(v.floatValue || 0)
							}}
							thousandSeparator
							allowLeadingZeros
							allowNegative={false}
							onBlur={onBlur}
							error={errors.amount?.message}
							suffix={
								<div
									className="cursor-pointer uppercase text-green-600 text-sm font-semibold"
									onClick={onMaxAmount}>
									MAX
								</div>
							}
						/>
					)
				}}
			/>
			<div className="flex justify-between">
				<Text variant="body" className="text-neutral-400">
					Available
				</Text>
				<Text variant="body" className="text-neutral-400">
					{balanceDisplayer(userInfo?.pps)} PPS
				</Text>
			</div>

			<hr />

			<div className="flex justify-between">
				<Text variant="body" className="text-neutral-800">
					Fee
				</Text>
				<Text variant="body" className="text-neutral-800">
					{balanceDisplayer(userConfig?.CLAIM_PPS_FEE)} SUI
				</Text>
			</div>

			<Button
				disabled={!isValid || !isDirty || !userConfig?.IS_OPEN_CLAIM_PPS}
				type="submit"
				className="w-full cursor-pointer">
				{userConfig?.IS_OPEN_CLAIM_PPS ? 'Claim' : 'Coming Soon...'}
			</Button>
		</div>
	)
}

export default TransferBlock
