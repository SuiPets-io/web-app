import { useTelegramAccessToken } from '@/app/_store/authenStore'
import { useInfoCloudStorage } from '@/app/_store/telegramStore'
import {
	CopyButton,
	InputWithLabel,
	TextareaWithLabel,
} from '@/components/molecules'
import { useSheet } from '@/components/molecules/GlobalSheet'
import { Button, CopyIcon, Text } from '@/components/ui'
import { globalEnv } from '@/configs'
import { SIGN_MESSAGE } from '@/constants'
import { useTelegram } from '@/providers/TelegramProvider'
import { createHash, generateWallet, signMessageWithEthers } from '@/utils'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import useCreateAccountTelegram from '../hooks/useCreateAccountTelegram'

const CreateAccountForm = () => {
	const { setAccessTokenCloud } = useTelegramAccessToken()
	const { user, ref } = useTelegram()
	const { closeSheet } = useSheet()
	const [address, setAddress] = useState('')
	const [seedphrase, setSeedphrase] = useState('')
	const [privateKey, setPrivateKey] = useState('')
	const [isHideSeed, setHideSeed] = useState(true)
	const [isHiderivateKey, setHidePrivateKey] = useState(true)
	const [referedCode, setReferedCode] = useState<string | undefined>(ref)
	const [step, setStep] = useState(1)
	const [confirmWord, setConfirmWord] = useState('')
	const [confirmInputed, setConfirmInputed] = useState('')
	const [randomIndex, setRandomIndex] = useState<number | null>(null)
	const { setPrivateKeyCloud, setSeedphraseCloud } = useInfoCloudStorage()

	useEffect(() => {
		if (!referedCode && ref) {
			setReferedCode(ref)
		}
	}, [ref, referedCode])

	useEffect(() => {
		const { seedPhrase, privateKey, address } = generateWallet()
		setSeedphrase(seedPhrase)
		setPrivateKey(privateKey)
		setAddress(address)
		const randomIndex = Math.floor(Math.random() * 12)
		setRandomIndex(randomIndex)
		const seedArr = seedPhrase.split(' ')
		setConfirmWord(seedArr[randomIndex] || '')
	}, [])

	const onHandleAfterSuccess = useCallback(
		async (token: string) => {
			setAccessTokenCloud(token)
			if (globalEnv.cryptKey) {
				privateKey && setPrivateKeyCloud(privateKey)
				seedphrase && setSeedphraseCloud(seedphrase)
			}
			closeSheet()
		},
		[
			closeSheet,
			privateKey,
			seedphrase,
			setAccessTokenCloud,
			setPrivateKeyCloud,
			setSeedphraseCloud,
		]
	)

	const { mutate, isPending } = useCreateAccountTelegram({
		onSuccess: onHandleAfterSuccess,
	})

	const onSubmit = async () => {
		if (user) {
			const { id, first_name, last_name, username } = user
			const chatId = id.toString()
			const hash = createHash(id.toString())
			const message = new TextEncoder().encode(SIGN_MESSAGE)
			const signature = await signMessageWithEthers(privateKey, message)

			const submitData = {
				chatId,
				username: username,
				hash,
				publicAddress: address,
				message,
				signature,
				firstname: first_name,
				lastname: last_name,
				referedCode,
			}
			mutate(submitData)
		}
	}

	const onChangeReferedCode: ChangeEventHandler<HTMLInputElement> = (e) => {
		setReferedCode(e.target.value)
	}

	const onChangeConfirmWord: ChangeEventHandler<HTMLInputElement> = (e) => {
		setConfirmInputed(e.target.value)
	}

	const onNextStep = () => setStep((prev) => prev + 1)
	const onBackStep = () => setStep((prev) => prev - 1)

	return (
		<div className="flex flex-col gap-4 pt-4 overflow-y-auto px-[1px] h-ful">
			{step === 1 ? (
				<>
					<TextareaWithLabel
						readOnly
						name="address"
						label="Address"
						value={address}
						suffix={
							<CopyButton
								content={address}
								variant="icon"
								className="w-full p-0 bg-transparent">
								<CopyIcon className="stroke-green-500" />
							</CopyButton>
						}
					/>
					<Text variant="caption" className="text-yellow-500">
						Copy your seed phrase and private key right away to prevent losing
						your key
					</Text>
					<div className="flex gap-2 items-end">
						<TextareaWithLabel
							readOnly
							name="seedphrase"
							label="Seedphrase"
							value={seedphrase}
							isHide={isHideSeed}
							rows={3}
						/>
						<div className="flex flex-col gap-1 mb-1">
							<Button
								onClick={() => setHideSeed((prev) => !prev)}
								variant="icon"
								className="flex items-center justify-center rounded-[13px] h-[35px] w-[35px] p-0">
								{isHideSeed ? (
									<EyeOpenIcon className="text-neutral-50 w-5 h-5" />
								) : (
									<EyeNoneIcon className="text-neutral-50 w-5 h-5" />
								)}
							</Button>
							<CopyButton
								content={seedphrase}
								variant="icon"
								className="flex items-center justify-center rounded-[13px] h-[35px] w-[35px] p-0">
								<CopyIcon className="stroke-neutral-50 w-5 h-5" />
							</CopyButton>
						</div>
					</div>
					<div className="flex gap-2 items-end">
						<TextareaWithLabel
							readOnly
							name="privateKey"
							label="Private key"
							value={privateKey}
							isHide={isHiderivateKey}
							rows={3}
						/>
						<div className="flex flex-col gap-1 mb-1">
							<Button
								onClick={() => setHidePrivateKey((prev) => !prev)}
								variant="icon"
								className="flex items-center justify-center rounded-[13px] h-[35px] w-[35px] p-0">
								{isHiderivateKey ? (
									<EyeOpenIcon className="text-neutral-50 w-5 h-5" />
								) : (
									<EyeNoneIcon className="text-neutral-50 w-5 h-5" />
								)}
							</Button>
							<CopyButton
								content={privateKey}
								variant="icon"
								className="flex items-center justify-center rounded-[13px] h-[35px] w-[35px] p-0">
								<CopyIcon className="stroke-neutral-50 w-5 h-5" />
							</CopyButton>
						</div>
					</div>
					<InputWithLabel
						inputClassName="h-10"
						innerInputClassName="text-sm"
						label="Referral Code"
						name="referedCode"
						value={referedCode}
						onChange={onChangeReferedCode}
					/>
					<Button
						onClick={(e) => {
							e.preventDefault()
							onNextStep()
						}}>
						Continue
					</Button>
				</>
			) : (
				<>
					<InputWithLabel
						inputClassName="h-10"
						innerInputClassName="text-sm"
						label="Confirm"
						name="confirmInputed"
						value={confirmInputed}
						placeholder={
							randomIndex || randomIndex === 0
								? `Enter word #${randomIndex + 1} from your seed phrase`
								: ''
						}
						onChange={onChangeConfirmWord}
						error={
							confirmInputed && confirmWord !== confirmInputed
								? 'Entered word is not invalid'
								: ''
						}
					/>
					<div className="flex gap-4">
						<Button
							onClick={(e) => {
								e.preventDefault()
								onBackStep()
							}}
							disabled={isPending}
							variant="outline">
							Back
						</Button>
						<Button
							className="w-full"
							onClick={onSubmit}
							disabled={isPending || confirmWord !== confirmInputed}
							loading={isPending}
							type="submit">
							Create Account
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

export default CreateAccountForm
