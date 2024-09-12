import BigNumber from 'bignumber.js'

import { BIG_TEN } from './bigNumber'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
	return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
	return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
	return getBalanceAmount(balance, decimals).toNumber()
}

export const formatNumberRoundDecimals = (
	balance: number,
	displayDecimals = 3
) => {
	if (balance === 0) return 0
	return parseFloat(balance.toString()).toFixed(displayDecimals)
}
export const truncateNumber = (amount: string, decimals = 2) => {
	const dotIndex = amount.indexOf('.')
	const toTruncate = dotIndex !== -1 && amount.length > dotIndex + decimals + 1
	const amountToTruncate = toTruncate
		? amount.slice(0, dotIndex + decimals + 1)
		: amount
	return amountToTruncate
}
export const formatNumber = (
	number: number,
	minPrecision = 2,
	maxPrecision = 2
) => {
	const options = {
		minimumFractionDigits: minPrecision,
		maximumFractionDigits: maxPrecision + 1,
	}
	return truncateNumber(number.toLocaleString(`en-US`, options), maxPrecision)
}

export const toWei = (amount = 0, decimals = 18): string => {
	return new BigNumber(amount).multipliedBy(BIG_TEN.pow(decimals)).toJSON()
}
export const fromWei = (amount: any, decimals = 18): number => {
	return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals)).toNumber()
}

const SUFFIX_SYMBOL = ['', 'K', 'M', 'B', 'T', 'Z']
// Return value: [shortenedNumber, suffixSymbol]
export function shortenNumber(number: number, maxLength = 8): [number, string] {
	if (number > 1e18) {
		const split = number.toString().split('e')
		return [Number(Number(split[0]).toFixed(2)), `e${split[1]}`]
	}

	if (Math.ceil(number).toString().length < maxLength) return [number, '']

	const symIdx = Math.floor(Math.log10(Math.abs(number)) / 3)
	const suffix = SUFFIX_SYMBOL[symIdx] || ''
	if (symIdx === 0) return [number, suffix]

	const scale = 10 ** (symIdx * 3)
	const scaled = number / scale

	return [scaled, suffix]
}

export const toDecimal18 = (input: any) =>
	input.length ? input.toString().match(/^-?\d+(?:\.\d{0,18})?/)[0] : input

// This func strips all trailing 0s
export const trimTrailingZeros = (value: string): string => {
	return value.replace(/[0]+$/, '')
}

// This func calc the appropriate decimal point to display
// 1. Keep value's decimal length within default refDecimals range
// 2. Trim trailing zeros if any
// Ex: 1.000 -> decimal: 0
// 1.1000 -> decimal: 1
// 1.123456, refDecimals: 3 -> decimal: 3
export const sliceDecimalNumber = (value: number, refDecimals = 3): number => {
	const [_, subDecimalsStr] = value.toString().split('.')
	return subDecimalsStr
		? trimTrailingZeros(
				subDecimalsStr.length > refDecimals
					? subDecimalsStr.slice(0, refDecimals)
					: subDecimalsStr
			).length
		: 0
}

export const sliceNumber = (value: string | number, decimal = 2) => {
	if (!value) return value
	const valueStr = value?.toString()?.split('.')
	if (decimal === 0) {
		return valueStr[0]
	}
	if (valueStr[1]) {
		return `${valueStr[0]}.${valueStr[1].slice(0, decimal)}`
	}
	return value
}

export const balanceDisplayer = (val?: string | number, fixed?: number) => {
	if (!val) return '0'
	const strValue = new BigNumber(val).toString().split('.')
	const valNumber = Number(strValue[0])
	if (!strValue[1] && strValue[0])
		return strValue[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	if (Number.isNaN(valNumber)) return '0'
	const decimal = (function getDecimal() {
		if (valNumber < 1 && valNumber >= 0) return 6
		if (valNumber >= 1 && valNumber < 10) return 4
		if (valNumber >= 10 && valNumber < 100) return 3
		return 2
	})()
	if (strValue[1]) {
		const afterPoint = strValue[1].slice(
			0,
			fixed !== undefined ? fixed : decimal
		)
		if (valNumber === 0 && afterPoint === '000000') return '< 0.000001'
		return `${valNumber
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${afterPoint}`
	}
	return ''
}

function fillEndZero(val: number | string, length: number) {
	return val.toString().padEnd(length, '0')
}

export const fixedNumberFormatter = (val?: string | number, fixed = 2) => {
	if (!val) return `0.${fillEndZero(0, fixed)}`
	const strValue = new BigNumber(val).toString().split('.')
	const valNumber = Number(strValue[0])
	if (!strValue[1] && strValue[0])
		return `${strValue[0]
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${fillEndZero(0, fixed)}`
	if (Number.isNaN(valNumber)) return `0.${fillEndZero(0, fixed)}`

	if (strValue[1]) {
		const afterPoint = strValue[1].slice(0, fixed)
		if (valNumber === 0 && afterPoint === '000000') return '< 0.000001'
		return `${valNumber
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${fillEndZero(afterPoint, fixed)}`
	}
	return ''
}
