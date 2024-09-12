// Remove undefined, null, empty string, empty list in a object
export function removeNullishValue<T>(newQueries: { [key in string]: any }) {
	const result: T = Object.entries(newQueries).reduce((prev, [key, value]) => {
		if (
			value !== '' &&
			value !== null &&
			value !== undefined &&
			((Array.isArray(value) && value.length) || !Array.isArray(value))
		) {
			return {
				...prev,
				[key]: value,
			}
		}
		return prev
	}, {} as T)
	return result
}
