import BigNumber from 'bignumber.js'
import type { ethers } from 'ethers'

export const BIG_ZERO = new BigNumber(0)
export const BIG_ONE = new BigNumber(1)
export const BIG_NINE = new BigNumber(9)
export const BIG_TEN = new BigNumber(10)

type SerializedBigNumber = string

export const ethersToBigNumber = (ethersBn: ethers.BigNumberish): BigNumber =>
	new BigNumber(ethersBn.toString())

export const ethersToSerializedBigNumber = (
	ethersBn: ethers.BigNumberish
): SerializedBigNumber => ethersToBigNumber(ethersBn).toJSON()

export const convertSuperBigNumberToString = (
	amount: number,
	decimals: number = 18
) => {
	const zeroString = Array.from({ length: decimals }, () => '0').join('')
	const numberBeforeDecimal = parseInt(amount.toString().replace(',', '.'), 10)
	const numberAfterDecimal = (amount - numberBeforeDecimal)
		.toFixed(10)
		.slice(2)
		.concat(zeroString)
		.slice(0, decimals)
	return numberBeforeDecimal.toString().concat(numberAfterDecimal)
}
