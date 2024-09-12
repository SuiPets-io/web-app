import CryptoJs from 'crypto-js'

export const encrypt = (text: string, key: string) => {
	return CryptoJs.TripleDES.encrypt(text, key).toString()
}

export const decrypt = (encryptedText: string, key: string) => {
	return CryptoJs.TripleDES.decrypt(encryptedText, key).toString(
		CryptoJs.enc.Utf8
	)
}
