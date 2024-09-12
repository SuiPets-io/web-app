import { globalEnv } from '@/configs'
import { PPS_DECIMAL, SUI_DECIMAL } from '@/constants/web3'
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { coinWithBalance } from '@mysten/sui/transactions'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'

// Generate a new wallet
export const generateWallet = () => {
	const seedPhrase = bip39.generateMnemonic(wordlist)
	const keypair = Ed25519Keypair.deriveKeypair(seedPhrase)
	const address = keypair.getPublicKey().toSuiAddress()
	const secretKey = keypair.getSecretKey()

	return { seedPhrase, privateKey: secretKey, address }
}

// Restore a wallet from a seed phrase
export const restoreWallet = (seedPhrase: string) => {
	const keypair = Ed25519Keypair.deriveKeypair(seedPhrase)

	return keypair
}

// Get address from keypair
export const getKeypairFromPrivateKey = (privateKey: string) => {
	const { secretKey } = decodeSuiPrivateKey(privateKey)
	const keypair = Ed25519Keypair.fromSecretKey(secretKey)

	return keypair
}

// Get address from private key
export const getAddressFromPrivateKey = (privateKey: string) => {
	const keypair = getKeypairFromPrivateKey(privateKey)

	const address = keypair.getPublicKey().toSuiAddress()

	return address as `0x${string}`
}

// Validate if a private key is valid
export const isValidPrivateKey = (privateKey: string) => {
	try {
		const address = getAddressFromPrivateKey(privateKey)
		return address !== undefined
	} catch (e) {
		return false
	}
}

// Validate if a seed phrase is valid
export const isValidSeedPhrase = (seedPhrase: string) => {
	return bip39.validateMnemonic(seedPhrase, wordlist)
}

export async function signMessageWithEthers(
	privateKey: string,
	message: Uint8Array
) {
	const keypair = getKeypairFromPrivateKey(privateKey)

	const { signature } = await keypair.signPersonalMessage(message)
	return signature
}

export const convertBalanceToMIST = (balance: number, type?: 'sui' | 'pps') => {
	return balance * (type === 'pps' ? PPS_DECIMAL : SUI_DECIMAL)
}

export const convertMISTToBalance = (balance: string, type?: 'sui' | 'pps') => {
	return Number.parseInt(balance) / (type === 'pps' ? PPS_DECIMAL : SUI_DECIMAL)
}

export const createCoin = (balance: number, type?: 'sui' | 'pps') => {
	const convertedBalance = convertBalanceToMIST(balance, type)
	const params: {
		balance: bigint | number
		type?: string
		useGasCoin?: boolean
	} = {
		balance: convertedBalance,
	}

	if (type === 'pps') {
		params.type = globalEnv.ppsContract
	}

	return coinWithBalance(params)
}

export const createHash = (chatId: string) => {
	const key =
		'jfhjww12Sjdjhsb#@@edsj' +
		(chatId[6] || 0) +
		(chatId[1] || 0) +
		(chatId[2] || 0) +
		(chatId[3] || 0) +
		(chatId[4] || 0) +
		(chatId[5] || 0) +
		(chatId[7] || 0)
	return Buffer.from(key, 'utf8').toString('base64')
}
