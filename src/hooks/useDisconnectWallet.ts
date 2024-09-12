import { useTelegramAccessToken } from '@/app/_store/authenStore'
import { useInfoCloudStorage } from '@/app/_store/telegramStore'

export const useDisconnectWallet = () => {
	const { removePrivateKeyCloud, removeSeedphraseCloud } = useInfoCloudStorage()
	const { removeAccessTokenCloud } = useTelegramAccessToken()

	const onDisconnect = () => {
		removePrivateKeyCloud()
		removeSeedphraseCloud()
		removeAccessTokenCloud()
	}

	return { onDisconnect }
}
