import { globalEnv } from '@/configs'
import { storageKeys } from '@/constants'
import { useCloudStorage } from '@/hooks'
import { decrypt, encrypt } from '@/utils'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, useEffect, useState } from 'react'

export const privateKeyStore = atomWithStorage<string | null>(
	storageKeys.PRIVATE_KEY,
	null
)

export const seedphraseStore = atomWithStorage<string | null>(
	storageKeys.SEEDPHRASE,
	null
)

export const isTelegramStore = atom<boolean>(false)

export const useGetDecryptedPrivateKey = () => {
	const privateKey = useAtomValue(privateKeyStore)
	const [decryptedPrivateKey, setDecryptedPrivateKey] = useState<string>('')

	useEffect(() => {
		if (privateKey) {
			const decryptedPk = decrypt(privateKey, globalEnv.cryptKey)
			setDecryptedPrivateKey(decryptedPk)
		} else setDecryptedPrivateKey('')
	}, [privateKey])

	return decryptedPrivateKey
}

export const useInfoCloudStorage = () => {
	const { getItem, setItem, removeItem } = useCloudStorage()
	const [privateKey, setPrivateKeyState] = useAtom(privateKeyStore)
	const [seedphrase, setSeedphraseState] = useAtom(seedphraseStore)

	const setPrivateKeyCloud = useCallback(
		async (pk: string) => {
			setPrivateKeyState(encrypt(pk, globalEnv.cryptKey))
			return await setItem(
				storageKeys.PRIVATE_KEY,
				encrypt(pk, globalEnv.cryptKey)
			)
		},
		[setItem, setPrivateKeyState]
	)

	const removePrivateKeyCloud = useCallback(async () => {
		setPrivateKeyState('')
		return await removeItem(storageKeys.PRIVATE_KEY)
	}, [removeItem, setPrivateKeyState])

	const setSeedphraseCloud = useCallback(
		async (sp: string) => {
			setSeedphraseState(encrypt(sp, globalEnv.cryptKey))
			return await setItem(
				storageKeys.SEEDPHRASE,
				encrypt(sp, globalEnv.cryptKey)
			)
		},
		[setItem, setSeedphraseState]
	)

	const removeSeedphraseCloud = useCallback(async () => {
		setSeedphraseState('')
		return await removeItem(storageKeys.PRIVATE_KEY)
	}, [removeItem, setSeedphraseState])

	const getPrivateKey = useCallback(async () => {
		const pk = await getItem(storageKeys.PRIVATE_KEY)
		const decryptedPk = decrypt(pk, globalEnv.cryptKey)
		return decryptedPk
	}, [getItem])

	const getSeedphrase = useCallback(async () => {
		const sp = await getItem(storageKeys.SEEDPHRASE)
		const decryptedSp = decrypt(sp, globalEnv.cryptKey)
		return decryptedSp
	}, [getItem])

	useEffect(() => {
		;(async () => {
			const pk = await getItem(storageKeys.PRIVATE_KEY)
			setPrivateKeyState(pk)
		})()
	}, [getItem, setPrivateKeyState])

	return {
		privateKey,
		seedphrase,
		setPrivateKeyCloud,
		setSeedphraseCloud,
		removeSeedphraseCloud,
		removePrivateKeyCloud,
		getSeedphrase,
		getPrivateKey,
	}
}
