export async function pasteToClipboard() {
	try {
		const textArea = document.createElement('textarea')
		const text = await navigator.clipboard.readText()
		textArea.value += text
		return text
	} catch (error) {
		return ''
	}
}
