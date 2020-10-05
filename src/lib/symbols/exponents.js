function fixExponent(string, locale, originalExponent, fixedExponent) {
	let metrePrefixes =
		'm|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym'
	let pattern =
		'([' +
		locale.spaces +
		locale.slash +
		'])(' +
		metrePrefixes +
		')(' +
		originalExponent +
		')'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1$2' + fixedExponent
	return string.replace(re, replacement)
}

export function fixSquares(string, locale) {
	return fixExponent(string, locale, '2', '²')
}

export function fixCubes(string, locale) {
	return fixExponent(string, locale, '3', '³')
}

export function fixExponents(string, locale) {
	string = fixSquares(string, locale)
	string = fixCubes(string, locale)
	return string
}
