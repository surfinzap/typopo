/*
	Remove extra space, nbsp, hairSpace, narrowNbsp
	after number sign and before number

	@param {string} string — input text for identification
	@returns {string} — output without extra spaces
*/
export function removeExtraSpacesAfterNumberSign(string, locale) {
	let pattern =
		'(' +
		locale.numberSign +
		')([' +
		locale.spaces +
		']+)(' +
		locale.cardinalNumber +
		')'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1$3'

	return string.replace(re, replacement)
}

/*
	Consolidates the use of number sign (#)

	@param {string} string — input text for identification
	@returns {string} — output with properly used number sign
*/
export function fixNumberSign(string, locale) {
	string = removeExtraSpacesAfterNumberSign(string, locale)
	return string
}
