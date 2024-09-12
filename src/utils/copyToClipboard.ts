import { isIOS } from './detectDevice'

export function copyToClipboard(text?: string, node = document.body) {
	const textArea = document.createElement('textarea')
	textArea.style.position = 'fixed'
	textArea.style.top = '0'
	textArea.style.left = '0'
	textArea.style.width = '2em'
	textArea.style.height = '2em'
	textArea.style.padding = '0'
	textArea.style.border = 'none'
	textArea.style.outline = 'none'
	textArea.style.boxShadow = 'none'
	textArea.style.background = 'transparent'
	textArea.value = text || ''

	node.appendChild(textArea)

	let range: Range
	let selection: Selection | null

	if (isIOS()) {
		range = document.createRange()
		range.selectNodeContents(textArea)
		selection = window.getSelection()
		selection?.removeAllRanges()
		selection?.addRange(range)
		textArea.setSelectionRange(0, 999999)
	} else {
		textArea.select()
	}
	if (textArea) {
		navigator?.clipboard?.writeText(textArea.value)
	}
	node.removeChild(textArea)
}
