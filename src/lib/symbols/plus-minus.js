export function fixPlusMinus(string, locale) {
	let pattern = '(\\+\\-)|(\\-\\+)'
	let re = new RegExp(pattern, 'g')
	let replacement = locale.plusMinus

	return string.replace(re, replacement)
}
