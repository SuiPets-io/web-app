'use client'

import { InputWithLabel, NumberInputWithLabel } from '@/components/molecules'
import { Button, Text } from '@/components/ui'
import { useBalance } from '@/hooks'
import { balanceDisplayer, pasteToClipboard } from '@/utils'
import {
	forwardRef,
	ForwardRefRenderFunction,
	HTMLProps,
	useImperativeHandle,
	useState,
} from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TSendToken } from './sendSchema'

const TransferBlock: ForwardRefRenderFunction<
	any,
	HTMLProps<HTMLDivElement>
> = (_, ref) => {
	const [isLoading, setLoading] = useState(false)
	const SUIBalance = useBalance({})

	const {
		control,
		reset,
		setValue,
		formState: { errors, isDirty, isValid },
		trigger,
	} = useFormContext<TSendToken>()

	const balance = balanceDisplayer(SUIBalance.data?.formatted, 4)

	useImperativeHandle(
		ref,
		() => {
			return {
				reset() {
					SUIBalance?.refetch()
					reset()
				},
				load(loading: boolean) {
					setLoading(loading)
				},
			}
		},
		[reset, SUIBalance]
	)

	const onPasteAddress = async () => {
		const text = await pasteToClipboard()
		setValue('to', text)
		trigger('to')
	}

	const onMaxAmount = async () => {
		setValue('amount', Number(balance))
		trigger('amount')
	}

	return (
		<div className="gap-4 flex flex-col">
			<Controller
				control={control}
				name={'to'}
				render={({ field: { onChange, value, onBlur } }) => {
					return (
						<InputWithLabel
							inputClassName="outline outline-[1px]"
							label={'Recipient Address'}
							placeholder={'Enter a recipient address'}
							value={value || ''}
							onChange={onChange}
							onBlur={onBlur}
							error={errors.to?.message}
							suffix={
								<div
									className="cursor-pointer uppercase text-green-600 text-sm font-semibold"
									onClick={onPasteAddress}>
									Paste
								</div>
							}
						/>
					)
				}}
			/>
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
								onChange(v.floatValue)
							}}
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
					{balance} SUI
				</Text>
			</div>
			<Button
				disabled={!isValid || !isDirty}
				loading={isLoading}
				type="submit"
				className="w-full cursor-pointer">
				Send
			</Button>
		</div>
	)
}

export default forwardRef(TransferBlock)
