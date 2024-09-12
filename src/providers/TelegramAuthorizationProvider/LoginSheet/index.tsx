import { useTelegramAccessToken } from '@/app/_store/authenStore'
import { useInfoCloudStorage } from '@/app/_store/telegramStore'
import { useSheet } from '@/components/molecules/GlobalSheet'
import { Button, Form } from '@/components/ui'
import { globalEnv } from '@/configs'
import { SIGN_MESSAGE } from '@/constants'
import {
	loginTeleInput,
	loginTeleOutput,
} from '@/external/api/telegram/loginTelegram'
import { useTelegram } from '@/providers/TelegramProvider'
import {
	createHash,
	getAddressFromPrivateKey,
	isValidPrivateKey,
	isValidSeedPhrase,
	restoreWallet,
	signMessageWithEthers,
} from '@/utils'
import { useCallback, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import useCreateAccountTelegram from '../hooks/useCreateAccountTelegram'
import useLoginTelegram from '../hooks/useLoginTelegram'
import LoginFields from './LoginFields'
import {
	loginTelegramFormSchema,
	TLoginTelegramForm,
} from './loginTelegramFormSchema'

const LoginSheet = () => {
	const { setAccessTokenCloud } = useTelegramAccessToken()
	const { mutateAsync: createNewAccount, isPending: createLoading } =
		useCreateAccountTelegram({})
	const { user } = useTelegram()
	const { closeSheet } = useSheet()
	const [privateKey, setPrivateKey] = useState<string>()
	const [seedphrase, setSeedphrase] = useState<string>()
	const { setPrivateKeyCloud, setSeedphraseCloud } = useInfoCloudStorage()

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

	const onSuccess = useCallback(
		async (data: loginTeleOutput, params: loginTeleInput) => {
			if (data.token) {
				onHandleAfterSuccess(data.token)
			} else if (privateKey) {
				const message = new TextEncoder().encode(SIGN_MESSAGE)
				const signature = await signMessageWithEthers(privateKey, message)
				const submitData = {
					...params,
					message,
					signature,
				}

				const resp = await createNewAccount(submitData)

				if (resp.token) {
					onHandleAfterSuccess(resp.token)
				}
			}
		},
		[createNewAccount, onHandleAfterSuccess, privateKey]
	)

	const { mutate: login, isPending: loginLoading } = useLoginTelegram({
		onSuccess,
	})

	const onSubmit: SubmitHandler<TLoginTelegramForm> = async (data) => {
		if (user) {
			const { seedOrPrivateKey } = data
			const { id, first_name, last_name, username } = user
			let publicAddress = ''
			let privateKey = seedOrPrivateKey
			let seedphrase = seedOrPrivateKey

			if (isValidSeedPhrase(seedOrPrivateKey)) {
				const keypair = restoreWallet(seedOrPrivateKey)
				publicAddress = keypair.getPublicKey().toSuiAddress()
				privateKey = keypair.getSecretKey()
			} else if (isValidPrivateKey(seedOrPrivateKey)) {
				publicAddress = getAddressFromPrivateKey(seedOrPrivateKey)
				seedphrase = ''
			}

			setPrivateKey(privateKey)
			setSeedphrase(seedphrase)
			const chatId = id.toString()
			const hash = createHash(chatId)

			const message = new TextEncoder().encode(SIGN_MESSAGE)
			const signature = await signMessageWithEthers(privateKey, message)

			const submitData = {
				chatId,
				username: username,
				firstname: first_name,
				lastname: last_name,
				hash,
				publicAddress,
				signature,
				message,
			}
			login(submitData)
		}
	}

	return (
		<Form
			validationSchema={loginTelegramFormSchema}
			onSubmit={onSubmit}
			className="flex flex-col gap-4 pt-4">
			<LoginFields />
			<Button loading={loginLoading || createLoading} type="submit">
				Login
			</Button>
		</Form>
	)
}

export default LoginSheet
