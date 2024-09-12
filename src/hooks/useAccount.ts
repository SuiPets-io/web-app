'use client'

import { useGetDecryptedPrivateKey } from '@/app/_store/telegramStore'
import { getAddressFromPrivateKey } from '@/utils'
import { useEffect, useState } from 'react'

type ReturnAccountType = {
	address?: `0x${string}`
	isConnected: boolean
}

export const useAccount = () => {
	const decryptedPrivateKey = useGetDecryptedPrivateKey()
	const [account, setAccount] = useState<ReturnAccountType>({
		isConnected: false,
	})

	useEffect(() => {
		if (decryptedPrivateKey) {
			const addressTemp = getAddressFromPrivateKey(decryptedPrivateKey)
			setAccount({
				address: addressTemp,
				isConnected: true,
			})
		} else {
			setAccount({
				isConnected: true,
			})
		}
	}, [decryptedPrivateKey])

	return account
}
