import { useAccount } from './useAccount'

export const useCheckAuthentication = () => {
	const { address, isConnected } = useAccount()

	return (
		address && isConnected
	)
}
