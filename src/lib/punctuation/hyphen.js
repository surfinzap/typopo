export function fixSpaceAroundHyphen(string, locale) {
	let pattern =
		'([' +
		locale.allChars +
		'])(-)([' +
		locale.spaces +
		'])([' +
		locale.allChars +
		'])'
	let re = new RegExp(pattern, 'g')
	string = string.replace(re, '$1-$4')

	pattern =
		'([' +
		locale.allChars +
		'])([' +
		locale.spaces +
		'])(-)([' +
		locale.allChars +
		'])'
	re = new RegExp(pattern, 'g')
	string = string.replace(re, '$1-$4')

	return string
}

export function fixHyphen(string, locale) {
	string = fixSpaceAroundHyphen(string, locale)
	return string
}
