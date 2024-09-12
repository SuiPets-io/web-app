export function addressShorten(address?: string, first = 4, last = 3) {
	return address
		? `${address.substring(0, first)}...${address.substring(
				address.length - last
			)}`
		: ''
}

export const nameShorten = (name: string, length = 6) => {
	if (name.length <= length) {
		return name
	}
	return `${name.substring(0, length)}...`
}
